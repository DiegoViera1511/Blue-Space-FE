import {useContext, useState} from "react";
import {UserContext} from "../../../context/userContext.tsx";
import {StateType} from "../../../types.ts";
import {StatesContext} from "../../../context/statesContext.tsx";
import {SimpleButton} from "../../common/simpleButton/simpleButton.tsx";
import {Modal} from "../../common/modal/modal.tsx";

interface NewStateModalProps {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    position: number
}

export function NewStateModal({open , setOpen,position}: NewStateModalProps) {

    const {selectedProject} = useContext(UserContext)
    const {handleRefreshStateContainer} = useContext(StatesContext)
    const [newStateName, setNewStateName] = useState('')

    const handleCreateState = () => {
        const newState: Partial<StateType> = {
            position: position,
            project_id: selectedProject.id,
            name: newStateName
        }
        fetch('http://localhost:8080/api/state', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newState)
        })
            .then(() => {
                setNewStateName('')
                handleRefreshStateContainer()
                setOpen(false)
            })
            .catch(error => console.log(error))
    }
    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <div
                className={"flex flex-col p-5 bg-white gap-4 justify-center text-sm w-[250px] sm:w-[500px] "}
            >
                <p className={"text-2xl font-bold"}>New State</p>
                <hr/>
                <input type="text" placeholder={"State name"}
                       className={" text-sm p-2 border border-gray-400 rounded"}
                       value={newStateName}
                       onChange={(e) => setNewStateName(e.target.value)}
                />
                <div className="flex flex-row gap-4 items-center justify-center">
                    <SimpleButton
                        onClick={() => setOpen(false)}
                        text={"Cancel"}
                    />
                    <SimpleButton
                        onClick={() => handleCreateState()}
                        text={"Create"}
                        cn={"text-green-500"}
                    />
                </div>

            </div>
        </Modal>

    )
}