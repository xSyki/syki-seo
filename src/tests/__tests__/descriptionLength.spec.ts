import { load } from 'cheerio'
import descriptionLength from '../descriptionLength'

describe('descriptionLength', () => {
    test('should return false when no description specified', () => {
        const $ = load('<html></html>')

        expect(descriptionLength($)).toBe(false)
    })

    test('should return false when more than one description specified', () => {
        const $ = load(
            '<meta name="description" content="Lorem" /><meta name="description" content="Lorem2" />'
        )

        expect(descriptionLength($)).toBe(false)
    })

    test('should return number when description specified', () => {
        const $ = load('<meta name="description" content="Lorem" />')

        expect(descriptionLength($)).toBe(5)
    })
})
