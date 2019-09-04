# ccss

This tool checks if the properties of yours CSS files respect the [concentric order][1].

## Installation

```sh
npm install Lajule/ccss -g
```

## Usage

Type the following command `ccss -h` to display this help message:

```

  Usage: ccss [options] <files...>

  Checks CSS properties order


  Options:

    -V, --version  output the version number
    -w, --watch    use watch mode
    -h, --help     output usage information
```

## Example

Consider the following CSS file (test.css):

```css

.head {
  color: lightgray;
  background-color: dimgray;
  height: 40vh;
}

```

Now let's use `ccss`:

```sh
ccss test.css
test.css:4: Property background-color must be at line 3
```

[1]: https://github.com/brandon-rhodes/Concentric-CSS "Concentric CSS"
