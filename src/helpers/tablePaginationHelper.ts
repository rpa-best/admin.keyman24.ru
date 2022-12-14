const pagesLength = (value: number) => {
    return Math.ceil(value / 10)
}

const currentOffset = (value: number) => {
    return ((value - 1) * 10)
}

export {
    pagesLength,
    currentOffset,
}
