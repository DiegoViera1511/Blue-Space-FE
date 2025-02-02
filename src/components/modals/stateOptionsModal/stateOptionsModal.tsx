import {useContext, useEffect, useState} from "react";
import {Pencil, Trash2} from "lucide-react";
import {StatesContext} from "../../../context/statesContext.tsx";
import {Modal} from "../../common/modal/modal.tsx";
import {SimpleButton} from "../../common/simpleButton/simpleButton.tsx";
import {DeleteWarningModal} from "../deleteWarning/deleteWarningModal.tsx";

interface StateOptionsModalProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function StateOptionsModal({open , setOpen} : StateOptionsModalProps) {
    const {selectedState} = useContext(StatesContext)

    const {handleRefreshStateContainer} = useContext(StatesContext)

    const [deleteOptions, setDeleteOptions] = useState(false)
    const [editOptions, setEditOptions] = useState(false)
    const [newStateName, setNewStateName] = useState('')

    const handleEditState = (id: string) => {
        fetch(`http://localhost:8080/api/state/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: newStateName})
        })
            .then(response => response.json())
            .then(() => {
                setEditOptions(false)
                handleRefreshStateContainer()
                setOpen(false)
            })
            .catch(error => console.log(error))
    }

    const handleDeleteState = (id: string) => {
        fetch(`http://localhost:8080/api/state/${id}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(() => {
                setDeleteOptions(false)
                handleRefreshStateContainer()
                setOpen(false)
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        setEditOptions(false)
        setDeleteOptions(false)
        setNewStateName(selectedState.name)
    }, [selectedState]);

    return (
        <>
            <Modal open={open} onClose={() => setOpen(false)}>
                <div
                    className={"flex flex-col p-5 bg-white gap-4 justify-start text-sm w-[250px] h-fit sm:w-[500px] "}
                >
                    <div className={"flex flex-col w-full gap-4"}>
                        <p className={"text-xl sm:text-2xl"}>{selectedState.name}</p>
                        <hr/>
                        <div className={"flex flex-col bg-gray-100 p-2 gap-4 rounded"}>
                            <SimpleButton
                                onClick={() => {
                                    setEditOptions(!editOptions)
                                    setDeleteOptions(false)
                                }}
                                text={"Edit"}
                                icon={<Pencil/>}
                                cn={"bg-white"}
                            />
                            <SimpleButton
                                onClick={() => {
                                    setDeleteOptions(!deleteOptions)
                                    setEditOptions(false)
                                }}
                                text={"Delete"}
                                icon={<Trash2/>}
                                cn={"bg-white text-red-500"}
                            />
                            {editOptions && (
                                <div className={"flex flex-col gap-4"}>
                                    <input type="text" placeholder={"State name"}
                                           className={" text-sm p-2 border border-gray-400 rounded"}
                                           value={newStateName}
                                           onChange={(e) => setNewStateName(e.target.value)}
                                    />
                                    <div className={"flex flex-row gap-4 justify-center"}>
                                        <SimpleButton
                                            onClick={() => setEditOptions(false)}
                                            text={"Cancel"}
                                            cn={"bg-white"}
                                        />
                                        <SimpleButton
                                            onClick={() => {
                                                handleEditState(selectedState.id)
                                            }}
                                            text={"Save"}
                                            cn={"text-green-500 bg-white"}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Modal>
            <DeleteWarningModal
                open={deleteOptions}
                setOpen={setDeleteOptions}
                objectName={selectedState.name}
                objectType={"State"}
                handleDelete={() => handleDeleteState(selectedState.id)}
            />
        </>

    )
}