## To run

```bash
npx syki-seo -d https://google.com -l 10 -tt -td -s
```

## Documentation

```bash
Usage: syki-seo [options]

Site report generator
Author: xSyki

Example: syki-seo -d https://google.com -l 10 -tt -td -s

Options:
  -V, --version          output the version number
  -c, --config <page>     Specify config from file(.json)
  -p, --page <page>      Specify page
  -d, --domain <domain>  Specify domain
  -l, --limit <limit>    Limit page to scan
  -s, --status           Include status code in report (default: false)
  -tt, --title           Enable title test (default: false)
  -td, --description     Enable description test (default: false)
  -b, --bot              Scan only pages included by bots (default: false)
  -f, --filter            Filter pages that passed tests (default: false)
  -o, --out <name>       Output file name (default: "out")
  -h, --help             display help for command
```

## Development

```bash
npm i
npm start -- -d https://google.com -l 10 -tt -td -s
```
