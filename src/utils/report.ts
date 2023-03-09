import superagent from 'superagent'
import { load } from 'cheerio'
import { IOptions } from '../types/options'
import { Template, TestResult } from '../types/test'
import { exit } from 'process'

export async function getPageReport(url: string, options: IOptions) {
    const { template } = options

    let templateTests: Template = {}

    try {
        templateTests = require(`../templates/${template}.ts`).default
    } catch {
        console.error('Can not find module')
        exit(1)
    }

    try {
        const { status, text } = await superagent.get(url)

        const $ = load(text)

        const statusReport = options?.status ? { status } : {}

        const testsResults = Object.keys(templateTests).reduce(
            (acc: Record<string, TestResult>, testKey) => {
                acc[testKey] = templateTests[testKey]($)

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
        console.log(`Tests failed: ${e}`)
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
