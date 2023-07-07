import { IWorker } from "../worker"

export interface IUser {
    fullname: string
    readonly avatar: string
    username: string
    date_joined: string
    is_official: boolean
}

export interface IUserInput {
    username: string
    password1: string
    password2: string
}

// need to fix
export interface IUserSingle {
    fullname: string
    readonly username: string
    name: string | null
    lastname: string | null
    readonly date_joined: string
    phone: string | null
    email: string | null
    surname: string | null
    birthday: string | null
    bio: string | null
    workers: IWorker[]
}

export interface IUserSingleInput {
    name: string | null
    lastname: string | null
    phone: string | null
    email: string | null
    surname: string | null
    birthday: string | null
    bio: string | null
}
//
