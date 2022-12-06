export default interface IRegionCreate {
    readonly id: number
    name: string
    status: boolean
    parent: number | null
    type: number | null
}
