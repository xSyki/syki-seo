import { IOptions } from '../types/options'
import { exit } from 'process'
import { Template } from '../types/test'
import logger from './logger'

export const getTestsTemplate = (options: IOptions) => {
    const { template } = options

    let testsTemplate: Template

    try {
        if (template.includes('.')) {
            testsTemplate = require(process.cwd() + template)
        } else {
            testsTemplate = require(`../templates/${template}.${
                process.env.NODE_ENV === 'development' ? 'ts' : 'js'
            }`).default
        }
    } catch (e) {
        logger.error('Can not find module', e)
        exit(1)
    }

    if (!Object.keys(testsTemplate).length) {
        logger.error('Tests not specified')
        exit(1)
    }

    return testsTemplate
}
