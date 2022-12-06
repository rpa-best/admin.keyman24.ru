export default interface IAccountDetail {
    username: string,
    name: string | null,
    surname: string | null,
    lastname: string | null,
    email: string | null,
    phone: string | null,
    birthday: string | null,
    gender: string | null,
    bio: string | null,
    avatar: string,
    qrcode: string
    is_activeuser: boolean,
}
