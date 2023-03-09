import superagent from 'superagent'
import { load } from 'cheerio'
import { IOptions } from '../types/options'
import { Template, TestResult } from '../types/test'

export async function getPageReport(
    url: string,
    options: IOptions,
    testsTemplate: Template
) {
    try {
        const { status, text } = await superagent.get(url)

        const $ = load(text)

        const statusReport = options?.status ? { status } : {}

        const testsResults = Object.keys(testsTemplate).reduce(
            (acc: Record<string, TestResult>, testKey) => {
                acc[testKey] = testsTemplate[testKey]($)

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
        console.error(`Tests failed: ${e}`)
        return { passed: false, url }
    }
}

export function didPass(status: number, tests?: Record<string, TestResult>) {
    const haveAllTestsPassed = tests
        ? Object.keys(tests).some((key) => !tests[key])
        : true

    if (status !== 200 || haveAllTestsPassed) {
        return false
    }

    return true
}
