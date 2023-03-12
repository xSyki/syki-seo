import { exit } from 'process'
import { IOptions } from '../types/options'
import { getDomainFromUrl } from './getDomainFromUrl'
import { getRobots } from './getRobots'
import { getSitemap } from './getSitemap'
import logger from './logger'

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
