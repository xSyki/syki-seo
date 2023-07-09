import { TestResult } from './test'

export type IReport = {
    status?: number
    passed?: boolean
    url: string
} & Record<string, TestResult>
