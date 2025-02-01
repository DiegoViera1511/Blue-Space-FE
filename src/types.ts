export interface ProjectType {
    id: string;
    username: string;
    name: string;
}

export const defaultProyectType: ProjectType = {id: "", username: "", name: ""}

export interface StateType {
    id: string;
    project_id: string;
    name: string
}

export const defaultStateType: StateType = {id: "", project_id: "", name: ""}

export interface CardType {
    id: string,
    state_id: string,
    title: string,
    text: string
}

export const defaultCardType: CardType = {id: "", state_id: "", title: "", text: ""}

export interface UserType {
    username: string;
    password: string;
}

export const defaultUserType: UserType = {username: "", password: ""}
