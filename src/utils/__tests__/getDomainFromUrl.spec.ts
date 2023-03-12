import { getDomainFromUrl } from '../getDomainFromUrl'

jest.mock('../logger')

describe('getDomainFromUrl', () => {
    it('should return the domain from a valid URL', () => {
        expect(getDomainFromUrl('https://www.example.com/path')).toBe(
            'https://www.example.com'
        )
    })
})
