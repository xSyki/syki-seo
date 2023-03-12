import { parseToCSV } from '../parseToCSV'

describe('parseToCSV', () => {
    test('should return a CSV string', () => {
        const rows = [
            { name: 'Alice', age: 25, city: 'New York' },
            { name: 'Bob', age: 30, city: 'San Francisco' },
            { name: 'Charlie', age: 35, city: 'Los Angeles' },
        ]
        const expectedOutput =
            'name,age,city\nAlice,25,New York\nBob,30,San Francisco\nCharlie,35,Los Angeles'

        const out = parseToCSV(rows)

        console.log(out)
        console.log(expectedOutput)

        expect(out).toEqual(expectedOutput)
    })
})
