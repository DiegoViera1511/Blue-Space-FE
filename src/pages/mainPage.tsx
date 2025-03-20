import {Header} from "../components/header/header.tsx";
import {StatesContainer} from "../components/statesContainer/statesContainer.tsx";
import {useContext, useEffect} from "react";
import {UserContext} from "../context/userContext.tsx";
import {Navigate} from "react-router-dom";
import {StatesProvider} from "../context/statesContext.tsx";
import {FullScreenContainer} from "../components/common/fullMainContainer/fullScreenContainer.tsx";
import {InfoContainer} from "../components/infoContainer/infoContainer.tsx";
import io from "socket.io-client";
import {backendHost} from "../api/api.ts";

export function MainPage() {
    const {
        user,
        selectedProject,
        isAuth,
        setSocket
    } = useContext(UserContext)

    useEffect(() => {
        if (!isAuth) return
        const newSocket = io(backendHost);
        setSocket(newSocket);
        newSocket.emit('register', user)
        return () => {
            newSocket.disconnect();
        };
    }, []);

    if (!isAuth) {
        return <Navigate to={"/"}/>
    }
    
    return (
        <>
            <Header username={user}/>
            <main className="flex flex-row w-screen h-screen items-center justify-center bg-gray-200 overscroll-y-none">
                <>
                    {selectedProject.id === "" ? (
                            <FullScreenContainer>
                                <InfoContainer text={"No project selected !"}/>
                            </FullScreenContainer>
                        )
                        : (
                            <StatesProvider>
                                <StatesContainer/>
                            </StatesProvider>
                        )}
                </>
            </main>
        </>
    )
}