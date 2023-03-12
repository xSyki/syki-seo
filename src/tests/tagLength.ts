import { CheerioAPI } from 'cheerio'

function tagLength($: CheerioAPI, tagName = '*') {
    const tags = $(tagName)

    return tags.length
}

export default tagLength
