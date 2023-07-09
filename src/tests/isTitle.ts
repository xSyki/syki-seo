import { CheerioAPI } from 'cheerio'

function isTitle($: CheerioAPI) {
    const lengthOfH1Tags = $('title').length

    if (lengthOfH1Tags > 1 || lengthOfH1Tags === 0) {
        return false
    }

    return true
}

export default isTitle
