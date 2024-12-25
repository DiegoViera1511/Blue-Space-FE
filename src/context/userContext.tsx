import {createContext, useState} from "react";


interface UserContextType{
    isAuth:boolean,
    openProjectModal:boolean,
    setOpenProjectModal:React.Dispatch<React.SetStateAction<boolean>>,
    openStateOptionsModal:boolean,
    setOpenStateOptionsModal:React.Dispatch<React.SetStateAction<boolean>>,
    openAddCardModal:boolean,
    setOpenAddCardModal:React.Dispatch<React.SetStateAction<boolean>>,
    openInfoCardModal:boolean,
    setOpenInfoCardModal:React.Dispatch<React.SetStateAction<boolean>>,
    project:{username:string , id:string , name:string},
    setProject:React.Dispatch<React.SetStateAction<{username:string , id:string , name:string}>>,
    fetchToken:()=>void
}
export const UserContext = createContext<UserContextType | undefined>(undefined);
export function UserProvider ({children}){
    const [isAuth , setIsAuth] = useState(false)
    const [openProjectModal , setOpenProjectModal] = useState(false)
    const [openStateOptionsModal , setOpenStateOptionsModal] = useState(false)
    const [openAddCardModal , setOpenAddCardModal] = useState(false)
    const [openInfoCardModal , setOpenInfoCardModal] = useState(false)
    const [project , setProject] = useState({username:"viera" , id:"id" , name:"Blue-Space"})
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
                openProjectModal,
                setOpenProjectModal,
                openStateOptionsModal,
                setOpenStateOptionsModal,
                openAddCardModal,
                setOpenAddCardModal,
                openInfoCardModal,
                setOpenInfoCardModal,
                project,
                setProject,
                fetchToken
            }}
        >
            {children}
        </UserContext.Provider>
    )
}