import {useContext, useState} from "react";
import {UserContext} from "../../../context/userContext.tsx";
import {StateType} from "../../../types.ts";
import {StatesContext} from "../../../context/statesContext.tsx";
import {SimpleButton} from "../../common/simpleButton/simpleButton.tsx";
import {Modal} from "../../common/modal/modal.tsx";
import {httpRequest} from "../../../api";

interface NewStateModalProps {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    position: number
}

export function NewStateModal({open , setOpen,position}: NewStateModalProps) {

    const {selectedProject} = useContext(UserContext)
    const {handleRefreshStateContainer} = useContext(StatesContext)
    const [newStateName, setNewStateName] = useState('')

    const handleCreateState = async () => {
        const newState: Partial<StateType> = {
            position: position,
            project_id: selectedProject.id,
            name: newStateName
        }
        await httpRequest({
            url: '/state',
            method: 'POST',
            data: newState
        })
            .then(() => {
                setNewStateName('')
                handleRefreshStateContainer()
                setOpen(false)
            })
    }
    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <div
                className={"flex flex-col p-5 bg-white gap-4 justify-center text-sm w-[250px] sm:w-[500px] "}
            >
                <p className={"text-2xl font-bold"}>New State</p>
                <input type="text" placeholder={"State name"}
                       className={" text-sm p-3 outline-none bg-gray-100 rounded-md"}
                       value={newStateName}
                       onChange={(e) => setNewStateName(e.target.value)}
                />
                <hr/>
                <div className="flex flex-row gap-2 items-center justify-start">
                    <SimpleButton
                        onClick={() => setOpen(false)}
                        text={"Cancel"}
                        cn={"hover:bg-gray-100"}
                    />
                    <SimpleButton
                        onClick={() => handleCreateState()}
                        text={"Create"}
                        cn={"hover:text-green-500 hover:bg-gray-100"}
                    />
                </div>

            </div>
        </Modal>

    )
}