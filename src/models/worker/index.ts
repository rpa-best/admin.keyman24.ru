export interface IWorker {
    readonly id: number
    lc_id: number | null | undefined
    name: string | null
    user_lc_id: number | null | undefined
    user: string | null
    org: number | null | undefined
}

export interface IWorkerInput {
    lc_id: number | null | undefined
    name: string | null
    user_lc_id: number | null | undefined
    user: string | null
    org: number | null | undefined
}