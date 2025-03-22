export interface ProjectType {
    id: string;
    username: string;
    name: string;
    color:string;
}

export const defaultProyectType: ProjectType = {id: "", username: "", name: "",color:"blue"}

export interface StateType {
    id: string;
    position: number;
    project_id: string;
    name: string
}

export const defaultStateType: StateType = {id: "", position:0, project_id: "", name: ""}

export interface CardType {
    id: string,
    position: number
    state_id: string,
    title: string,
    text: string
}

export const defaultCardType: CardType = {id: "",position: 0, state_id: "", title: "", text: ""}

export interface UserType {
    username: string;
    password: string;
}

export const defaultUserType: UserType = {username: "", password: ""}

export interface UsersToProjectsType {
    username: string;
    project_id: string;
}

export interface UsersToProjectsDto {
    username: string;
    project: ProjectType
}

export interface BaseModalProps {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export enum NotificationEnum{
    INVITATION = "Invitation",
    INFO = "Information",
}

export enum NotificationStateEnum{
    UNREAD = "Unread",
    READ = "Read",
    ACCEPTED = "Accepted"
}

export enum Colors {
    BLUE = "blue",
    CYAN = "cyan",
    GREEN = "green",
    EMERALD = "emerald",
    YELLOW = "yellow",
    RED = "red",
    ORANGE = "orange",
    PINK = "pink",
    PURPLE = "purple",  
    GRAY = "gray"
}

export interface NotificationType {
    id: string,
    sender_id?: string,
    receiver_id: string,
    date: Date,
    content: string,
    invitation_project_id?: string,
    type: NotificationEnum,
    state: NotificationStateEnum
}

export const defaultNotificationType: NotificationType = {
    id: "",
    sender_id: undefined,
    receiver_id: "",
    date: new Date(),
    content: "",
    invitation_project_id: undefined,
    type: NotificationEnum.INFO,
    state: NotificationStateEnum.UNREAD
}


