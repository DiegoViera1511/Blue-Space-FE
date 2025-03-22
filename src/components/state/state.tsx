import {Ellipsis} from 'lucide-react';
import {Plus} from "lucide-react";
import {Card} from "../card/card.tsx";
import {useContext, useEffect, useState} from "react";
import {CardType, StateType} from "../../types.ts";
import {StateOptionsModal} from '../modals/stateOptionsModal/stateOptionsModal.tsx';
import {StatesContext} from '../../context/statesContext.tsx';
import {NewCardModal} from '../modals/newCardModal/newCardModal.tsx';
import {useDroppable} from "@dnd-kit/core";
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";

export function State({stateProps}: { stateProps: StateType }) {

    const {
        setSelectedState,
        handleRefreshState
    } = useContext(StatesContext)

    const {setNodeRef} = useDroppable({
        id: stateProps.id,
        data: {...stateProps}
    });

    const [cards, setCards] = useState<CardType[]>([])
    const [openNewCardModal, setOpenNewCardModal] = useState(false)
    const [openStateOptionsModal, setOpenStateOptionsModal] = useState(false)

    useEffect(() => {
        fetch(`http://localhost:8080/api/card?state_id=${stateProps.id}`)
            .then(response => response.json())
            .then(data => setCards(data))
            .catch(error => console.log(error))
    }, [stateProps.id, handleRefreshState]);

    return (
        <>
            <div
                className="flex flex-col min-w-[75%] sm:min-w-[50%] md:min-w-[40%] lg:min-w-[30%] xl:min-w-[25%] 
                rounded-xl h-fit max-h-[100%] p-1 m-3 bg-gray-100 shadow-lg"
            >
                <div 
                    className="flex flex-row items-center justify-between text-ellipsis overflow-hidden px-3 pt-2"
                >
                    <p className="font-medium">{stateProps.name}</p>
                    <button 
                        className={"hover:bg-gray-200 p-1 rounded-md"}
                        onClick={() => {
                        setSelectedState(stateProps)
                        setOpenStateOptionsModal(true)
                    }}>
                        <Ellipsis/>
                    </button>
                </div>
                <div className={"flex flex-col overflow-y-auto w-full items-center justify-start"}>
                    <SortableContext
                        items={cards}
                        strategy={verticalListSortingStrategy}
                    >
                        <div ref={setNodeRef} className={"w-full"}>
                            <div
                                className="grid auto-cols-auto items-stretch justify-items-stretch scrollbar-hidden 
                                m-1 my-1 py-2 h-fit overflow-x-hidden gap-2 transition-all 
                                [@media(min-height:640px)]:max-h-[440px] [@media(min-height:768px)]:max-h-[570px]
                                [@media(min-height:999px)]:max-h-[770px] [@media(min-height:500px)]:max-h-[400px]"
                            >
                                {cards.length > 0 ? (
                                    cards.map((card) => (
                                        <Card key={card.id} cardProps={card}/>
                                    ))
                                ) : (
                                    <></>
                                )}
                            </div>
                        </div>
                    </SortableContext>
                    <div className={"flex items-center justify-start w-full"}>
                        <button className={"flex items-center justify-start p-2 m-3 mt-0 w-fit h-fit rounded-md hover:bg-gray-200"} onClick={() => {
                            setOpenNewCardModal(true)
                            setSelectedState(stateProps)
                        }}>
                            <Plus/>
                        </button>
                    </div>
                </div>
            </div>
            <StateOptionsModal open={openStateOptionsModal} setOpen={setOpenStateOptionsModal}/>
            <NewCardModal open={openNewCardModal} setOpen={setOpenNewCardModal} position={cards.length}/>
        </>

    )
}