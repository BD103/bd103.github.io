---
layout: post
title: "Bool is what?"
date: 2021-12-23 11:01:25 +0000
tags: bruh
---

Hello and happy holidays everyone! This post is not essay nor tutorial. It's just there to share a "bruh" moment.

```python
>>> isinstance(True, int)
True
```

## Context

So I'm working on my `hex` module in my [Python package](https://github.com/BD103/BD103-Python), and I discovered the above statement. I was getting an error in my test code that read like the following.

```python
>>> hex._default_encoder.encode_bool(True)
'ff'
>>> hex._default_encoder.encode_list([1, 2, True])
['01', '02', '01']
```

If we look at `encode_list()`, it is a simple return `return [self.smart_encode(i) for i in o]`. Let's look at `smart_encode()`:

```python
def smart_encode(self, o: t.Any) -> t.Union[str, list[str]]:
    if isinstance(o, int):
        return self.encode_int(o)
    elif isinstance(o, str):
        return self.encode_str(o)
    elif isinstance(o, bool):
        return self.encode_bool(o)
    elif isinstance(o, list):
        return self.encode_list(o)
    else:
        raise TypeError(
            f"Given data {repr(o)}'s type is not supported by HexEncoder"
        )
```

*Aha!* We found it. The first line detects whether it is a number or not. To fix this, let's detect whether it is a bool or not.

```python
>>> isinstance(True, int)
True
>>> isinstance(1, bool)
False
```

*Just because a boolean is an integer doesn't mean that an integer is a boolean.*

## Implications

The fact that a boolean is really an integer makes sense. A "bit" is simply a 1 or 0. On or off. This makes sense, so let's do a bit more research. (No pun intended.)

```python
>>> 1 == True
True
>>> 0 == False
True
>>> 1 is True
<input>:1: SyntaxWarning: "is" with a literal. Did you mean "=="?
<input>:1: SyntaxWarning: "is" with a literal. Did you mean "=="?
False
```

Curious. Just because 1 and True have the same value does not mean that they have the same id.

After some more invesitgation, I found [this paragraph](https://docs.python.org/3/library/stdtypes.html#numeric-types-int-float-complex) in the Python docs.

> There are three distinct numeric types: integers, floating point numbers, and complex numbers.
> **In addition, Booleans are a subtype of integers.**

There we go. It is [intentional game design](/assets/img/igd.png).
