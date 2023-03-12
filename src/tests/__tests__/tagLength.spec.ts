import { load } from 'cheerio'
import tagLength from '../tagLength'

describe('tagLength', () => {
    test('should count every tag by default', () => {
        const $ = load(
            '<html><head></head><body><h1>Title</h1><p>Paragraph</p></body></html>'
        )

        expect(tagLength($)).toBe(5)
    })

    test('should count provided tag', () => {
        const $ = load(
            '<html><head></head><body><h1>Title</h1><p>Paragraph</p></body></html>'
        )

        expect(tagLength($, 'h1')).toBe(1)
    })
})
