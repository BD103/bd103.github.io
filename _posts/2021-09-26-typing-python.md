---
layout: post
title: "Using Python Typing"
date: 2021-09-26 16:35:02 +0000
tags: guide
---

Recently, I have been learning Java. The thing about Java that I like is that it is **typed**.

Typed languages, like Java and TypeScript, allow you to specify what kind of variable is being defined. It allows you to say something like, "variable x, which is an integer, is equal to 11." It also allows you to specify what type of variable a function returns.

This is _extremely_ handy for writing APIs, as people reading your code can figure out what to expect. Let's get into some examples in Python.

## Simple Examples

```python
x: str = "Hello, world"

y: int
y = 6

# This would raise an error in a type checker
# But cPython will not doing anything about it
z: bool = "a" 
```

Basic type hinting is `var_name: var_type`. This works in almost all instances of defining variables. You'll notice that variable `z` is special. Since this is just type _hinting_, it is not strict. If you break your hints, Python will not care.

In the case that you use a linter, this may raise an error. Make sure to try your hardest to not break your own rules.

```python
def example_func(param1: str, param2: int=5) -> bool:
	print(param1)
	# If param2 is greater than 5, return True
	return param2 > 5
```

This example gives a bit more *functionality*. (Laugh at my jokes, please.) Here you can see you can give parameters the same kind of type hinting as normal variables. This is actually more common than the previous. A lot of popular packages and libraries hint their functions but not their normal variables.

You can also see the `->`. This is a new figure that specifies what kind of variables the function returns. Here, for instance, it is a string.

## Advanced Hinting

There are a few more major ways to hint types. I'm not going to cover everything, only the largest. If you want a complete reference, check out the [typing](https://docs.python.org/3/library/typing.html) built-in module.

```python
x: list[bool] = [True, False, False, True, False]
y: dict[str, int] = {"1": 1, "2": 2, "3": 3}
```

Giving a the format about, `list[type]`, tells Python what kind of data is inside the list. Likewise, you can specify two types in a dictionary with `dict[key, value]`.

```python
from typing import Any, Union

just_anything: dict[str, Any] = {"a": 3, "b": "py", "c": True}

def say_hi(x: Union[str, int]) -> str:
	return "hi, " + x
```

The `Any` type is the default type. Create a new variable without any hinting, it has the `Any` type. This type can be anything. The `Union` type means "either." So in the example, `x` can either be a string or an integer.

```python
from typing import Optional

def for_when(y: Optional[int]=None):
	pass
```

Using the `Optional` keyword is when the variable can either be `None` or the type specified. `Optional[type]` is the same as `Union[type, None]`.

## New in 3.10

> ~~**Note:** This version is not out, so the examples **probably will not work**! You have been warned.~~
>
> **Update:** Python 3.10 has been released! You can use all the new features by downloading it [here](https://www.python.org/downloads/).

~~Python 3.10 is coming out soon!~~ With Python 3.10's release comes a whole lot of stuff, but there are some [specific things](https://docs.python.org/3.10/whatsnew/3.10.html#new-features-related-to-type-hints) that are very exciting! To be more specific, a new union operator that can be used in typing.

```python
from typing import Union

# 3.9 and older
def square_old(num: Union[int, float]) -> Union[int, float]:
	return num ** 2

# 3.10+
def square_new(num: int | float) -> int | float:
	return num ** 2
```

The `|` symbol has been added! It will replace the `Union` type, and makes writing functions a lot easier. (It can also merge two dictionaries together with `{dict1 | dict2}`!)

-----

Thank you for reading my blog, and I hope that this tutorial has helped you! (At least now whenever someone asks me what `->` does I can send them this.) If you have any questions, feel free to [raise a question on Github](https://github.com/BD103/bd103.github.io/issues). Thanks, and see you!

~BD103
