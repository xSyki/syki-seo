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

export async function getRobots(domain?: string) {
    if (!domain) {
        return
    }

    const parsedDomain = getDomainFromUrl(domain)

    const { text } = await superagent.get(`${domain}/robots.txt`)

    return robotsParser(`${parsedDomain}/robots.txt`, text)
}
