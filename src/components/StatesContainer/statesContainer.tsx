import {State} from "../State/state.tsx";
import {Plus} from "lucide-react";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../context/userContext.tsx";
import {StateType} from "../../types"
export function StatesContainer(){
    const [states, setStates] = useState<StateType[]>([])
    const {selectedProject , setOpenNewStateModal, openNewStateModal , openStateOptionsModal} = useContext(UserContext)
    
    useEffect(() => {
        fetch(`http://localhost:8080/api/state?project_id=${selectedProject.id}`)
            .then(response => response.json())
            .then(data => setStates(data))
            .catch(error => console.log(error))
    },[selectedProject.id,openNewStateModal,openStateOptionsModal])
    return (
        <div className="flex flex-row mt-12 overflow-x-auto w-full h-[85%] ">
            {states.length > 0 ? (
                states.map((state) => (
                    <State key={state.id} stateProps={state}/>
                ))
            ):
            (
                <div className={"flex w-[90%] h-full items-center justify-center"}>
                        <p className={"text-xl sm:text-2xl bg-gray-100 rounded-lg border-2 p-2"}>No states yet !</p>
                </div>
            )}
            
            <div className="flex items-center w-full">
                <div
                    className="flex items-center justify-center rounded-full 
                    mx-4 w-16 h-16 bg-gray-100 hover:bg-gray-400 transition-colors duration-200
                    shadow-lg cursor-pointer"
                    onClick={() => setOpenNewStateModal(true)}
                >
                    <Plus/>
                </div>
            </div>
        </div>
    )
}