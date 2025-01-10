export interface ProjectType{
    id:string;
    username:string;
    name:string;
}

export const defalutProyectType : ProjectType = {id:"id" , username:"username" , name:"name"}

export interface StateType {
    id:string;
    project_id:string;
    name:string
}

export const defaultStateType : StateType = {id:"id" , project_id:"id" , name:"name"}

export interface CardType{
    id:string, 
    state_id:string,
    title:string,
    text:string
}

export const defaultCardType : CardType = {id:"id" , state_id:"id" , title:"title" , text:"text"}

export interface UserType{
    username:string;
    password:string;
}

export const defaultUserType : UserType = {username:"username" , password:"password"}
