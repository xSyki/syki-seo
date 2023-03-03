## To run

```bash
npx syki-seo -d https://google.com -l 10
```

## Documentation

```bash
Usage: syki-seo [options]

Site report generator
Author: xSyki

Example: syki-seo -d https://google.com -l 10

Options:
  -V, --version          output the version number
  -p, --page <page>      Specify page
  -d, --domain <domain>  Specify domain
  -l, --limit <limit>    Limit
  -t, --title            Enable title test (default: true)
  -d, --description      Enable description test (default: true)
  -b, --bot              Scan only pages included by bots (default: false)
  -o, --out <name>       Output file name (default: "out")
  -h, --help             display help for command
```

## Development

```bash
npm i
npm start -- -d https://google.com -l 10
```
