import { FormatEnum } from './format'

export interface IOptions {
    domain?: string
    page?: string
    limit?: number
    title?: boolean
    description?: boolean
    out?: string
    format?: FormatEnum
    bot?: boolean
}
