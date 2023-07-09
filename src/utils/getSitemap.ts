import Sitemapper from 'sitemapper'

export async function getSitemap(sitemapUrl: string) {
    const sitemap = new Sitemapper({
        url: sitemapUrl,
        timeout: 15000,
    })

    return await sitemap.fetch()
}
