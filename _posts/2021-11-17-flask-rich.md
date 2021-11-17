---
layout: post
title: "Guide to Flask Rich"
date: 2021-11-17 13:00:46 +0000
tags: guide
---

[Flask-Rich](https://pypi.org/project/flask-rich/) is a Python package that I recently made. It makes developing Flask applications a lot easier.

## Background

[Rich](https://pypi.org/project/rich/) is a programming library that I discovered a year back. It allows functionality for tables, fancy prompts, and more.

![An example of Rich](https://raw.githubusercontent.com/willmcgugan/rich/master/imgs/features.png)

> The [Rich API](https://rich.readthedocs.io/en/latest/) makes it easy to add color and style to terminal output. Rich can also render pretty tables, progress bars, markdown, syntax highlighted source code, tracebacks, and more — out of the box.

## What does Rich-Flask do?

It adds many Flask-specific features with a lot of customizability. Here is an example:

![Rich's logging with Flask](https://github.com/BD103/Flask-Rich/raw/main/imgs/logging.png)

## Installation

There are different installation processes based on different environments. Choose yours:

- [PIP](#pip)
- [Poetry](#poetry)
- [Replit](#replit)
- [Git](#git)

### PIP

Installing Flask-Rich with PIP is very easy. If you want it global (available to all projects), type:

```shell
# Also updates an existing version if you already have it
python -m pip install -U flask-rich
```

If you are using a virtual environment, try this:

```shell
# Create venv
python -m venv .venv
# Activate
source .venv/bin/activate
# Install
python -m pip install -U pip
python -m pip install -U flask-rich
```

### Poetry

This environment is even easier than PIP! Make sure you have an existing pyproject.toml file with `poetry init`:

```shell
poetry add flask-rich
```

For more information on using Poetry, [check out their website here](https://python-poetry.org/).

### Replit

If you don't have a home computer, you can use Replit. Follow [this guide here](https://docs.replit.com/programming-ide/installing-packages#searching-for-and-adding-packages) and type in flask-rich.

### Git

If you want the most bleeding-edge tech, you can clone the repository with Git. **This version is most likely unstable and may have unresolved bugs!**

```shell
# Git
git clone https://github.com/BD103/Flask-Rich.git
cd Flask-Rich/

# Poetry
poetry lock
poetry install
poetry shell
```

You can then make this global by running the following (not recommended):

```shell
poetry build
cd dist/
# Replace the asterisks with the version
pip install -U Flask_Rich-*.*.*-py3-none-any.whl
```

## Usage

Flask-Rich works like a classic Flask extensions. It is a class that you pass the app object into.

### Single File

```python
# app.py
from flask import Flask
from flask_rich import RichApplication

app = Flask(__name__)
rich = RichApplication(app)

@app.route("/")
def index():
    ...
```

`RichApplication` initializes everything necessary.

### Multiple Files (Complex Projects)

If you use a more complex project structure and want to avoid circular imports, you can have a project structure like this:

```
project/
  __init__.py
  app.py
  bridge.py
  ...
```

```python
# bridge.py
from flask_rich import RichApplication
# You can also import other extensions like Flask-SQLite

rich = RichApplication()
```

```python
# app.py
from flask import Flask
from .bridge import rich

def create_app(name: str) -> Flask:
  app = Flask(name)
  rich.init_app(app)

  ...

  return app
```

### Configuration

Flask-Rich gets its configuration from the [`Flask.config`](https://flask.palletsprojects.com/en/2.0.x/config/) object. All options have the `RICH_` prefix and can be found [here](https://github.com/BD103/Flask-Rich#class-options). For the configuration to work, it has to be set **before** initializing your `RichApplication` instance.

If you pass your app into `RichApplication` on its creation (like the single file example), you have to set the config before even creating this object.

```python
app = Flask(__name__)
app.config["RICH_LOGGING_MARKUP"] = False
rich = RichApplication(app)
```

If you use the `RichApplication.init_app(app)` function (complex project example), you just have to set the config before then.

```python
app = Flask(__name__)
rich = RichApplication()

app.config["RICH_TRACEBACK_SHOW_LOCALS"] = True

rich.init_app(app)
```

## Contributing

Rich-Flask is a generally small codebase. With the [core file](https://github.com/BD103/Flask-Rich/blob/v0.3.0/src/flask_rich/core.py) less than 100 lines of code as of version 0.3.0, there's not much room for confusion. If you have any suggestions for the package, do tell! I check Github regularly, so a nice [comment in the issues section](https://github.com/BD103/Flask-Rich/issues) of the repo is very helpful.

---

Thank you for checking out my corner of the internet! You can find me making the occasional blog post and coding project. Special thanks [Will McGugan for the Rich libary](https://github.com/willmcgugan/rich) and the [people at Pallets for Flask](https://github.com/pallets/flask).

Bye! :>
