import { EllipsisVertical } from 'lucide-react';
import {Plus} from "lucide-react";
import {Card} from "../Card/card.tsx";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../context/userContext.tsx";
import {CardType, StateType} from "../../types.ts";


export function State({stateProps } : {stateProps: StateType}) {
    const {
        setOpenStateOptionsModal,
        setOpenAddCardModal,
        openAddCardModal,
        setSelectedState,
        selectedCard
    } = useContext(UserContext)
    const [cards, setCards] = useState<CardType[]>([])

    useEffect(() => {
        fetch(`http://localhost:8080/api/card?state_id=${stateProps.id}`)
            .then(response => response.json())
            .then(data => setCards(data))
            .catch(error => console.log(error))
    }, [stateProps.id , openAddCardModal , selectedCard]);
    return(
        <div
            className="flex flex-col min-w-[75%] sm:min-w-[50%] md:min-w-[40%] lg:min-w-[30%] xl:min-w-[25%] rounded-lg h-fit px-1 py-1 m-3 bg-gray-100
            shadow-lg">
            <div className="flex flex-row justify-between text-ellipsis overflow-hidden px-3 py-2">
                <p className="font-bold">{stateProps.name}</p>
                <button onClick={() => {
                    setSelectedState(stateProps)
                    setOpenStateOptionsModal(true)
                }}>
                    <EllipsisVertical/>
                </button>
            </div>
            <hr className="border-t border-gray-400 mt-2"/>
            <div className={"flex flex-col"}>
                <div className="flex flex-col mt-2 mb-2 max-h-[500px] md:max-h-[530px] overflow-y-auto items-center gap-4">
                    {cards.length > 0 ? (
                        cards.map((card) => (
                            <Card key={card.id} cardProps={card}/>
                        ))
                    ) : (
                        <></>
                    )}
                </div>
                <button className={"m-5 w-fit h-fit"} onClick={() => {
                    setOpenAddCardModal(true)
                    setSelectedState(stateProps)
                }}>
                    <Plus/>
                </button>
            </div>


        </div>
    )
}