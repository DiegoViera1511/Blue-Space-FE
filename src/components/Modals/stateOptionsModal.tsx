import {UserContext} from "../../context/userContext.tsx";
import {useContext, useEffect, useState} from "react";
import {Pencil, Trash2} from "lucide-react";


export function StateOptionsModal(){
    const {selectedState , setOpenStateOptionsModal} = useContext(UserContext)
    const [deleteOptions , setDeleteOptions] = useState(false)
    const [editOptions , setEditOptions] = useState(false)
    const [newStateName , setNewStateName] = useState(selectedState.name)
    useEffect(() => {
        setEditOptions(false)
        setDeleteOptions(false)
        setNewStateName(selectedState.name)
    }, [selectedState.name]);
    return(
        <div
            className={"flex flex-col p-5 bg-white gap-4 justify-start text-sm w-[250px] h-fit sm:w-[500px] "}
        >
            <div className={"flex flex-col w-full gap-4"}>
                <p className={"text-xl sm:text-2xl"}>{selectedState.name}</p>
                <div className={"flex flex-col bg-gray-100 p-2 gap-4 rounded"}>
                    <button className={"flex flex-row p-2 gap-4 items-center justify-center bg-white rounded"}
                            onClick={() => {
                                setEditOptions(!editOptions)
                                setDeleteOptions(false)
                            }}
                    >
                        Edit <Pencil/>
                    </button>
                    <button
                        className={"flex items-center gap-4 p-2 justify-center bg-white rounded"}
                        onClick={() => {
                            setDeleteOptions(!deleteOptions)
                            setEditOptions(false)
                        }}
                    >
                        Delete <Trash2 className={"text-red-600"}/>
                    </button>
                    {editOptions && (
                        <div className={"flex flex-col gap-4"}>
                            <input type="text" placeholder={"State name"}
                                   className={" text-sm p-2 border border-gray-400 rounded"}
                                   value={newStateName}
                                   onChange={(e) => setNewStateName(e.target.value)}
                            />
                            <div className={"flex flex-row gap-4 justify-center"}>
                                <button 
                                    className={"p-2 text-green-500 text-sm bg-white rounded"}
                                    onClick={() => {
                                        fetch(`http://localhost:8080/api/state/${selectedState.id}`, {
                                            method: 'PUT',
                                            headers: {
                                                'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify({name: newStateName})
                                        })
                                            .then(response => response.json())
                                            .then(() => {
                                                setOpenStateOptionsModal(false)
                                                setEditOptions(false)
                                                setNewStateName('')
                                            })
                                            .catch(error => console.log(error))
                                    }}
                                >
                                    Save
                                </button>
                                <button className={"p-2 text-sm bg-white rounded"}
                                        onClick={() => setEditOptions(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                    {deleteOptions && (
                        <div className={"flex flex-col gap-4"}>
                            <div className={"bg-white rounded p-3"}>
                                <p>Delete "{selectedState.name}" ?</p>
                                <p>Delete this state will also delete its data.</p>
                            </div>
                            <div className={"flex flex-row gap-4 justify-center"}>
                                <button 
                                    className={"bg-white p-2 text-red-600 rounded"}
                                    onClick={() => {
                                        fetch(`http://localhost:8080/api/state/${selectedState.id}`, {
                                            method: 'DELETE',
                                        })
                                            .then(response => response.json())
                                            .then(() => {
                                                setOpenStateOptionsModal(false)
                                                setDeleteOptions(false)
                                            })
                                            .catch(error => console.log(error))
                                    }}
                                >
                                    Delete
                                </button>
                                <button 
                                    className={"bg-white p-2 rounded"}
                                    onClick={() => setDeleteOptions(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}