+++
title = "Rust Hashing Cheat Sheet"
description = "Several examples of how to use Rust's hashing traits and types"

[taxonomies]
tags = ["rust"]
+++

Hashing is the process of transforming arbitrary data into a fixed-size number. Several useful programming concepts arise out of hash codes:

- Hash sets and maps
- Data digests
- Cheap identifiers / inequality checks
- Storing passwords

Recently I tried writing a hash set from scratch in [Rust](https://rust-lang.org/) for educational purposes, but was awfully confused by the collection of traits and types provided by [`std::hash`](https://doc.rust-lang.org/stable/std/hash/index.html). In this post I hope to share some common patterns related to hashing in Rust, while explaining `std::hash` as I go.

## Hashing a Single Value

Hashing a value is as simple as creating a `Hasher`, calling `value.hash(&mut hasher)`, and then calling `hasher.finish()`.

```rust
use std::hash::{DefaultHasher, Hash, Hasher};

let mut hasher = DefaultHasher::new();
"Hello, world!".hash(&mut hasher);
let hash: u64 = hasher.finish();

println!("Hash: {hash}"); // Hash: 7092736762612737980
```

## Hashing Several Values into One Code

You can call `value.hash(&mut hasher)` several times to create a hash code composed of multiple data sources. This is useful when hashing structs or arrays.

```rust
use std::hash::{DefaultHasher, Hash, Hasher};

let mut hasher = DefaultHasher::new();

"Hello".hash(&mut hasher);
13u64.hash(&mut hasher);
false.hash(&mut hasher);

let hash: u64 = hasher.finish();

println!("Hash: {hash}"); // Hash: 3402450879032501501
```

## `Hash`, `Hasher`, and `DefaultHasher`

- [`Hash`](https://doc.rust-lang.org/stable/std/hash/trait.Hash.html): a type that can be hashed (`str`, `u64`, `bool`, etc.)
- [`Hasher`](https://doc.rust-lang.org/stable/std/hash/trait.Hasher.html): a hashing algorithm (`DefaultHasher`, 3rd-party implementations)
- [`DefaultHasher`](https://doc.rust-lang.org/stable/std/hash/struct.DefaultHasher.html): Rust's default hashing algorithm[^siphash]

`Hasher`s are never re-used to make several hash codes. If you want to compute a new hash code, you discard the current `Hasher` and create a new one.

[^siphash]: In Rust 1.91.0 the default hashing algorithm is [SipHash 1-3](https://en.wikipedia.org/wiki/SipHash), but this is an internal detail that may change in the future.

## Hashing with a Random Seed

To make a hash resilient to [hash flooding](https://en.wikipedia.org/wiki/Collision_attack#Hash_flooding), you can create a `Hasher` with a random seed using `RandomState`.

```rust
use std::hash::{BuildHasher, Hash, Hasher, RandomState};

let state = RandomState::new();

let mut hasher = state.build_hasher();
"Hello, world!".hash(&mut hasher);
let hash = hasher.finish();

println!("Hash: {hash}"); // Hash: 1905042730872565693
```

There's also a shorthand for this pattern using [`BuildHasher::hash_one()`](https://doc.rust-lang.org/stable/std/hash/trait.BuildHasher.html#method.hash_one).

```rust
use std::hash::{BuildHasher, RandomState};

let state = RandomState::new();

let hash = state.hash_one("Hello, world!");

println!("Hash: {hash}"); // Hash: 11506452463443521132
```

Note how the hash codes are different from the two examples, even though they're both hashing `"Hello, world!"`, because `RandomState::new()` creates a new random seed each time it is called.

## `BuildHasher` and `RandomSeed`

- [`BuildHasher`](https://doc.rust-lang.org/stable/std/hash/trait.BuildHasher.html): a type that can create a new `Hasher` with a seed
- [`RandomState`](https://doc.rust-lang.org/stable/std/hash/struct.RandomState.html): generates a random seed when constructed, then builds `Hasher`s using that seed

If you want to hash two separate values and compare them for equality, you would typically create one `RandomState` then use it to build two `DefaultHasher`s with the same seed.[^default-hasher-new]

[^default-hasher-new]: Technically, you could just create the two hashers by calling `DefaultHasher::new()`, which initializes them with a seed of 0. This is vulnerable to [hash flooding](https://en.wikipedia.org/wiki/Collision_attack#Hash_flooding) attacks, however, so I don't recommend it!

## Deriving `Hash`

The easiest way to make a custom type hashable is by deriving `Hash`.

```rust
use std::hash::{DefaultHasher, Hash, Hasher};

#[derive(Hash)]
struct Foo {
    a: &'static str,
    b: u64,
    c: bool,
}

let mut hasher = DefaultHasher::new();

Foo { a: "Hello", b: 13, c: false }.hash(&mut hasher);

let hash: u64 = hasher.finish();

println!("Hash: {hash}"); // Hash: 3402450879032501501
```

## Implementing `Hash` Manually

If you look closely, you'll notice that the hash codes from [Hashing Several Values into One Code](#hashing-several-values-into-one-code) and [Deriving `Hash`](#deriving-hash) are equal! This is because they're hashing the same data in the same order with the same seed. To prove this, we can expand the `Hash` derivation:

```rust
use std::hash::{Hash, Hasher};

struct Foo {
    a: &'static str,
    b: u64,
    c: bool,
}

impl Hash for Foo {
    fn hash<H: Hasher>(&self, state: &mut H) {
        self.a.hash(state);
        self.b.hash(state);
        self.c.hash(state);
    }
}
```

## Conclusion

I hope these examples help you wrap your head around Rust's hashing support! While I didn't cover it in this article, you may be also interested in [`Hasher`](https://doc.rust-lang.org/stable/std/hash/trait.Hasher.html)'s methods and how primitives like [`bool`](https://doc.rust-lang.org/stable/std/hash/trait.Hash.html#impl-Hash-for-bool), [`char`](https://doc.rust-lang.org/stable/std/hash/trait.Hash.html#impl-Hash-for-char), and [tuples](https://doc.rust-lang.org/stable/std/hash/trait.Hash.html#impl-Hash-for-(T,)) implement `Hash`. You may also enjoy looking at [`rustc-hash`](https://lib.rs/crates/rustc-hash) (previous `fxhash`), [`fnv`](https://lib.rs/crates/fnv), [`sha2`](https://lib.rs/crates/sha2), and [`blake2`](https://lib.rs/crates/blake2).

Happy hacking!
