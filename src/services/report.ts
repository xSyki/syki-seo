import superagent from 'superagent'
import { load } from 'cheerio'
import { testTitles } from './title'
import { testDescription } from './description'
import { IOptions } from '../types/options'

export async function getPageReport(url: string, options?: IOptions) {
    try {
        const { status, text } = await superagent.get(url)

        const $ = load(text)

        const statusReport = options?.status ? { status } : {}

        const title = options?.title ? { title: testTitles($) } : {}

        const description = options?.description
            ? { description: testDescription($) }
            : {}

        return {
            passed: didPass(status, { ...title, ...description }),
            url,
            ...statusReport,
            ...title,
            ...description,
        }
    } catch {
        return { passed: false, url }
    }
}

export function didPass(
    status: number,
    tests: Record<string, boolean | undefined>
) {
    const haveAllTestsPassed = Object.keys(tests).some((key) => !tests[key])

    if (status !== 200 || haveAllTestsPassed) {
        return false
    }

    return true
}
