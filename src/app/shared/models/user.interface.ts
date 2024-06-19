export type UserGroup  = "normal" | "admin"

export interface LoggedUser {
    perfil: UserGroup,
    token: string,
    user: string
}