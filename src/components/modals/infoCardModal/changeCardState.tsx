import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../../context/userContext.tsx";
import {StateType} from "../../../types.ts";
import {ChevronDown, ChevronRight, ChevronUp, X} from "lucide-react";
import {StatesContext} from "../../../context/statesContext.tsx";
import {httpRequest} from "../../../api";

interface ChangeCardStateProps {
    onClick: () => void
}

export function ChangeCardState({onClick}: ChangeCardStateProps) {

    const [changeState, setChangeState] = useState(false)
    const [states, setStates] = useState<StateType[]>([])
    const [stateName, setStateName] = useState('')
    const {selectedProject} = useContext(UserContext)
    const {selectedCard, handleRefreshState} = useContext(StatesContext)

    const getAllProjectStates = async () => {
        const response = await httpRequest<StateType[]>({
            url:`/state?project_id=${selectedProject.id}`,
            method:"GET" 
        })
        setStates(response.data)
    }

    const handleChangeState = async (state_id: string) => {
        await httpRequest({
            url:'/card/updateState',
            method:"PUT",
            data:{
                activePosition: selectedCard.position,
                overPosition: 0,
                activeStateId: selectedCard.state_id,
                overStateId: state_id,
                activeCardId: selectedCard.id
            }
        })
            .then(() => {
                handleRefreshState()
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        //Get state name by props
        setChangeState(false)
        fetch(`http://localhost:8080/api/state/${selectedCard.state_id}`)
            .then(response => response.json())
            .then(data => setStateName(data.name))
            .catch(error => console.log(error))
    }, [selectedCard]);

    return (
        <>
            <div className={"flex flex-row items-center justify-start gap-2"}>
                <p className={"text-md p-1"}>State: </p>
                <p
                    className={"flex flex-row items-center justify-center text-md bg-gray-100 border-2 p-1 rounded-md"}
                    onClick={() => {
                        getAllProjectStates()
                        setChangeState(!changeState)
                        onClick()
                    }}
                >
                    {stateName}
                    {changeState ? <ChevronUp/> : <ChevronDown/>}
                </p>
            </div>
            {changeState && (
                <div
                    className={"flex flex-col sm:flex-row bg-gray-100 border-2 rounded p-2 gap-2 items-center justify-between"}>
                    <p className={"flex flex-row items-center justify-center text-nowrap"}>
                        Move to <ChevronRight/>
                    </p>
                    <div className={"flex flex-col sm:flex-row gap-2 p-2 overflow-x-auto text-nowrap rounded"}>
                        {states.length > 0 && (
                            states.map((state) => (
                                <div
                                    key={state.id}
                                    className={"bg-white p-1 border-2 rounded cursor-pointer"}
                                    onClick={() => handleChangeState(state.id)}
                                >
                                    <p>{state.name}</p>
                                </div>
                            ))
                        )}
                    </div>
                    <button
                        className={"flex items-center justify-center rounded-full bg-white"}
                        onClick={() => setChangeState(false)}
                    >
                        <X/>
                    </button>
                </div>
            )}
        </>
    )
}