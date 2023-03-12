import { TestResult } from '../types/test'

export function didPass(status: number, tests?: Record<string, TestResult>) {
    const haveAllTestsPassed = tests
        ? Object.keys(tests).some((key) => !tests[key])
        : true

    if (status !== 200 || haveAllTestsPassed) {
        return false
    }

    return true
}
