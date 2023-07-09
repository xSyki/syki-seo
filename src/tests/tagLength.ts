import { CheerioAPI } from 'cheerio'

function tagLength($: CheerioAPI, tagName = '*') {
    const tags = $(tagName)

    console.log(tags)

    return tags.length
}

export default tagLength
