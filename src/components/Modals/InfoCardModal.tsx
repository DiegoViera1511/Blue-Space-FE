import {UserContext} from "../../context/userContext.tsx";
import {useContext, useEffect, useState} from "react";
import {Trash2,ChevronDown , ChevronUp , ChevronRight , X} from "lucide-react";
import {defaultCardType, StateType} from "../../types.ts";


export function InfoCardModal(){
    const {selectedCard , selectedProject, setSelectedCard , setOpenInfoCardModal , openInfoCardModal} = useContext(UserContext)
    const [stateName , setStateName] = useState('')
    const [editText , setEditText] = useState(false)
    const [editTitle , setEditTitle] = useState(false)
    const [newCardTitle , setNewCardTitle] = useState(selectedCard.title)
    const [newCardText , setNewCardText] = useState(selectedCard.text)
    const [deleteOptions , setDeleteOptions] = useState(false)
    const [changeState, setChangeState] = useState(false)
    const [states , setStates] = useState<StateType[]>([])
    
    const handleSaveEdit = () => {
        fetch(`http://localhost:8080/api/card/${selectedCard.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({text: newCardText})
        })
            .then(response => response.json())
            .then((data) => {
                setSelectedCard(data)
                setEditText(false)
            })
            .catch(error => console.log(error))
    }

    const handleSaveEditTitle = () => {
        fetch(`http://localhost:8080/api/card/${selectedCard.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title: newCardTitle})
        })
            .then(response => response.json())
            .then((data) => {
                setSelectedCard(data)
                setEditTitle(false)
            })
            .catch(error => console.log(error))
    }
    
    const handleDelete = () => {
        fetch(`http://localhost:8080/api/card/${selectedCard.id}`, {
            method: 'DELETE'
        })
            .then(() => {
                setSelectedCard(defaultCardType)
                setOpenInfoCardModal(false)
                setDeleteOptions(false)
            })
            .catch(error => console.log(error))
    }
    
    const getAllProjectStates = () => {
        fetch(`http://localhost:8080/api/state?project_id=${selectedProject.id}`)
            .then(response => response.json())
            .then(data => setStates(data))
            .catch(error => console.log(error))
    }
    
    const handleChangeState = (state_id:string) => {
        fetch(`http://localhost:8080/api/card/${selectedCard.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({state_id: state_id})
        })
            .then(response => response.json())
            .then((data) => {
                setSelectedCard(data)
            })
            .catch(error => console.log(error))
    }
    
    useEffect(() => {
        setDeleteOptions(false)
        setEditText(false)
        setNewCardText(selectedCard.text)
        setNewCardTitle(selectedCard.title)
        setChangeState(false)
        fetch(`http://localhost:8080/api/state/${selectedCard.state_id}`)
            .then(response => response.json())
            .then(data => setStateName(data.name))
            .catch(error => console.log(error))
    }, [selectedCard , openInfoCardModal ]);
    return(
        <div
            className={"flex flex-col p-5 bg-white gap-4 overflow-y-auto justify-start text-sm w-[280px] h-fit max-h-[400px] sm:max-h-[550px] sm:w-[500px] "}
        >
            {editTitle ? (
                <input
                    type="text"
                    placeholder={"Card title"}
                    className={"text-xl font-bold px-1 outline-gray-100"}
                    onBlur={() => handleSaveEditTitle()}
                    value={newCardTitle}
                    onChange={(e) => setNewCardTitle(e.target.value)}
                />
            ) : (
                <p
                    className={"text-xl font-bold"}
                    onClick={() => setEditTitle(true)}
                >
                    {selectedCard.title}
                </p>
            )}
            <div className={"flex flex-row items-center justify-start gap-2"}>
                <p className={"text-md p-1"}>State: </p>
                <p 
                    className={"flex flex-row items-center justify-center text-md bg-gray-100 border-2 p-1 rounded-md"}
                    onClick={() => {
                        getAllProjectStates()
                        setChangeState(!changeState)
                        setDeleteOptions(false)
                    }}
                >
                    {stateName}
                    {changeState ? <ChevronUp/> : <ChevronDown/>}
                </p>
            </div>
            {changeState && (
                <div className={"flex flex-col sm:flex-row bg-gray-100 border-2 rounded p-2 gap-2 items-center justify-between"}>
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
            {editText ? (
                <>
                    <textarea
                        placeholder={"Card text"}
                        className={"bg-gray-100 rounded border-2 w-full h-fit min-h-[200px] max-h-[500px] overflow-y-auto p-3"}
                        value={newCardText}
                        onBlur={() => handleSaveEdit()}
                        onChange={(e) => setNewCardText(e.target.value)}
                    />
                </>

            ) : (
                <div
                    className={"bg-gray-100 rounded border-2 w-full h-fit min-h-[200px] max-h-[500px] overflow-y-auto p-3"}
                    onClick={() => setEditText(true)}
                >
                    <p className={"whitespace-pre-wrap"}>{selectedCard.text}</p>
                </div>
            )}
            <div className={"flex flex-row items-center justify-center"}>
                {deleteOptions ? (
                    <div
                        className={"bg-gray-100 flex flex-col gap-4 p-3 rounded"}
                    >
                        <div className={"bg-white rounded p-3"}>
                            <p>Delete "{selectedCard.title}" ?</p>
                            <p>Delete this card will also delete its data.</p>
                        </div>
                        <div
                            className={"flex flex-row gap-4 items-center justify-center"}
                        >
                            <button
                                className={"flex flex-row gap-4 items-center justify-center border-2 bg-white rounded-lg p-2"}
                                onClick={() => setDeleteOptions(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className={"flex flex-row gap-4 items-center justify-center text-red-500 border-2 bg-white rounded-lg p-2"}
                                onClick={() => handleDelete()}
                            >
                                Delete
                            </button>
                        </div>
                    </div>

                ) : (
                    <button
                        className={"flex flex-row gap-4 items-center justify-center text-red-500 border-2 bg-gray-100 rounded-lg p-2"}
                        onClick={() => {
                            setDeleteOptions(true)
                            setChangeState(false)
                        }}
                    >
                        Delete
                        <Trash2/>
                    </button>
                )}
            </div>
        </div>
    )
}