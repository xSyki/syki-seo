import { CheerioAPI } from 'cheerio'

function isTitleLengthCorrect($: CheerioAPI) {
    const title = $('title')

    if (title.length === 0 && title.length > 1) {
        return false
    }

    const content = title.text()

    if (content.length > 0 && content.length < 70) {
        return true
    }

    return false
}

export default isTitleLengthCorrect
