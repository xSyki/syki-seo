import { TestResult } from '../types/test'

export function didPass(status: number, tests?: Record<string, TestResult>) {
    const haveAnyTestFail = tests
        ? Object.keys(tests).some((key) => !tests[key])
        : false

    if (status !== 200 || haveAnyTestFail) {
        return false
    }

    return true
}
