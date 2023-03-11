# Welcome to syki-seo 👋

Quickly scan your website with ready-made tests or write individual tests.

[NPM](https://www.npmjs.com/package/syki-seo)
[GITHUB](https://github.com/xSyki/syki-seo)

## To run

```bash
npx syki-seo https://google.com -l 10 -s
```

## To install

```bash
npm i -g syki-seo

syki-seo https://google.com -l 10 -s
```

## Documentation

```bash
Usage: syki-seo [options] <url>

Site report generator
Author: xSyki

Example: syki-seo https://google.com -l 10 -s

Arguments:
  url                        Specify url

Options:
  -V, --version              output the version number
  -c, --config <page>        Specify config from file(.json)
  -t, --template <template>  Template written by you with path or name defined earlier. Options: basic, basicDetailed and h1 (default: "basic")
  -p, --page                 Scan only specific page (default: false)
  -l, --limit <limit>        Limit page to scan
  -s, --status               Include status code in report (default: false)
  -b, --bot                  Scan only pages included by bots (default: false)
  -f, --filter               Filter pages that passed tests (default: false)
  -o, --out <name>           Output file name (default: "out")
  -fo, --format <format>     Specify format(csv or json) (default: "csv")
  -h, --help                 display help for command
```

## Want to make your own tests?

1. Create js file with exported test functions(every function get $ which is CheerioAPI, really similar to jquery)

```js
module.exports = {
    titleContent: ($) => {
        return $('title').text()
    },
}
```

2. Run template by npx syki-seo https://www.google.com -t /template.js

## Contribute

All contributions are welcome. General instructions on _how_ to contribute are in [CONTRIBUTING](CONTRIBUTING.md).
