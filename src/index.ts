import { Command } from 'commander'
import { testOptions } from './services/testOptions'
import { IOptions } from './types/options'
import fs from 'fs'
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

Example: syki-seo -d https://google.com -l 10`
    )
    .version(version)
    .option('-p, --page <page>', 'Specify page')
    .option('-d, --domain <domain>', 'Specify domain')
    .option('-l, --limit <limit>', 'Limit')
    .option('-t, --title', 'Enable title test', true)
    .option('-d, --description', 'Enable description test', true)
    .option('-b, --bot', 'Scan only pages included by bots', false)
    .option('-o, --out <name>', 'Output file name', 'out')

program.parse(process.argv)

const options = program.opts<IOptions>()

async function main() {
    const { domain, page, out, bot } = options

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

    const csv = parseToCSV(pagesReports)

    console.log(`Page scanned: ${pagesToTest.length}`)

    fs.writeFileSync(`${out || 'out'}.csv`, csv)
}

main()
