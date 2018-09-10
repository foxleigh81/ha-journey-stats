'use strict'

import config from '@/config.json'

const logLevels = [
    'debug',
    'info',
    'warn',
    'error'
]

export default logLevels.reduce((logger, funcName, index) => {
    logger[funcName] = function(...args) {
        const consoleFunc = funcName === 'debug' ? 'log' : funcName
        const { LOGGING } = config

        if (LOGGING && console && typeof console[consoleFunc] === 'function') {
            const enabledLevelIndex = logLevels.indexOf(LOGGING.toString().toLocaleLowerCase())

            if (LOGGING === true || (enabledLevelIndex > -1 && index >= enabledLevelIndex)) {
                const [message, ...rest] = [...args]
                console[consoleFunc](`${funcName.toUpperCase()} - GOODSTART - ${message}`, ...rest)
            }
        }
    }

    return logger
}, {})