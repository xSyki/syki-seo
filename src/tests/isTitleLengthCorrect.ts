import { CheerioAPI } from 'cheerio'

function isTitleLengthCorrect($: CheerioAPI) {
    const title = $('title')

    if (!title.length) {
        return false
    }

    const content = title[0].attribs.content

    if (content.length > 70 && content.length < 160) {
        return true
    }

    return false
}

export default isTitleLengthCorrect
