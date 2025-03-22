import {useContext, useEffect, useState} from "react";
import {Pencil, Trash2} from "lucide-react";
import {StatesContext} from "../../../context/statesContext.tsx";
import {Modal} from "../../common/modal/modal.tsx";
import {SimpleButton} from "../../common/simpleButton/simpleButton.tsx";
import {DeleteWarningModal} from "../deleteWarning/deleteWarningModal.tsx";
import {httpRequest} from "../../../api";

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

    const handleEditState = async () => {
        if (selectedState.name === newStateName){
            setEditOptions(false)
            return
        }
        await httpRequest({
            url: `/state/${selectedState.id}`,
            method: 'PUT',
            data: {name: newStateName}
        })
            .then(() => {
                setEditOptions(false)
                handleRefreshStateContainer()
                setOpen(false)
            })
    }

    const handleDeleteState = async () => {
        await httpRequest({
            url: `/state/${selectedState.id}`,
            method: 'DELETE',
        })
            .then(() => {
                setDeleteOptions(false)
                handleRefreshStateContainer()
                setOpen(false)
            })
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
                        <div className={"flex flex-row items-center gap-4 justify-between w-full"}>
                            {editOptions ?
                                <input
                                    className={"outline-none w-full text-md font-bold bg-gray-100 rounded-md p-2"}
                                    type="text"
                                    value={newStateName}
                                    onChange={(e) => setNewStateName(e.target.value)}
                                />
                                :
                                <p className={"text-2xl font-bold"}>{selectedState.name}</p>
                            }
                            <SimpleButton onClick={() => setEditOptions(true)} text={""} icon={<Pencil/>} cn={"hover:bg-gray-100 hover:text-blue-500"}/>
                        </div>
                        {editOptions ?
                            <div className={"flex flex-row items-center gap-4 justify-start w-fit"}>
                                <SimpleButton onClick={() => setEditOptions(false)} text={"Cancel"} cn={"hover:bg-gray-100"}/>
                                <SimpleButton onClick={() => handleEditState()} text={"Save"} cn={"hover:bg-gray-100"}/>
                            </div>
                            :
                            <></>
                        }
                        <div className={"flex flex-col p-2 gap-4 rounded"}>
                            <hr/>
                            <SimpleButton
                                onClick={() => {
                                    setDeleteOptions(!deleteOptions)
                                    setEditOptions(false)
                                }}
                                text={"Delete"}
                                icon={<Trash2/>}
                                cn={"hover:bg-gray-100 hover:text-red-500"}
                            />
                        </div>
                    </div>
                </div>
            </Modal>
            <DeleteWarningModal
                open={deleteOptions}
                setOpen={setDeleteOptions}
                objectName={selectedState.name}
                objectType={"State"}
                handleDelete={() => handleDeleteState()}
            />
        </>

    )
}