import {createContext, useState} from "react";
import {CardType, ProjectType, StateType} from "../types.ts";


interface UserContextType{
    isAuth:boolean,
    setIsAuth:React.Dispatch<React.SetStateAction<boolean>>,
    user:string,
    setUser:React.Dispatch<React.SetStateAction<string>>
    selectedState:StateType,
    setSelectedState:React.Dispatch<React.SetStateAction<StateType>>
    selectedCard:CardType,
    setSelectedCard:React.Dispatch<React.SetStateAction<CardType>>,
    openProjectModal:boolean,
    setOpenProjectModal:React.Dispatch<React.SetStateAction<boolean>>,
    openStateOptionsModal:boolean,
    setOpenStateOptionsModal:React.Dispatch<React.SetStateAction<boolean>>,
    openNewStateModal:boolean,
    setOpenNewStateModal:React.Dispatch<React.SetStateAction<boolean>>,
    openAddCardModal:boolean,
    setOpenAddCardModal:React.Dispatch<React.SetStateAction<boolean>>,
    openInfoCardModal:boolean,
    setOpenInfoCardModal:React.Dispatch<React.SetStateAction<boolean>>,
    selectedProject:ProjectType,
    setSelectedProject:React.Dispatch<React.SetStateAction<ProjectType>>,
    fetchToken:()=>void
}
export const UserContext = createContext<UserContextType>({} as UserContextType);
export function UserProvider ({children}: {children: React.ReactNode}){
    const [isAuth , setIsAuth] = useState(false)
    const [user , setUser] = useState('viera')
    const [openProjectModal , setOpenProjectModal] = useState(false)
    const [openStateOptionsModal , setOpenStateOptionsModal] = useState(false)
    const [openNewStateModal , setOpenNewStateModal] = useState(false)
    const [openAddCardModal , setOpenAddCardModal] = useState(false)
    const [openInfoCardModal , setOpenInfoCardModal] = useState(false)
    const [selectedProject , setSelectedProject] = useState<ProjectType>({username:"viera" , id:"512777e7-1cb4-4628-9e85-6c2fe4b04f81" , name:"Blue-Space"} as ProjectType)
    const [selectedState , setSelectedState] = useState<StateType>({id:"id" , name:"state" , project_id:"id"} as StateType)
    const [selectedCard , setSelectedCard] = useState<CardType>({id:"id" , state_id:"id" , title:"title" , text:"text"} as CardType)
    const fetchToken = async () => {
        const token = localStorage.getItem('jwt')
        if (token) {
            const response = await fetch(
                'route', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                })
            if (response.status === 200) {
                setIsAuth(true)
            }
        }
    }
    return(
        <UserContext.Provider
            value={{
                isAuth,
                setIsAuth,
                user,
                setUser,
                openProjectModal,
                setOpenProjectModal,
                openStateOptionsModal,
                setOpenStateOptionsModal,
                openAddCardModal,
                setOpenAddCardModal,
                openInfoCardModal,
                setOpenInfoCardModal,
                selectedProject,
                setSelectedProject,
                openNewStateModal,
                setOpenNewStateModal,
                selectedState,
                setSelectedState,
                selectedCard,
                setSelectedCard,
                fetchToken
            }}
        >
            {children}
        </UserContext.Provider>
    )
}