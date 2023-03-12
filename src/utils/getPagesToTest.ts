import { IOptions } from '../types/options'
import { getRobots } from './getRobots'

import { exit } from 'process'
import logger from './logger'
import { getPages } from './getpages'

export async function getPagesToTest(options: IOptions) {
    const { url, page, bot } = options

    let pagesToTest: string[] = []

    if (url) {
        const robots = await getRobots(url)

        pagesToTest = ((await getPages(options)) as string[]).filter(
            (page) => !bot || robots?.isAllowed(page)
        )
    }

    if (page) {
        pagesToTest = [url]
        logger.info(`Page to scan: ${url}`)
    }

    if (!pagesToTest?.length) {
        logger.error('No pages found')

        exit(1)
    }

    return pagesToTest
}
