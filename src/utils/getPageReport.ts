import superagent from 'superagent'
import { load } from 'cheerio'
import { IOptions } from '../types/options'
import { Template, TestResult } from '../types/test'
import { IReport } from '../types/report'
import logger from './logger'
import { didPass } from './didPass'

export async function getPageReport(
    url: string,
    options: IOptions,
    testsTemplate: Template
): Promise<IReport> {
    const { templateVariables } = options

    try {
        const { status, text } = await superagent.get(url)

        const $ = load(text)

        const statusReport = options?.status ? { status } : {}

        const testsResults = Object.keys(testsTemplate).reduce(
            (acc: Record<string, TestResult>, testKey) => {
                acc[testKey] = testsTemplate[testKey](
                    $,
                    ...(templateVariables?.[testKey] || [])
                )

                return acc
            },
            {}
        )

        return {
            passed: didPass(status, testsResults),
            url,
            ...statusReport,
            ...testsResults,
        }
    } catch (e) {
        logger.error(`Tests failed: ${e}`)
        return { passed: false, url }
    }
}
