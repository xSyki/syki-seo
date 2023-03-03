import { CheerioAPI } from 'cheerio'

export function testTitles($: CheerioAPI) {
    const lengthOfH1Tags = $('h1').length

    if (lengthOfH1Tags > 1 || lengthOfH1Tags === 0) {
        return false
    }

    return true
}
