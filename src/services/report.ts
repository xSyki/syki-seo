import superagent from 'superagent'
import { load } from 'cheerio'
import { testTitles } from './title'
import { testDescription } from './description'
import { IOptions } from '../types/options'

export async function getPageReport(url: string, options?: IOptions) {
    console.log(options?.title)

    try {
        const { status, text } = await superagent.get(url)

        const $ = load(text)

        return {
            url,
            status,
            ...(options?.title ? { title: testTitles($) } : {}),
            ...(options?.description
                ? { description: testDescription($) }
                : {}),
        }
    } catch {
        return { passed: false, url }
    }
}
