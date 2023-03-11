import isTitle from '../isTitle'
import { load } from 'cheerio'

describe('isTitle', () => {
    test('Invalid title length', () => {
        const withoutTitles = load('<html></html>')
        expect(isTitle(withoutTitles)).toBe(false)

        const withoutTwoTitles = load(
            '<html><title>Test</title><title>Test2</title></html>'
        )
        expect(isTitle(withoutTwoTitles)).toBe(false)
    })

    test('Valid title length', () => {
        const withTitle = load('<html><title>Test</title></html>')

        expect(isTitle(withTitle)).toBe(true)
    })
})
