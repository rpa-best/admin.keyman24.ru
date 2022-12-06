import IRegionCreate from './IRegionCreate'
import IRegionType from './IRegionType'

export default interface IRegion {
    readonly id: number
    type: IRegionType
    parent: IRegionCreate
    name: string
    status: boolean
}
