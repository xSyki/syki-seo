import { CheerioAPI } from 'cheerio'

function isDescriptionLengthCorrect($: CheerioAPI) {
    const titleTags = $('title')
    const title = titleTags.text()

    if (!title || titleTags.length > 1) {
        return false
    }

    return title.length
}

export default isDescriptionLengthCorrect
