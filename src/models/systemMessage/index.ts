export interface ISystemMessage {
    readonly id: number
    slug: string
    name: string
    desc: string
    type: 1 | 2 | 3
}

export interface ISystemMessageInput {
    slug: string
    name: string
    desc: string
    type: 1 | 2 | 3
}
