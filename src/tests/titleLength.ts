import { CheerioAPI } from 'cheerio'

function titleLength($: CheerioAPI) {
    const titleTags = $('title')
    const title = titleTags.text()

    if (titleTags.length === 0 || titleTags.length > 1) {
        return false
    }

    return title.length
}

export default titleLength
