---
layout: post
title: "Using Shared-State Function in Python"
date: 2022-05-10 11:13:10 +0000
---

Did you know that default arguments in Python are only evalutated once?

To explain what this means, let's create a simple function.

```python
from random import randint

def foo(x: int = randint(0, 10)):
    print(x)
```

The intent of `foo()` is to take a value `x` and print it to the screen. If `x` is not specified, it instead prints a random number from 0 to 10. There is a problem, though. Let's trying running `foo()` a few times.

```python
>>> foo(3)
3
# Ok, it prints x when given
>>> foo()
9
# It printed a random number when x is not given, good!
>>> foo()
9
# Same number, huh
>>> foo()
9
# 9 again?!? There's a very low chance of this happening
>>> foo()
9
# Ok, there's a bug in my code
```

The aforementioned bug has to do with the beginning statement, "_default arguments in Python are only evalutated once_. The intent of `foo()` was for `randint()` to be run every time. Instead, the Python interpreter evaluates `foo()` and sets the default of `x` to the value returned.

This is why `foo()` was returning 9 every time. It wasn't using the function `foo()`, it was using the value that it initially returned.

## Workarounds

If we wanted to continue this example, we could do a few things. The "recommended" method is the following. Instead of evaluating the function, it sets the default to `None`. It then detects if the `x` is `None` in the function body.

```python
from random import randint

def foo(x: int = None):
    if x is None:
        print(randint(0, 10)
    else:
        print(x)
```

There are other solutions to this, but I'll let you figure those out. :)

## How can we use this?

There are plenty of ways to use this for our advantage, but my favorite is using default variables for shared-state functions. The idea is creating a variable that our function can access and edit. It will be scoped, so only that function can adjust this.

Let me create a function to explain this.

```python
# intertools.count but it's simplified
def count():
    x = 0

    while True:
        yield x
		x += 1

def bar(msg: str, _count=count()):
	print(f"[{next(_count)}] {msg}")
```

1. We create a iterator called `count()`. Every time we call `next(my_count)`, it will return the next value in a sequence of numbers. It would return 0, then 1, then 2, etc.

```python
...
>>> my_count = count()
>>> next(my_count)
0
>>> next(my_count)
1
>>> next(my_count)
2
...
```

2. We create a function called `bar()`. It takes a message (`msg`) and prints it to the console. The difference is that is remembers which message it is printing. It will first print `[0] Message`, then `[1] Message`, then `[2] Message`, etc.
3. `bar()` has a default argument called `_count`. It contains the iterator that keeps track of which number we are on. It also is prefixed with an underscore. This is a Python convention that designates `_count` as a private variable. Programs that use `bar()` are not supposed to fill in `_count` unless they know what they are doing.
4. Every time `bar()` is called, it increments the count by 1. It saves it's "state" in it's function signature.

## That seems kind of hacky, is there a better way?

Maybe.

Another way to implement this patter would be to have a global variable that `bar()` can access.

```python
...

_BAZ_COUNT = count()

def baz(msg: str):
	print(f"[{next(_BAZ_COUNT)}] {msg}")
```

This would still work the same, except for the fact than any part of the program can change `_BAZ_COUNT`. That doesn't mean changing the count isn't possible in the previous example. The function caller could easily call `bar(_count=another_count)`.

This is all just up to preference, and whatever fits your program. While using `baz()` is probably "better practice," using shared-state functions are not bad. They are just another tool to add to your resevoir of programming knowledge.

Anyways, that's all for today. I hope to see you later,

~BD103
