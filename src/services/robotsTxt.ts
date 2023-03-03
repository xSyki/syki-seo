import superagent from 'superagent'
import { getDomainFromUrl } from './url'
import robotsParser from 'robots-parser'

interface IRobotsTxtModel {
    'User-agent': string[]
    Disallow: string[]
    Sitemap: string[]
    Host: string[]
}

export const robotsTxtModel: IRobotsTxtModel = {
    'User-agent': [],
    Disallow: [],
    Sitemap: [],
    Host: [],
}

export async function getRobotsTxtData(domain: string) {
    const response = await superagent.get(`${domain}/robots.txt`)

    const parsedRobotsTxtData = response.text
        .split('\n')
        .map((row) => row.split(': '))
        .reduce((acc: IRobotsTxtModel, parsedRow): IRobotsTxtModel => {
            const [key, value] = parsedRow
            if (!key || !value) {
                return acc
            }
            acc[key as keyof typeof robotsTxtModel].push(value)
            return acc
        }, robotsTxtModel)

    return parsedRobotsTxtData
}

export async function getRobots(domain?: string) {
    if (!domain) {
        return
    }

    const parsedDomain = getDomainFromUrl(domain)

    const { text } = await superagent.get(`${domain}/robots.txt`)

    return robotsParser(`${parsedDomain}/robots.txt`, text)
}
