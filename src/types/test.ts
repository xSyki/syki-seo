import { CheerioAPI } from 'cheerio'

export type Template = Record<string, TestFunction>

export type TestFunction = ($: CheerioAPI, ...args: unknown[]) => TestResult

export type FunctionName = keyof Template

export type TestResult = string | boolean | number | null | undefined
