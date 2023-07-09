import { CheerioAPI } from 'cheerio'

function isH1($: CheerioAPI) {
    const lengthOfH1Tags = $('h1').length

    if (lengthOfH1Tags > 1 || lengthOfH1Tags === 0) {
        return false
    }

    return true
}

export default isH1
