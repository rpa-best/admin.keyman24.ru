const pagesLength = (value: number) => {
    return Math.ceil(value / 10)
    // return (value / 10) >= 10 ? (value / 10) : Math.ceil(value / 10)
}

const currentOffset = (value: number) => {
    return (value - 1) * 10
}

const currentPageByOffset = (offset: number) => {
    // return offset <= 100 ? (offset / 10) + 1 : (offset / 10) - 1
    return (offset / 10) + 1
}

export {
    pagesLength,
    currentOffset,
    currentPageByOffset,
}
