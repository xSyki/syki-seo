import { Command } from 'commander'
import { FormatEnum } from './types/format'

const packageJson = require('../package.json')
const version: string = packageJson.version

const program = new Command()

program
    .name('site-test')
    .description('CLI to site report generator')
    .version(version)
    .option('-p, --page <page>', 'Specify page')
    .option('-d, --domain <domain>', 'Specify domain')
    .option('-t, --title', 'Enable title test', false)
    .option('-d, --description', 'Enable description test', false)
    .option('-o, --out <name>', 'Output file name', 'out')
    .option('-f, --format <format>', 'Format of output', FormatEnum.CSV)

program.parse(process.argv)

const options = program.opts()
