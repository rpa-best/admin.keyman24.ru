const addLeadingZero = (num: number, length = 2): string => {
    return num.toString().padStart(length, '0')
}

const convertToISODate = (date: Date | null): string | null => {
    if (!date) {
        return null;
    }

    const year = date.getUTCFullYear()
    const month = addLeadingZero(date.getUTCMonth() + 1)
    const day = addLeadingZero(date.getUTCDate())
    const hours = addLeadingZero(date.getUTCHours())
    const minutes = addLeadingZero(date.getUTCMinutes())
    const seconds = addLeadingZero(date.getUTCSeconds())
    const milliseconds = addLeadingZero(date.getUTCMilliseconds(), 3)
    const timezoneOffset = date.getTimezoneOffset()
    const offsetHours = Math.abs(Math.floor(timezoneOffset / 60))
        .toString()
        .padStart(2, '0')
    const offsetMinutes = Math.abs(timezoneOffset % 60)
        .toString()
        .padStart(2, '0')
    const offsetSign = timezoneOffset < 0 ? '+' : '-'
    // const timezoneString = offsetSign + offsetHours + ':' + offsetMinutes
    const timezoneString = `${offsetSign + offsetHours}:${offsetMinutes}`

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}${timezoneString}`
}

export default convertToISODate
