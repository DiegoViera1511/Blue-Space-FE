import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../context/userContext.tsx";
import {CardType} from "../../types.ts";


export function NewCardModal(){
    const [newCardName , setNewCardName] = useState('')
    const [newCardText , setNewCardText] = useState('')
    const {selectedState , setOpenAddCardModal , openAddCardModal} = useContext(UserContext)
    useEffect(() => {
        setNewCardName('')
        setNewCardText('')
    }, [openAddCardModal]);
    const handleCreateCard = () => {
        const newCard : Partial<CardType> = {
            title: newCardName,
            text: newCardText,
            state_id: selectedState.id
        }
        fetch(`http://localhost:8080/api/card`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCard)
        })
            .then(response => response.json())
            .then(() => {
                setOpenAddCardModal(false)
            })
            .catch(error => console.log(error))
    }
    
    return (
        <div
            className={"flex flex-col p-5 bg-white gap-4 justify-start text-sm w-[280px] h-fit sm:w-[500px] "}
        >
            <div className={"flex flex-row items-center justify-between"}>
                <p className={"text-xl font-bold"}>New Card</p>
                <p className={"text-xl font-bold"}>State: {selectedState.name} </p>
            </div>
            <div className={"flex flex-col w-full bg-gray-100 gap-4 rounded p-3"}>
                <p className={"text-xl"}>Title</p>
                <input type="text" placeholder={"Card title"}
                       className={" text-sm sm:text-lg p-2 border border-gray-400 rounded"}
                       value={newCardName}
                       onChange={(e) => setNewCardName(e.target.value)}
                />
                <p className={"text-xl"}>Description</p>
                <textarea
                    placeholder={"Card text"}
                    className={"text-sm sm:text-lg p-2 border border-gray-400 rounded h-[150px] sm:h-[250px] resize-none overflow-y-auto"}
                    value={newCardText}
                    onChange={(e) => setNewCardText(e.target.value)}
                />
                <div className={"flex flex-row gap-4 items-center justify-center"}>
                    <button
                        className={"p-2 text-green-500 bg-white rounded"}
                        onClick={() => handleCreateCard()}
                    >
                        Create
                    </button>
                    <button
                        className={"p-2 text-sm bg-white rounded"}
                        onClick={() => setOpenAddCardModal(false)}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}