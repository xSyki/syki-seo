import { CheerioAPI } from 'cheerio'

export type Template = Record<string, TestFunction>

export type TestFunction = ($: CheerioAPI) => TestResult

export type FunctionName = keyof Template

export type TestResult = string | boolean | number | null | undefined
