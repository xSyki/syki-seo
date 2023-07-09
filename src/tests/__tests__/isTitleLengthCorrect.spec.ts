import isTitleLengthCorrect from '../isTitleLengthCorrect'
import { load } from 'cheerio'

describe('isTitleLengthCorrect', () => {
    test('should return true for title content length between 0 and 70', () => {
        const $ = load('<title>Lorem ipsum dolor site.</title>')

        expect(isTitleLengthCorrect($)).toBe(true)
    })

    test('should return false for title content length equals 0', () => {
        const $ = load('<title></title>')

        expect(isTitleLengthCorrect($)).toBe(false)
    })

    test('should return false for title content length more than 70', () => {
        const $ = load(
            '<title>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean interdum leo quis mauris feugiat, non volutpat leo congue. Suspendisse augue lacus, dapibus at turpis sit amet, convallis sollicitudin sem. Integer at auctor sem, eu condimentum augue. Etiam fermentum odio lectus.</title>'
        )

        expect(isTitleLengthCorrect($)).toBe(false)
    })

    test('should return false when no title element is present', () => {
        const $ = load('<html></html>')

        expect(isTitleLengthCorrect($)).toBe(false)
    })
})
