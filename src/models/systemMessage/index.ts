export interface ISystemMessage {
    readonly id: number
    slug: string
    name: string
    desc: string
    type: number
}

export interface ISystemMessageInput {
    slug: string
    name: string
    desc: string
    type: number
}
