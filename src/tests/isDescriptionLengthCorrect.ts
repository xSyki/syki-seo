import { CheerioAPI } from 'cheerio'

function isDescriptionLengthCorrect($: CheerioAPI) {
    const description = $('meta[name="description"]')

    if (description.length === 0 || description.length > 1) {
        return false
    }

    const content = description[0].attribs.content

    if (content.length > 70 && content.length < 160) {
        return true
    }

    return false
}

export default isDescriptionLengthCorrect
