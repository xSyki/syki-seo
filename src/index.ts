import { Command } from 'commander'
import { testOptions } from './utils/testOptions'
import { IOptions } from './types/options'
import { readFileSync, writeFileSync } from 'fs'
import { getPages, getPagesToTest } from './utils/pages'
import { parseToCSV } from './utils/csv'
import { getPageReport } from './utils/report'
import { exit } from 'process'

import { getRobots } from './utils/robotsTxt'
import { getTestsTemplate } from './utils/template'

const packageJson = require('../package.json')
const version: string = packageJson.version

const program = new Command()

program
    .name('syki-seo')
    .description(
        `Site report generator
Author: xSyki

Example: syki-seo -d https://google.com -l 10 -t basic -s`
    )
    .version(version)
    .option('-c, --config <page>', 'Specify config from file(.json)')
    .option(
        '-t, --template <template>',
        'Template written by you with path or name defined earlier.',
        'basic'
    )
    .option('-p, --page <page>', 'Specify page')
    .option('-d, --domain <domain>', 'Specify domain')
    .option('-l, --limit <limit>', 'Limit page to scan')
    .option('-s, --status', 'Include status code in report', false)
    .option('-b, --bot', 'Scan only pages included by bots', false)
    .option('-f, --filter', 'Filter pages that passed tests', false)
    .option('-o, --out <name>', 'Output file name', 'out')

program.parse(process.argv)

let options = program.opts<IOptions>()

if (options.config) {
    const rawConfig = JSON.parse(readFileSync(options.config, 'utf-8'))

    if (rawConfig) {
        options = { ...options, ...rawConfig }
    }
}

async function main(options: IOptions) {
    const { out, filter } = options

    testOptions(options)

    const pagesToTest = await getPagesToTest(options)

    const testsTemplate = getTestsTemplate(options)

    const pagesPromises = pagesToTest.map((page) =>
        getPageReport(page, options, testsTemplate)
    )

    const pagesReports = await Promise.all(pagesPromises)

    const csv = parseToCSV(
        pagesReports.filter((report) => !filter || !report.passed)
    )

    console.log(`Page scanned: ${pagesToTest.length}`)

    writeFileSync(`${out || 'out'}.csv`, csv)
}

main(options)
