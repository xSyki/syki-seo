import { Format } from '../types/format'
import { IOptions } from '../types/options'
import { IReport } from '../types/report'
import { parseToCSV } from './parseToCSV'
import { exit } from 'process'
import { writeFileSync } from 'fs'
import logger from './logger'

export function saveReport(options: IOptions, pagesReports: IReport[]) {
    const { format, out, filter } = options

    let data = ''

    switch (format) {
        case Format.CSV:
            data = parseToCSV(
                pagesReports.filter((report) => !filter || !report.passed)
            )
            break
        case Format.JSON:
            data = JSON.stringify(pagesReports, null, 4)
            break
        default:
            logger.error('Format not found')
            exit(1)
    }

    writeFileSync(`${out || 'out'}.${format}`, data)
}
