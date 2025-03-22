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
import {httpRequest} from "../../api";
import {InfoContainer2, InfoContainerTypes} from "../common/infoContainer2/infoContainer2.tsx";

export function StatesContainer() {

    const [states, setStates] = useState<StateType[]>([])
    const {selectedProject} = useContext(UserContext)
    const {refreshStateContainer, handleRefreshState , activeId , setActiveId} = useContext(StatesContext)
    const [openNewStateModal, setOpenNewStateModal] = useState(false)
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
        const activeData = event.active.data.current as CardType
        
        if (!over) return

        const activeId = active.id as string
        const overId = over.id as string
        
        const overData = over.data.current
        
        //Check if overData is a StateType or a CardType
        if ((overData as StateType).project_id === undefined) {
            const overCard = overData as CardType
            
            if (activeData.state_id === overCard.state_id){
                if (activeData.position === overCard.position) return
                await httpRequest({
                    url: '/card/sortPositions',
                    method: 'PUT',
                    data: {
                        activePosition: activeData.position,
                        overPosition: overCard.position,
                        state_id: activeData.state_id,
                        activeCardId: activeId
                    }
                })
                    .then(() => {
                        handleRefreshState()
                    })
                return
            }
            await httpRequest({
                url: '/card/updateState',
                method: 'PUT',
                data: {
                    activePosition: activeData.position,
                    overPosition: overCard.position,
                    activeStateId: activeData.state_id,
                    overStateId: overCard.state_id,
                    activeCardId: activeId
                }
            })
                .then(() => {
                    handleRefreshState()
                })
            return
        }
        
        if (activeData.state_id === overId) return

        await httpRequest({
            url: '/card/updateState',
            method: 'PUT',
            data: {
                activePosition: activeData.position,
                overPosition: 0,
                activeStateId: activeData.state_id,
                overStateId: overId,
                activeCardId: activeId
            }
        })
            .then(() => {
                handleRefreshState()
            })
    }

    function handleDragStart(event: DragStartEvent) {
        const id = event.active.id as string;
        const data = event.active.data.current as CardType
        setActiveCard(data)
        setActiveId(id);
    }

    return (
        <>
            <DndContext 
                onDragStart={handleDragStart} 
                onDragEnd={handleDragEnd}
            >
                <div className="flex flex-row overflow-x-auto overscroll-y-none h-full w-full">
                    {states.length > 0 ? (
                        states.map((state) => (
                            <State key={state.id} stateProps={state}/>
                        ))
                    ) : (
                        <div className={"flex w-[90%] h-full items-center justify-center"}>
                            <InfoContainer2 info={"No states yet !"} type={InfoContainerTypes.DEFAULT} cn={"p-3"}/>
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
                        <Card cardProps={{...activeCard,id:" "}}/>
                    ) : null}
                </DragOverlay>
            </DndContext>
        </>
    )
}