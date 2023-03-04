import { Command } from 'commander'
import { testOptions } from './services/testOptions'
import { IOptions } from './types/options'
import { readFileSync, writeFileSync } from 'fs'
import { getPages } from './services/pages'
import { parseToCSV } from './services/csv'
import { getPageReport } from './services/report'

import { getRobots } from './services/robotsTxt'

const packageJson = require('../package.json')
const version: string = packageJson.version

const program = new Command()

program
    .name('syki-seo')
    .description(
        `Site report generator
Author: xSyki

Example: syki-seo -d https://google.com -l 10 -tt -td -s`
    )
    .version(version)
    .option('-c, --config <page>', 'Specify config from file(.json)')
    .option('-p, --page <page>', 'Specify page')
    .option('-d, --domain <domain>', 'Specify domain')
    .option('-l, --limit <limit>', 'Limit page to scan')
    .option('-s, --status', 'Include status code in report', false)
    .option('-tt, --title', 'Enable title test', false)
    .option('-td, --description', 'Enable description test', false)
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
    const { domain, page, out, bot, filter } = options

    testOptions(options)

    let pagesToTest: string[] = []

    if (domain) {
        const robots = await getRobots(domain)

        pagesToTest = ((await getPages(options)) as string[]).filter(
            (page) => !bot || robots?.isAllowed(page)
        )
    }

    if (page) {
        pagesToTest = [page]
    }

    if (!pagesToTest?.length) {
        console.error('No pages found')
    }

    const pagesPromises = pagesToTest.map((page) =>
        getPageReport(page, options)
    )

    const pagesReports = await Promise.all(pagesPromises)

    const csv = parseToCSV(
        pagesReports.filter((report) => !filter || !report.passed)
    )

    console.log(`Page scanned: ${pagesToTest.length}`)

    writeFileSync(`${out || 'out'}.csv`, csv)
}

main(options)
