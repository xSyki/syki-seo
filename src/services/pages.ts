import { IOptions } from '../types/options'
import { getRobotsTxtData } from './robotsTxt'
import { getSitemap } from './sitemap'
import { getDomainFromUrl } from './url'

export async function getPages(options: IOptions) {
    const { domain, page, limit } = options

    if (page) {
        const url = new URL(page)
        return [url]
    }

    if (domain) {
        const parsedDomain = getDomainFromUrl(domain)

        const robotsTxt = await getRobotsTxtData(parsedDomain)

        const sitemapUrl = robotsTxt.Sitemap[0]

        const sitemap = await getSitemap(sitemapUrl)

        return sitemap.sites.splice(0, limit || sitemap.sites.length - 1)
    }

    return
}
