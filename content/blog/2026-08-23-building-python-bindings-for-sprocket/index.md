+++
title = "Building Python Bindings for Sprocket"
description = "Reflecting on my work this summer spent building Python bindings for the Sprocket bioinformatics workflow engine"

[taxonomies]
tags = ["gsoc", "rust", "python"]

[extra]
mermaid = true
+++

This summer I participated in [Google Summer of Code](https://summerofcode.withgoogle.com/), a program where students are sponsored by Google to work on open source software. My project was to write Python bindings for Sprocket, a bio-informatics workflow engine developed by St. Jude Children's Research Hospital. Specifically, I made Sprocket's [`wdl`](https://crates.io/crates/wdl) parsing and analysis library accessible from Python so that developers could take advantage of Sprocket's advanced tooling without needing to learn Rust.

{% note(title="Note") %}
This is my [Work Product Submission](https://developers.google.com/open-source/gsoc/help/work-product) for GSoC. While I am posting it on my blog, please know that I am required to mention certain points and that the target audience is the GSoC Admins. I hope you enjoy reading!
{% end %}

## What I Did

### Python Bindings

I planned on writing the Python bindings in four stages: diagnostics, grammar, AST, and linting. The order was important, as each stage built on the work of the previous. Each stage also happens to map to a specific module in the [`wdl` crate](https://docs.rs/wdl/), which the Python bindings mirror[^python-mirroring-rust]. I took advantage of the lovely [PyO3](https://pyo3.rs/) crate to facilitate writing the bindings, as it made building the project much easier than interfacing with [Python's C API](https://docs.python.org/3/extending/index.html) directly.

{% mermaid() %}
graph LR;
  diagnostics --> grammar --> ast --> lint;
{% end %}

The first stage was writing bindings for WDL's diagnostic capabilities, which are internally powered by [`codespan-reporting`](https://crates.io/crates/codespan-reporting). All latter stages use diagnostics to report errors and warnings, so being able to handle them from Python is a boon. I originally opened [#911](https://github.com/stjude-rust-labs/sprocket/pull/911) with the diagnostics bindings, but after discussion with my mentor we landed on a better approach that reduced code duplication in [#941](https://github.com/stjude-rust-labs/sprocket/pull/941). This PR made it possible to construct and emit diagnostics to the terminal:

```python
from sprocket_bio.diagnostics import emit_diagnostics, Mode
from sprocket_bio.grammar import Diagnostic

diagnostics = [
    Diagnostic.error("oh no!")
        .with_help("something went wrong")
        .with_fix("try this instead")
        .with_rule("MyRule"),
]

emit_diagnostics(
    "file.txt",
    "This is the file contents.",
    diagnostics,
    Mode.default(),
    True,
)
```

{{ figure(src = "diagnostic.png", alt = "A screenshot of a terminal running the above Python code, which the diagnostic printed in the output", caption = "The diagnostic emitted by the Python program, [view text](diagnostic.txt)", height = "200") }}

With the diagnostics stage complete, I then implemented Sprocket's grammar API in [#980](https://github.com/stjude-rust-labs/sprocket/pull/980). This API can be used to parse WDL documents into an [event stream](https://docs.rs/wdl/latest/wdl/grammar/parser/enum.Event.html) composed of nodes and tokens[^event-stream]. While not as powerful as a full AST, the event stream is useful for viewing the syntax tree of a WDL document and implementing a basic syntax highlighter, both of which I included as examples in the documentation. I particularly enjoyed writing the syntax highlighter, which outputs stylized HTML:

{{ figure(src = "syntax-highlighter.png", alt = "A screenshot of a browser showing the syntax highlighter WDL document", caption = "The syntax highlighter output, [view HTML](example.wdl.html)", height = "738") }}

The final stage that I completed over the summer was the AST bindings. The [abstract syntax tree](https://en.wikipedia.org/wiki/Abstract_syntax_tree), or AST for short, is Sprocket's typed representation of a WDL document. It is by far the most powerful way to interact with a WDL document programmatically, but also came with two distinct challenges.

First, the AST is massive. It is composed of over 190 structs and enums, all of which would need to be exposed in Python. In the previous stages I wrote the bindings by hand, manually customizing [`#[pyclass]`](https://pyo3.rs/v0.29.2/class.html#defining-a-new-class) and [`#[pymethods]`](https://pyo3.rs/v0.29.2/class.html#instance-methods). This approach wasn't practical for the AST due to the sheer quantity of types I would need to implement.

Second, the AST was not thread-safe, which is a [strict requirement of PyO3](https://pyo3.rs/v0.29.2/class.html#must-be-thread-safe). None of the AST's types implemented [`Send`](https://doc.rust-lang.org/stable/std/marker/trait.Send.html) nor [`Sync`](https://doc.rust-lang.org/stable/std/marker/trait.Sync.html) due to their internal representation[^rowan], so none of them could be safely handed to the Python interpreter. I worked around this by creating a thread-safe equivalents of all AST types, however that required a significant amount of boilerplate to convert between the thread-safe and original representations, especially considering how many types are.

After conferring with my mentor, we agreed that the best solution was to create a procedural macro attribute that automated generating the boilerplate. I spent my final month of GSoC writing the AST Python bindings in [#1042](https://github.com/stjude-rust-labs/sprocket/pull/1042). Much of that time consisted of me learning how to write proc-macros with [`syn`](https://crates.io/crates/syn) and delving into the intricacies of the AST, but in the end it paid off. Instead of needing to write complex boilerplate 190+ times, likely making mistakes along the way, I wrote proc-macros so that adding an AST type to the Python bindings was as simple as pasting `#[sprocket_py_macros::ast]` and `#[sprocket_py_macros::ast_methods]`.

Due to the amount of time I spent working on the AST bindings, I never completed stage four, which means that it currently isn't possible to write custom lints using Sprocket's APIs.

[^python-mirroring-rust]: I intentionally chose for the Python bindings to be structured identically to the Rust crate. This way by learning the Python API, you can very easily move to the Rust API, and vice-versa. It also made writing and maintaining the bindings easier, as I didn't need to invent new abstractions or write documentation from scratch.
[^event-stream]: I personally treat the event stream the same as a token stream produced by a [lexer](https://en.wikipedia.org/wiki/Lexical_analysis), with the added benefit of seeing when a node begins or ends. I identified the event stream as being a better Python binding candidate than [`wdl::grammar::lexer`](https://docs.rs/wdl/latest/wdl/grammar/lexer/index.html) because it didn't use generics, which are [difficult to support using PyO3](https://pyo3.rs/v0.29.2/class.html#no-generic-parameters).
[^rowan]: Internally, Sprocket's AST is built on top of [`rowan`](https://crates.io/crates/rowan), the syntax tree library that powers [rust-analyzer](https://rust-analyzer.github.io/).

### Continuous Integration

When I publish a piece of software, I want to ensure that it works and that it works _well_. I spent a much of the summer using my experience with [Github Actions](https://github.com/features/actions) in order to implement automated checks for the Python bindings.

In [#919](https://github.com/stjude-rust-labs/sprocket/pull/919) I added unit tests with [`pytest`](https://docs.pytest.org/), type checking with [`mypy`](https://mypy.readthedocs.io/), and code formatting with [`black`](https://black.readthedocs.io/) to Sprocket's CI. I later enhanced these checks by tracking `pytest` [code coverage](https://app.codecov.io/gh/stjude-rust-labs/sprocket) in [#1016](https://github.com/stjude-rust-labs/sprocket/pull/1016) and sorting import statements with [`isort`](https://isort.readthedocs.io/en/latest/index.html) in [#971](https://github.com/stjude-rust-labs/sprocket/pull/971). With these changes, the tools now run on every pull request to verify the correctness and quality of the Python code.

Of the tools, [`mypy`'s stubtest tool](https://mypy.readthedocs.io/en/stable/stubtest.html) was particularly useful. Because it is difficult to compile [type hints](https://typing.python.org/en/latest/guides/libraries.html) into a Python extension, I wrote [type stubs](https://typing.python.org/en/latest/guides/writing_stubs.html) that describe `sprocket_bio`'s complete API surface with type annotations included. I would often forget to update the type stubs whenever I changed the Python bindings though, so I used `mypy.stubtest` to check for these discrepancies automatically.

In addition to automated checks, Sprocket uses [Renovate](https://www.mend.io/renovate/) to manage its Rust and CI dependencies. In [#973](https://github.com/stjude-rust-labs/sprocket/pull/973) I configured Renovate to support [`pyproject.toml`](https://github.com/stjude-rust-labs/sprocket/blob/edab99714a0586f03e481a614df6ae289c0a26e3/pyproject.toml) so that it would update our Python dependencies as well. My initial patch wasn't perfect, though, so I made additional fixes in [#1102](https://github.com/stjude-rust-labs/sprocket/pull/1002) and [#1106](https://github.com/stjude-rust-labs/sprocket/pull/1106).

And while not directly related to the Python bindings, I'm particularly proud of [#864](https://github.com/stjude-rust-labs/sprocket/pull/864) because I managed to cut CI times from 21 minutes on average to only 14 through better caching and pre-built binaries. I've been writing Github Actions for about 5 years at this point, so I'm glad my experience is paying off on that front.

### Documentation

In [#1123](https://github.com/stjude-rust-labs/sprocket/pull/1123) I created the Python bindings's documentation, built using [Sphinx](https://www.sphinx-doc.org/) and hosted at <https://sprocket-bio.readthedocs.io/>. Through [Sphinx's `autodoc` extension](https://www.sphinx-doc.org/en/master/usage/extensions/autodoc.html), this website documents the bindings's complete API. It additionally shows several examples of how to use the API, complete with instructions on how to run the examples locally.

To enhance the main documentation, I created a page on Sprocket's main website in [stjude-rust-labs/sprocket.bio#55](https://github.com/stjude-rust-labs/sprocket.bio/pull/55) describing the Python bindings and linking to the main docs. I also wrote `python/README.md` in [#880](https://github.com/stjude-rust-labs/sprocket/pull/880), which describes how to setup the Python development environment. I would later enhance this file with information on Sprocket's minimum Python policy, how to run several of the development tools mentioned in [Continuous Integration](#continuous-integration), how to track test coverage, and how to build the website with Sphinx.

### Release Infrastructure

In [#1111](https://github.com/stjude-rust-labs/sprocket/pull/1111) I wrote a Github Actions workflow that would automatically build and publish new releases of the Python bindings to [PyPI](https://pypi.org/project/sprocket-bio/). This workflow pre-compiles the bindings into [wheels](https://packaging.python.org/en/latest/specifications/binary-distribution-format/) for several common platforms so that most users will not need to compile them from scratch during installation[^pre-compiled-wheels]. It then uses [`pypa/gh-action-pypi-publish`](https://github.com/pypa/gh-action-pypi-publish) to publish the artifacts to PyPI, which comes with several security measures that make [supply chain attacks](https://en.wikipedia.org/wiki/Supply_chain_attack) more difficult.

[^pre-compiled-wheels]: It also means that most users don't need the Rust compiler installed in order to use the bindings.

## The Current State and Goals Achieved

Due to my efforts, the Python bindings now expose Sprocket's diagnostics, grammar, and AST APIs. The bindings are tested for correctness, include complete type information, are well-documented with examples and an API reference, and have a secure and automated release process.

Looking back at my original proposal, I laid out four goals for my work this summer:

1. The bindings should be powerful enough to achieve non-trivial tasks using just Python.

I think I was close to hitting this goal, but didn't quite make it. I didn't finish the lint stage, which I think is necessary before calling the bindings "powerful". Even if the AST stage may have been good enough for a first release, my implementation had a flaw documented in [#1134](https://github.com/stjude-rust-labs/sprocket/issues/1134) that I believe needs to be fixed before I can say this goal was achieved.

2. The bindings should be tested, linted, and formatted to ensure a baseline level of quality.

Yes, with flying colors! I implemented unit tests, code coverage, type checking, code formatting, and import sorting.

3. The bindings should have API documentation and examples available online.

Yes as well! The bindings have documentation published online at <https://sprocket-bio.readthedocs.io/>, complete with an automatically-generating API reference and detailed examples. While I think there's room for improvement, I'm still quite satisfied with its current state.

4. The bindings should be published to [PyPI](https://pypi.org/).

At the time of writing this, not yet. The package is reserved on PyPI as [`sprocket-bio`](https://pypi.org/project/sprocket-bio/) and I wrote the release infrastructure in [#1111](https://github.com/stjude-rust-labs/sprocket/pull/1111), however that PR still needs some finishing touches before being merged, and even then the first release may still be a ways off. The groundwork is all there, but the bindings need a bit more time in the oven before they can be shared with the world.

## What's Left?

At the present, I have two open PRs with reviewer feedback that I need to address: [#1111](https://github.com/stjude-rust-labs/sprocket/pull/1111) and [#1123](https://github.com/stjude-rust-labs/sprocket/pull/1123). Once those are merged, there are three open issues that I believe need to be completed before the Python bindings should be released. First, the `README.md` needs to be updated to contain installation instructions, a link to the docs, and a few more details that are useful for users ([#995](https://github.com/stjude-rust-labs/sprocket/issues/995)). Second, the AST bindings need to expose the `kind()`, `text()`, and `span()` methods, which I believe are necessary in making the AST bindings practical ([#1134](https://github.com/stjude-rust-labs/sprocket/issues/1134)). Finally, the docs should be enhanced with an example using the AST bindings, similar to the examples provided for the diagnostics and grammar bindings ([#1135](https://github.com/stjude-rust-labs/sprocket/issues/1135)). Once that is finished, I believe the Python bindings would be ready for its first v0.1.0 release!

## Lessons Learned

Overall, I'm quite satisfied with my work this summer participating in GSoC. If there was one lesson I would take away, however, it would be to account for complications when estimating work.

In my original proposal, I estimated that the AST bindings would be completed by week 6, however in reality it took me until week 13 to do so. By the time [#1042](https://github.com/stjude-rust-labs/sprocket/pull/1042) merged, I ran out of time to work on the lint bindings and manage the actual release. I'm a little ashamed of this fact, as I feel like I underdelivered what I originally promised. This wasn't because I was lax or didn't work hard, though. My mentor reassured me in our weekly meetings that I was working at a good pace. Rather, I believe it is because I underestimated how much time the AST bindings would take.

I didn't consider writing a proc-macro for the AST bindings in my original proposal and timeline, I came up with the idea halfway through the summer. While the macro was absolutely the correct decision for the longevity of the project, I had very little experience writing procedural macros up until that point[^mergeme]. The time I spent learning, building, and refining `#[ast]` and `#[ast_methods]` was unplanned for, and resulted in later promised work to not be accomplished.

In future projects when I need to estimate how much time the work will require, I will build in extra time for unforeseen work. That way I have a buffer of time to use if something takes longer than expected, like it did with the proc-macros. Additionally, I plan to periodically reassess my pace on these projects and adjust my goals on the fly. That way, if I see that a project will not be done in time, I can communicate that early and account for it in my plans.

In the end, I am still incredibly proud of the work I put in on Sprocket's Python bindings. I am confident that the groundwork I laid will become a strong stepping stone for the others who take over the project after I leave. I want to thank my mentor, Clay McLeod, for guiding me through this project and offering insightful feedback. I was incredibly impressed by the quality of his code reviews, and hope that one day I can become as skilled as he. Google Summer of Code was an absolute blast, and I highly recommend it to any student who loves open-source software and wants to make a difference in the world.

[^mergeme]: Before GSoC, my only experience writing proc-macros was for [`mergeme`](https://github.com/BD103/mergeme), and that was barely 300 lines of code excluding comments.
