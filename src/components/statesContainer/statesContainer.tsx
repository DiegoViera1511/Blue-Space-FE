import {State} from "../state/state.tsx";
import {Plus} from "lucide-react";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../context/userContext.tsx";
import {CardType, defaultCardType, StateType} from "../../types"
import {NewStateModal} from "../modals/newStateModal/newStateModal.tsx";
import {StatesContext} from "../../context/statesContext.tsx";
import {DndContext, DragEndEvent, DragStartEvent} from "@dnd-kit/core";
import {DragOverlay} from "@dnd-kit/core";
import {Card} from "../card/card.tsx";

export function StatesContainer() {

    const [states, setStates] = useState<StateType[]>([])
    const {selectedProject} = useContext(UserContext)
    const {refreshStateContainer, handleRefreshState} = useContext(StatesContext)
    const [openNewStateModal, setOpenNewStateModal] = useState(false)
    const [activeId, setActiveId] = useState<string | null>(null);
    const [activeCard, setActiveCard] = useState<CardType>(defaultCardType)

    useEffect(() => {
        if (selectedProject.id === '') return
        fetch(`http://localhost:8080/api/state?project_id=${selectedProject.id}`)
            .then(response => response.json())
            .then(data => setStates(data))
            .catch(error => console.log(error))
    }, [selectedProject.id, refreshStateContainer])

    const handleDragEnd = async (event: DragEndEvent) => {
        setActiveId(null);
        const {active, over} = event
        if (!over) return

        const cardId = active.id as string
        const stateId = over.id as string

        await fetch(`http://localhost:8080/api/card/${cardId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({state_id: stateId})
        })
            .then(response => response.json())
            .then(() => {
                handleRefreshState()
            })
            .catch(error => console.log(error))
    }

    function handleDragStart(event: DragStartEvent) {
        const id = event.active.id as string;
        const data = event.active.data.current as CardType
        setActiveCard(data)
        setActiveId(id);
    }

    return (
        <>
            <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                <div className="flex flex-row mt-12 overflow-x-auto w-full h-[85%] ">
                    {states.length > 0 ? (
                        states.map((state) => (
                            <State key={state.id} stateProps={state}/>
                        ))
                    ) : (
                        <div className={"flex w-[90%] h-full items-center justify-center"}>
                            <p className={"text-xl sm:text-2xl bg-gray-100 rounded-lg border-2 p-2"}>No states yet !</p>
                        </div>
                    )}

                    <div className="flex items-center w-full">
                        <div
                            className="flex items-center justify-center rounded-full 
                                mx-4 w-16 h-16 bg-gray-100 hover:bg-gray-400 transition-colors duration-200
                                shadow-lg cursor-pointer"
                            onClick={() => setOpenNewStateModal(true)}
                        >
                            <Plus/>
                        </div>
                    </div>
                </div>
                <NewStateModal open={openNewStateModal} setOpen={setOpenNewStateModal} position={states.length}/>
                <DragOverlay dropAnimation={null}>
                    {activeId ? (
                        <Card cardProps={activeCard}/>
                    ) : null}
                </DragOverlay>
            </DndContext>
        </>
    )
}