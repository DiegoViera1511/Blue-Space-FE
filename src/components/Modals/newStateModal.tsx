import {useContext, useState} from "react";
import {UserContext} from "../../context/userContext.tsx";
import { StateType} from "../../types.ts";


export function NewStateModal(){
    const {setOpenNewStateModal , selectedProject} = useContext(UserContext)
    const [newStateName , setNewStateName] = useState('')
    const handleCreateState = () => {
        const newState : Partial<StateType> = {
            project_id: selectedProject.id,
            name:newStateName
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
                setOpenNewStateModal(false)
            })
            .catch(error => console.log(error))
    }
    return(
        <div
            className={"flex flex-col p-5 bg-white gap-4 justify-center text-sm w-[250px] h-[400px] sm:w-[500px] "}
        >
            <p className={"text-2xl font-bold"}>New State</p>
            <input type="text" placeholder={"State name"}
                   className={" text-sm p-2 border border-gray-400 rounded"}
                   value={newStateName}
                   onChange={(e) => setNewStateName(e.target.value)}
            />
            <button className={"p-2 text-sm bg-green-500 rounded"}
                    onClick={() => handleCreateState()}
            >
                Create
            </button>
            <button className={"p-2 text-sm bg-gray-100 rounded"}
                    onClick={() => setOpenNewStateModal(false)}
            >
                Cancel
            </button>
        </div>
    )
}