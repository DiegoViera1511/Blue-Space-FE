import {Header} from "../components/Header/header.tsx";
import {StatesContainer} from "../components/StatesContainer/statesContainer.tsx";
import {Modal} from "../components/Modals/modal.tsx";
import {useContext} from "react";
import {UserContext} from "../context/userContext.tsx";
import {ProjectsModal} from "../components/Modals/projectsModal.tsx";
import {NewStateModal} from "../components/Modals/newStateModal.tsx";
import {StateOptionsModal} from "../components/Modals/stateOptionsModal.tsx";

export function MainPage() {
    const {
        openProjectModal,
        setOpenProjectModal,
        openStateOptionsModal,
        setOpenStateOptionsModal,
        openAddCardModal,
        setOpenAddCardModal,
        openInfoCardModal,
        setOpenInfoCardModal,
        openNewStateModal,
        setOpenNewStateModal,
        user
    } = useContext(UserContext)
    return (
        <>
            <Header username={user}/>
            <Modal open={openProjectModal} onClose={() => setOpenProjectModal(false)}>
                <ProjectsModal/>
            </Modal>
            <Modal open={openNewStateModal} onClose={() => setOpenNewStateModal(false)}>
                <NewStateModal/>
            </Modal>
            <Modal open={openStateOptionsModal} onClose={() => setOpenStateOptionsModal(false)}>
                <StateOptionsModal/>
            </Modal>
            <Modal open={openAddCardModal} onClose={() => setOpenAddCardModal(false)}>
                <div className='flex w-16 h-16 bg-white items-center justify-center'>Add card</div>
            </Modal>
            <Modal open={openInfoCardModal} onClose={() => setOpenInfoCardModal(false)}>
                <div className='flex w-16 h-16 bg-white items-center justify-center'>Card Info</div>
            </Modal>
            <main className="flex flex-row w-screen h-screen items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500 overscroll-y-none">
                <StatesContainer/>
            </main>
        </>

    )
}