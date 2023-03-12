import { didPass } from '../didPass'

describe('didPass', () => {
    it('should return true if status is 200 and there are no tests', () => {
        expect(didPass(200)).toBe(true)
    })

    it('should return true if status is 200 and all tests passed', () => {
        const tests = {
            test1: true,
            test2: true,
            test3: true,
        }
        const result = didPass(200, tests)
        expect(result).toBe(true)
    })

    it('should return false if status is not 200', () => {
        const result = didPass(404)
        expect(result).toBe(false)
    })

    it('should return false if status is 200 but some tests failed', () => {
        const tests = {
            test1: true,
            test2: false,
            test3: true,
        }
        const result = didPass(200, tests)
        expect(result).toBe(false)
    })

    it('should return false if status is 200 and all tests failed', () => {
        const tests = {
            test1: false,
            test2: false,
            test3: false,
        }
        const result = didPass(200, tests)
        expect(result).toBe(false)
    })
})
