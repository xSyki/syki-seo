export function parseToCSV(rows: Record<string, unknown>[]) {
    const header = Object.keys(rows[0]).map((key) => key)

    return [
        header,
        rows
            .map((row) => {
                return header.map((key) => row[key]).join(',')
            })
            .join('\n'),
    ].join('\n')
}
