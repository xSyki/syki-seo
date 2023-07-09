import { CheerioAPI } from 'cheerio'

function h1Length($: CheerioAPI) {
    const h1Tags = $('h1')
    const h1 = h1Tags.text()

    if (h1Tags.length === 0 || h1Tags.length > 1) {
        return false
    }

    return h1.length
}

export default h1Length
