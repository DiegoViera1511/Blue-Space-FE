import {Header} from "../components/header/header.tsx";
import {StatesContainer} from "../components/statesContainer/statesContainer.tsx";
import {useContext, useEffect} from "react";
import {UserContext} from "../context/userContext.tsx";
import {Navigate} from "react-router-dom";
import {StatesProvider} from "../context/statesContext.tsx";
import {FullScreenContainer} from "../components/common/fullMainContainer/fullScreenContainer.tsx";
import {InfoContainer2, InfoContainerTypes} from "../components/common/infoContainer2/infoContainer2.tsx";
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
    }, [selectedProject]);

    if (!isAuth) {
        return <Navigate to={"/"}/>
    }
    
    return (
        <div className={`flex flex-col items-center h-screen w-screen justify-start bg-${selectedProject.color}-500 overscroll-y-none`}>
            <Header username={user}/>
            <main className="flex basis-auto h-[90%] w-full items-start justify-center">
                <>
                    {selectedProject.id === "" ? (
                            <FullScreenContainer>
                                <InfoContainer2 info={"No project selected !"} type={InfoContainerTypes.DEFAULT} cn={"p-3"}/>
                            </FullScreenContainer>
                        )
                        : (
                            <StatesProvider>
                                <StatesContainer/>
                            </StatesProvider>
                        )}
                </>
            </main>
        </div>
    )
}