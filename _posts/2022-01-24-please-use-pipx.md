---
layout: post
title: "Please Use Pipx"
date: 2022-01-24 12:00:00 +0000
tags: guide
---

Hello, and welcome back to another blog post. **Please use Pipx!**

![Pipx Logo](https://raw.githubusercontent.com/pypa/pipx/main/logo.png)

## What is it?

Pipx is a tool for installing command-line Python projects in isolated environments, meaining that it has the pros of Pip but it doesn't have dependency conflict.

### Example

You have package "a", which requires [Click 7.1.2](https://pypi.org/project/click/7.1.2/). You also have package "b", which requires [Click 8.0.3](https://pypi.org/project/click/8.0.3/). Their dependencies are incompatible, meaning that you can't use these packages at the same time.

Or can you?

### Elevator Pitch

Pipx allows you to run these tools from the command-line without worrying about dependency conflicts because each tool has a separate [virtual environment](https://docs.python.org/3/library/venv.html).

> "Install and Run Python Applications in Isolated Environments" -[Pipx Website](https://pypa.github.io/pipx/)

## Use Cases

There are plenty of tools that would be improved if installed through Pipx. Some of the most notable:

- [Poetry](https://python-poetry.org/)
- [Black](https://pypi.org/project/black/)
- [Isort](https://pypi.org/project/isort/)
- [Flake8](https://pypi.org/project/flake8/)
- [Cookiecutter](https://pypi.org/project/cookiecutter/)
- [iPython](https://pypi.org/project/ipython/) / [Jupyter](https://pypi.org/project/jupyter/)
- _More!_

### Poetry

As soon as I realized Pipx worked with Poetry, I was instantly sold. Poetry is my go-to project manager, and is used for almost all of my Python projects. Poetry has its own installer and everything, but that can do weird things with the transition from `get-poetry.py` to `install-poetry.py` in version 1.2.

Instead, just run:

```console
$ pipx install poetry
```

This will handle everything you need for Poetry, and you don't have to worry about upgrading anything in the future! **It's genius!**

> **Note:** [Pipx is under the "unrecommended" section](https://python-poetry.org/docs/#installing-with-pipx) for installation.
> I've used Poetry for long enough to disagree.
> Poetry is set up as a Python package, `install-poetry.py` just creates a virtualenv and puts it on the path.
> This is exactly what Pipx does, except Pipx supports a whole lot more.

## Installation

There are three ways to install Pipx, the clean _Pipx-in-Pipx_ version, or the meh official version. (You can also simulate Pipx-in-Pipx too!)

### Offical meh version

Pipx recommends using Pip to install itself. The problem with this is that it requires Pipx's dependencies be installed globally on your system. Pipx requires the following dependencies ([as of 1.0.0](https://github.com/pypa/pipx/blob/1.0.0/setup.cfg#L33-L38)):

- Colorama >= 0.4.4 if on Windows
- Userpath >= 1.6.0
- Argcomplete >= 1.9.4
- Packaging >= 20.0
- Importlib-metadata >= 3.3.0 if Python 3.7 or lower

Please don't do this, as this is not isolated and can conflict with your other projects. If you must, [see installation instructions here](https://pypa.github.io/pipx/#install-pipx).

### Pipx-In-Pipx (recommended)

I used [this project](https://pypi.org/project/pipx-in-pipx/) to install Pipx on my Windows computer, and it worked phenominally. What it does is set up a temporary environment, install Pipx, then use Pipx to install Pipx.

To do this, run the following command:

```shell
$ python -m pip install pipx-in-pipx
```

This will take longer to load than most packages, but **this is intentional**.

There are a few side-effects of doing this method, namely:

- Running `pipx uninstall-all` will also uninstall Pipx. This is intentional.
  - You can fix this by installing `pipx-in-pipx` again
- The Python version used by Pipx will be the Python version you used to run the install command.

> "[pipx](https://pipxproject.github.io/pipx/) has a handy feature to uninstall _all_ [pipx](https://pipxproject.github.io/pipx/)-managed tools. Because you have now made [pipx](https://pipxproject.github.io/pipx/) manage itself, running pipx uninstall-all _will also_ uninstall [pipx](https://pipxproject.github.io/pipx/).
> This is not a bug, but a feature. By installing [pipx](https://pipxproject.github.io/pipx/) using pipx-in-pipx, you have expressed an intent that you _want_ [pipx](https://pipxproject.github.io/pipx/) to manage itself. If that’s not what you want, this is not the tool for you.
> If you at any point uninstall your [pipx](https://pipxproject.github.io/pipx/)-managed [pipx](https://pipxproject.github.io/pipx/), you can simply pip install pipx-in-pipx again to rebuild it." -[Pipx-in-Pipx PyPI Page](https://pypi.org/project/pipx-in-pipx/)

### Simulate Pipx-in-Pipx

If you're unsure about installing a weird package the does a "slightly (but only slightly) evil" thing, you can simulate it yourself! All you need to do is install Pipx in a virtualenv, install Pipx in Pipx, then ensure the path.

```shell
# Create and set up virtualenv
$ python -m venv .venv
$ source .venv/bin/activate
(.venv) $ python -m pip install -U pip setuptools wheel
(.venv) $ python -m pip install -U pipx

# Install Pipx and adjust path
(.venv) $ pipx install pipx
(.venv) $ pipx ensurepath
(.venv) $ deactivate

# Test everything worked
$ pipx --version
1.0.0
```

If everything works correctly, you should be able to run Pipx outside of the virtualenv. Congrats! It worked! (You can delete `.venv` if you want.)

> If you still can't access Pipx outside of the virtualenv, you can set the path manually.
>
> ```shell
> (.venv) $ pipx ensurepath
> Success! Added /home/user/.local/bin to the PATH environment variable.
> ...
> ```
>
> For the above example, the path is `/home/user/.local/bin`.
> Take this file path and follow the instructions of [this article](https://katiek2.github.io/path-doc/).
> You may have to restart your terminal afterwards, but you should be able to access Pipx outside of the virtualenv.

---

I hope you found this article helpful! I did some rudimentary testing, so this article _should_ work for Linux and maybe MacOS. You may have to change a few things in Windows, but feel free to [shoot me a question](https://github.com/BD103/BD103/issues) if you have trouble.

Here are some resources that you may find handy after getting Pipx up and running.

- [Pipx Website](https://pypa.github.io/pipx/)
- [Pipx on PyPI](https://pypi.org/project/pipx/)
- [Pipx Source](https://github.com/pypa/pipx/)
- [Pipx-in-Pipx PyPI](https://pypi.org/project/pipx-in-pipx/)
- [Pipx-in-Pipx Source](https://github.com/mattsb42-meta/pipx-in-pipx)

See you around!

~BD103
