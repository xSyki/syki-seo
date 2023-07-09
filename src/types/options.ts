export interface IOptions {
    url: string
    config?: string
    template: string
    page?: boolean
    limit?: number
    status?: boolean
    filter?: boolean
    out?: string
    bot?: boolean
    format: string
    templateVariables?: Record<string, unknown[]>
    result?: boolean
}
