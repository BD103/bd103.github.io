---
layout: post
title: "Bookmarklets!"
date: 2021-09-27 13:34:16 +0000
tags: samples
---

The following are a list of bookmarklets I have come across in my journey through the web. **Most of these are not mine!** I don't know the links to most of them, but feel free to submit an [issue on the repo](https://github.com/BD103/bd103.github.io/issues), and I'll fix it right up!

## Utilities

<ul>
  {% for mark in site.data.marks.utils %}
    <li>
      <a href="{{ mark.data }}" title="{{ mark.desc }}">
        {{ mark.name }}
      </a>
    </li>
  {% endfor %}
</ul>

## Fun

<ul>
  {% for mark in site.data.marks.fun %}
    <li>
      <a href="{{ mark.data }}" title="{{ mark.desc }}">
        {{ mark.name }}
      </a>
    </li>
  {% endfor %}
</ul>

## Effects

<ul>
  {% for mark in site.data.marks.fx %}
    <li>
      <a href="{{ mark.data }}" title="{{ mark.desc }}">
        {{ mark.name }}
      </a>
    </li>
  {% endfor %}
</ul>

## Guide

1. Right click a link to copy the Javascript
2. Create a new bookmark in your bookmarks bar
3. Edit the bookmark, and paste the code into the url
4. Click the bookmark while on a website, voila!

## Tests

<script>var x = 0;</script>
<button type="button" onclick="document.getElementById('autoclick-count').innerHTML = 'Count: ' + x; x++;">Click!</button>
<span id="autoclick-count">Click the button!</span>

## Credits

Sadly not all credit can go to where credit is due, sense I can not remember everything. Some ones that I do remember are:

- [Gunner Basil](https://www.gbasil.dev/bookmarklets)

*I also edited and created a few myself (¬､¬)*

-----

Cya,

~BD103
