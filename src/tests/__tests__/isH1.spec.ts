import isH1 from '../isH1'
import { load } from 'cheerio'

describe('isH1', () => {
    test('should return false when h1 is not present', () => {
        const $ = load('<html></html>')
        expect(isH1($)).toBe(false)
    })

    test('should return false when there is more than 1 h1 tag', () => {
        const $ = load('<html><h1>Test</h1><h1>Test2</h1></html>')
        expect(isH1($)).toBe(false)
    })

    test('should return true when one h1 is present', () => {
        const $ = load('<html><h1>Test</h1></html>')

        expect(isH1($)).toBe(true)
    })
})
