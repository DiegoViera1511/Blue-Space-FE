import {createContext, useState} from "react";
import {CardType, ProjectType, StateType,defaultProyectType, defaultCardType , defaultStateType} from "../types.ts";

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
    const [user , setUser] = useState<string>('')
    const [openProjectModal , setOpenProjectModal] = useState(false)
    const [openStateOptionsModal , setOpenStateOptionsModal] = useState(false)
    const [openNewStateModal , setOpenNewStateModal] = useState(false)
    const [openAddCardModal , setOpenAddCardModal] = useState(false)
    const [openInfoCardModal , setOpenInfoCardModal] = useState(false)
    const [selectedProject , setSelectedProject] = useState<ProjectType>(defaultProyectType)
    const [selectedState , setSelectedState] = useState<StateType>(defaultStateType)
    const [selectedCard , setSelectedCard] = useState<CardType>(defaultCardType)
    const fetchToken = async () => {
        const token = localStorage.getItem('jwt')
        if (token) {
            await fetch('http://localhost:8080/api/user/token/checktoken', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                })
                    .then(response => response.json())
                    .then((data) => {
                        if (data.username){
                            setUser(data.username)
                            setIsAuth(true)
                        }
                    })
                    .catch(error => console.log(error))
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