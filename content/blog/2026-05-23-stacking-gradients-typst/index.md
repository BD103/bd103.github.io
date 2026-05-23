+++
title = "Stacking Gradients in Typst"
description = "Recreating CSS's stacked gradient effect in the Typst document generator, and using it in my Google Summer of Code proposal"

[taxonomies]
tags = ["gsoc", "typst", "css"]
+++

In March I wrote a [Google Summer of Code](https://summerofcode.withgoogle.com) proposal for [St. Jude Children's Research Hospital](https://stjude.org). My proposal was specifically geared towards [Sprocket](https://sprocket.bio/), a bioinformatics workflow engine. While typesetting my document, Sprocket's homepage caught my eye.

{{ figure(src = "sprocket-homepage.png", alt = "A screenshot of Sprocket's homepage", caption = "Sprocket's homepage", width = "100%") }}

I really love the gradient in the background of the hero banner. The blend between navy, purple, and blue are iconic, and I wanted to recreate this effect in the title page of my proposal.

Using DevTools, I looked at the CSS for the background and found the following:

```css
.hero__background {
  background: radial-gradient(circle at top right, #7035b4 0%, transparent 55%), radial-gradient(circle at bottom right, #6e89be 0%, transparent 45%), #070A19;
}
```

This CSS takes advantage of a fun quirk of the [`background` property](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/background):

{% quote(cite="[MDN on background image painting order](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/background#image_painting_order)") %}
If multiple comma-separated backgrounds are included, they create multiple background layers on top of one another. The first background in the list creates the top layer. If the top layer contains no transparent areas, this is the only layer that will be visible.

The last layer is the bottom layer. The background color is always included in this layer.
{% end %}

In sum, the hero background is actually three backgrounds stacked on top of each other!

<div class="gradient-grid">
  <div id="gradient-1"></div>
  <div id="gradient-2"></div>
  <div id="gradient-3"></div>
</div>

<style>
  .gradient-grid {
    display: grid;
    grid-template-columns: 3fr 1fr 3fr 1fr 3fr;
  }

  .gradient-grid div {
    aspect-ratio: 1 / 1;
    outline: solid 1.5px var(--primary-color);
  }

  #gradient-1 {
    background: radial-gradient(circle at top right, #7035b4 0%, transparent 55%);
    grid-column: 1;
  }

  #gradient-2 {
    background: radial-gradient(circle at bottom right, #6e89be 0%, transparent 45%);
    grid-column: 3;
  }

  #gradient-3 {
    background: #070A19;
    grid-column: 5;
  }
</style>

I created my proposal using [Typst](https://typst.app/home/), a typesetting system similar to [LaTeX](https://www.latex-project.org/). Typst allows you to set the background of a page using the [`fill` parameter](https://typst.app/docs/reference/layout/page/#parameters-fill), but unfortunately it only supports a single color or gradient.

```typst
#page(
  // Purple to black background gradient.
  fill: gradient.radial(
    rgb("#7035b4"),
    rgb("#070A19"),
    center: (100%, 0%),
    radius: 100%,
  )
)[
  #set align(center + horizon)
  #set text(fill: white)
  #set par(spacing: 0.6em)

  #text(7em)[Title]

  #text(3em)[Subtitle]
]
```

{{ figure(src = "single-gradient.svg", alt = "A page with a centered placeholder title and subtitle and a single gradient background", width = "50%") }}

This isn't the end of the world, however, because I found that [`block`](https://typst.app/docs/reference/layout/block/) also has a [`fill` parameter](https://typst.app/docs/reference/layout/block/#parameters-fill). To make a stacked gradient liked Sprocket's homepage, I simply created a `block` inside the `page` with the extra gradient!

```typst
#page(
  // Purple to black background gradient.
  fill: gradient.radial(
    rgb("#7035b4"),
    rgb("#070A19"),
    center: (100%, 0%),
    radius: 100%,
  ),
  // No margin, so inner block fills entire page.
  margin: 0in,
  // The inner block with the extra gradient to be stacked on top of the page
  // background.
  block(
    width: 100%,
    height: 100%,
    // Blue to transparent layer gradient.
    fill: gradient.radial(
      rgb("#6e89be"),
      luma(0, 0%),
      center: (100%, 100%),
      radius: 100%,
    ),
  )[
    #set align(center + horizon)
    #set text(fill: white)
    #set par(spacing: 0.6em)

    #text(7em)[Title]

    #text(3em)[Subtitle]
  ]
)
```

{{ figure(src = "stacked-gradient.svg", alt = "A page with a centered placeholder title and subtitle and a stacked gradient background", width = "50%") }}

Perfect! In the end, I added a few finishing touches and landed with this as my title page:

{{ figure(src = "proposal-title-page.svg", alt = "The front page of my GSoC proposal", width = "50%") }}

I'm super proud of the final result! It looks professional, with a lot of care put into it. The stacked gradients add a bit of flair that really makes it stand out. This is a great example of the power that Typst affords you, as compared to a word processor like Microsoft Word or Google Docs.

While the title page was definitely not the complete reason, it must have helped somewhat! [My proposal was selected](https://summerofcode.withgoogle.com/programs/2026/projects/BNPmlzOg) of the 70 applications St. Jude received, so starting next week I will working with their developers to implement Python bindings for Sprocket's WDL crates! Google Summer of Code is a program I've wanted to participate in for a few years now, ever since I read that [the Rust project was participating back in 2024](https://blog.rust-lang.org/2024/02/21/Rust-participates-in-GSoC-2024/). I'm really excited to be working with the developers at St. Jude, learning from their experience, making strong relationships, and building something that leaves a positive impact on the world.

Until next time,

\- BD103 :)
