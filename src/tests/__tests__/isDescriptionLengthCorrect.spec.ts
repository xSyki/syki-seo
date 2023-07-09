import isDescriptionLengthCorrect from '../isDescriptionLengthCorrect'
import { load } from 'cheerio'

describe('isDescriptionLengthCorrect', () => {
    test.only('should return true for description content length between 70 and 160', () => {
        const $ = load(
            '<meta name="description" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean interdum leo quis mauris feugiat, non volutpat leo congue." />'
        )

        expect(isDescriptionLengthCorrect($)).toBe(true)
    })

    test('should return false for description content length less than 70', () => {
        const $ = load('<meta name="description" content="Lorem" />')

        expect(isDescriptionLengthCorrect($)).toBe(false)
    })

    test('should return false for description content length more than 160', () => {
        const $ = load(
            '<meta name="description" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean interdum leo quis mauris feugiat, non volutpat leo congue. Suspendisse augue lacus, dapibus at turpis sit amet, convallis sollicitudin sem. Integer at auctor sem, eu condimentum augue. Etiam fermentum odio lectus." />'
        )

        expect(isDescriptionLengthCorrect($)).toBe(false)
    })

    test('should return false when no description element is present', () => {
        const $ = load('<html></html>')

        expect(isDescriptionLengthCorrect($)).toBe(false)
    })
})
