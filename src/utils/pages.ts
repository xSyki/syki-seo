import { IOptions } from '../types/options'
import { getRobots } from './robotsTxt'
import { getSitemap } from './sitemap'
import { getDomainFromUrl } from './url'

import { exit } from 'process'

export async function getPagesToTest(options: IOptions) {
    const { domain, page, bot } = options

    let pagesToTest: string[] = []

    if (domain) {
        const robots = await getRobots(domain)

        pagesToTest = ((await getPages(options)) as string[]).filter(
            (page) => !bot || robots?.isAllowed(page)
        )
    }

    if (page) {
        pagesToTest = [page]
    }

    if (!pagesToTest?.length) {
        console.error('No pages found')

        exit(1)
    }

    return pagesToTest
}

export async function getPages(options: IOptions) {
    const { domain, page, limit } = options

    if (page) {
        const url = new URL(page)
        return [url]
    }

    if (domain) {
        const parsedDomain = getDomainFromUrl(domain)

        const robotsTxt = await getRobots(parsedDomain)

        const sitemapUrl = robotsTxt?.getSitemaps()[0]

        if (!sitemapUrl) {
            console.error('Sitemap not found')

            exit(1)
        }

        const sitemap = await getSitemap(sitemapUrl)

        return sitemap.sites.splice(0, limit || sitemap.sites.length - 1)
    }

    return
}
