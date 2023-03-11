import { CheerioAPI } from 'cheerio'

function descriptionLength($: CheerioAPI) {
    const description = $('meta[name="description"]')

    if (description.length === 0 || description.length > 1) {
        return false
    }

    return description[0].attribs.content.length
}

export default descriptionLength
