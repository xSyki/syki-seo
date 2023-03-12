import { IOptions } from '../types/options'
import { getRobots } from './robotsTxt'
import { getSitemap } from './sitemap'
import { getDomainFromUrl } from './url'

import { exit } from 'process'
import logger from './logger'

export async function getPagesToTest(options: IOptions) {
    const { url, page, bot } = options

    let pagesToTest: string[] = []

    if (url) {
        const robots = await getRobots(url)

        pagesToTest = ((await getPages(options)) as string[]).filter(
            (page) => !bot || robots?.isAllowed(page)
        )
    }

    if (page) {
        pagesToTest = [url]
        logger.info(`Page to scan: ${url}`)
    }

    if (!pagesToTest?.length) {
        logger.error('No pages found')

        exit(1)
    }

    return pagesToTest
}

export async function getPages(options: IOptions) {
    const { url, page, limit } = options

    if (page) {
        const parsedUrl = new URL(url)
        return [parsedUrl]
    }

    const parsedDomain = getDomainFromUrl(url)

    logger.info(`Domain to scan: ${parsedDomain}`)

    const robotsTxt = await getRobots(parsedDomain)

    const sitemapUrl = robotsTxt?.getSitemaps()[0]

    if (!sitemapUrl) {
        logger.error('Sitemap not found')

        exit(1)
    }

    const sitemap = await getSitemap(sitemapUrl)

    return sitemap.sites.splice(0, limit || sitemap.sites.length - 1)
}
