export interface IGuestWorker {
    ID: number
    NAME: string
    USER: number
    MANAGER: number[]
    WORKER: number[]
    WORK_MAN: number[]
    EMAIL: string
    PHONE: string
    INN: string
    OGRN: string
    ADDRESS: string
    DIRECTOR: string
    CONTACT_LIC: string
    KPP: string
    BIK: string
    KS: string
    RS: string
    CLIENT_SCUD: 'Y' | 'N'
    STATUS: 'На рассмотрении' | 'Согласовано' | 'Изменения не приняты'
}

export interface IGuestWorkerInput {
    id: number[]
}
