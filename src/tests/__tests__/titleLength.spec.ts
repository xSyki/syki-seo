import { load } from 'cheerio'
import titleLength from '../titleLength'

describe('titleLength', () => {
    test('should return false when no title specified', () => {
        const $ = load('<html></html>')

        expect(titleLength($)).toBe(false)
    })

    test('should return false when more than one title specified', () => {
        const $ = load('<title>Lorem</title><title>Lorem2</title>')

        expect(titleLength($)).toBe(false)
    })

    test('should return number when title specified', () => {
        const $ = load('<title>Lorem</title>')

        expect(titleLength($)).toBe(5)
    })
})
