const isEmptyString = (value: string | null | undefined): boolean => {
    return value === '' || value === null || value === undefined
}

export default isEmptyString