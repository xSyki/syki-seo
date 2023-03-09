## To run

```bash
npx syki-seo -d https://google.com -l 10 -t basic -s
```

## Documentation

```bash
Usage: syki-seo [options]

Site report generator
Author: xSyki

Example: syki-seo -d https://google.com -l 10 -t basic -s

Options:
  -V, --version              output the version number
  -c, --config <page>        Specify config from file(.json)
  -t, --template <template>  Template written by you with path or name defined earlier. (default: "basic")
  -p, --page <page>          Specify page
  -d, --domain <domain>      Specify domain
  -l, --limit <limit>        Limit page to scan
  -s, --status               Include status code in report (default: false)
  -b, --bot                  Scan only pages included by bots (default: false)
  -f, --filter               Filter pages that passed tests (default: false)
  -o, --out <name>           Output file name (default: "out")
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

2. Run template by npx syki-seo -d https://www.google.com -t /template.js

## Development

```bash
npm i
npm start -- -d https://google.com -l 10 -tt -td -s
```
