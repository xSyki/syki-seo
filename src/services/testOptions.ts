import { IOptions } from '../types/options'
import { exit } from 'process'

export function testOptions(options: IOptions) {
    const { domain, page } = options

    if (!domain && !page) {
        console.error('You have to provide domain or page')

        exit(1)
    }

    if (domain && page) {
        console.error('You can only provide domain or page')

        exit(1)
    }
}
