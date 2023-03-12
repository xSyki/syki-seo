import { Command } from 'commander'
import { IOptions } from './types/options'
import { readFileSync } from 'fs'
import { getPagesToTest } from './utils/getPagesToTest'
import { getPageReport } from './utils/getPageReport'
import { getTestsTemplate } from './utils/ getTestsTemplate'
import { saveReport } from './utils/saveReport'
import logger from './utils/logger'

const cliProgress = require('cli-progress')
const packageJson = require('../package.json')
const version: string = packageJson.version

const program = new Command()

program
    .name('syki-seo')
    .description(
        `Site report generator
Author: xSyki

Example: syki-seo https://google.com -l 10 -s`
    )
    .version(version)
    .argument('<url>', 'Specify url')
    .option('-c, --config <page>', 'Specify config from file(.json)')
    .option(
        '-t, --template <template>',
        'Template written by you with path or name defined earlier.',
        'basic'
    )
    .option(
        '-tv, --templateVariables <templateVariables>',
        'Some tests can take variables. Example data structure { "tagsLength": ["code"] }'
    )
    .option('-p, --page', 'Scan only specific page', false)
    .option('-l, --limit <limit>', 'Limit page to scan')
    .option('-s, --status', 'Include status code in report', false)
    .option('-b, --bot', 'Scan only pages included by bots', false)
    .option('-f, --filter', 'Filter pages that passed tests', false)
    .option('-o, --out <name>', 'Output file name', 'out')
    .option('-fo, --format <format>', 'Specify format(csv or json)', 'csv')

const progressBar = new cliProgress.SingleBar(
    {},
    cliProgress.Presets.shades_classic
)

program.parse(process.argv)

let options = program.opts<IOptions>()
const url = program.processedArgs[0]

options = { ...options, url }

if (options.config) {
    const rawConfig = JSON.parse(
        readFileSync(process.cwd() + options.config, 'utf-8')
    )

    if (rawConfig) {
        options = { ...options, ...rawConfig }
    }
}

async function main(options: IOptions) {
    const pagesToTest = await getPagesToTest(options)

    logger.info(`Pages to scan: ${pagesToTest.length}`)

    const testsTemplate = getTestsTemplate(options)

    logger.info(
        `Tests: ${Object.keys(testsTemplate)
            .map((key) => key)
            .join(', ')}`
    )

    let pagesScanned = 0

    progressBar.start(pagesToTest.length, 0)

    const pagesPromises = pagesToTest.map((page) =>
        getPageReport(page, options, testsTemplate).then((data) => {
            pagesScanned++
            progressBar.update(pagesScanned)
            return data
        })
    )

    const pagesReports = await Promise.all(pagesPromises)

    progressBar.stop()

    saveReport(options, pagesReports)

    logger.info(`Pages scanned: ${pagesToTest.length}`)
}

main(options)
