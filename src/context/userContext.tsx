import {createContext, useState} from "react";
import {ProjectType, defaultProyectType} from "../types.ts";
import {Socket} from "socket.io-client";
import {localStorageProjectKey, localStorageToken} from "../utils.ts";
import {useLocalStorage} from "../hooks/useLocalStorage.ts";

interface UserContextType {
    isAuth: boolean,
    setIsAuth: React.Dispatch<React.SetStateAction<boolean>>,
    refreshProjects: boolean,
    setRefreshProjects: React.Dispatch<React.SetStateAction<boolean>>,
    user: string,
    setUser: React.Dispatch<React.SetStateAction<string>>
    selectedProject: ProjectType,
    setSelectedProject: React.Dispatch<React.SetStateAction<ProjectType>>,
    fetchToken: () => void
    socket: Socket | null,
    setSocket: React.Dispatch<React.SetStateAction<Socket | null>>,
}

export const UserContext = createContext<UserContextType>({} as UserContextType);

export function UserProvider({children}: { children: React.ReactNode }) {
    
    const [isAuth, setIsAuth] = useState(false)
    const [user, setUser] = useState<string>('')
    const [selectedProject, setSelectedProject] = 
        useLocalStorage<ProjectType>({key:localStorageProjectKey,initialValue:defaultProyectType})
    const [socket, setSocket] = useState<Socket | null>(null);
    const [refreshProjects, setRefreshProjects] = useState(false)
    
    const fetchToken = async () => {
        const token = localStorage.getItem(localStorageToken)
        if (token) {
            await fetch('http://localhost:8080/api/user/token/checktoken', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
                .then(response => response.json())
                .then((data) => {
                    if (data.username) {
                        setUser(data.username)
                        setIsAuth(true)
                    }
                })
                .catch(error => console.log(error))
        }
    }
    
    return (
        <UserContext.Provider
            value={{
                isAuth,
                setIsAuth,
                user,
                setUser,
                selectedProject,
                setSelectedProject,
                fetchToken,
                setSocket,
                socket,
                refreshProjects,
                setRefreshProjects
            }}
        >
            {children}
        </UserContext.Provider>
    )
}