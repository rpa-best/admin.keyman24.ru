const nullToEmptyString = (value: string | null): string => {
    return value === null ? '' : value
}

export default nullToEmptyString
