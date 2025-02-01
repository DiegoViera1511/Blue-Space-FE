import {createContext, useState} from "react";
import {CardType, defaultCardType, defaultStateType, StateType} from "../types.ts";

interface StatesContextType {
    refreshState: boolean,
    setRefreshState: React.Dispatch<React.SetStateAction<boolean>>
    refreshStateContainer: boolean,
    setRefreshStateContainer: React.Dispatch<React.SetStateAction<boolean>>
    openStateOptionsModal: boolean,
    setOpenStateOptionsModal: React.Dispatch<React.SetStateAction<boolean>>
    openNewStateModal: boolean,
    setOpenNewStateModal: React.Dispatch<React.SetStateAction<boolean>>
    selectedState: StateType,
    setSelectedState: React.Dispatch<React.SetStateAction<StateType>>
    selectedCard: CardType,
    setSelectedCard: React.Dispatch<React.SetStateAction<CardType>>
    openAddCardModal: boolean,
    setOpenAddCardModal: React.Dispatch<React.SetStateAction<boolean>>
    openInfoCardModal: boolean,
    setOpenInfoCardModal: React.Dispatch<React.SetStateAction<boolean>>
    handleRefreshStateContainer: () => void
    handleRefreshState: () => void
}

export const StatesContext = createContext<StatesContextType>({} as StatesContextType);

export function StatesProvider({children}: { children: React.ReactNode }) {

    const [openStateOptionsModal, setOpenStateOptionsModal] = useState(false)
    const [openNewStateModal, setOpenNewStateModal] = useState(false)
    const [refreshState, setRefreshState] = useState(false)
    const [refreshStateContainer, setRefreshStateContainer] = useState(false)
    const [selectedState, setSelectedState] = useState<StateType>(defaultStateType)
    const [selectedCard, setSelectedCard] = useState<CardType>(defaultCardType)
    const [openAddCardModal, setOpenAddCardModal] = useState(false)
    const [openInfoCardModal, setOpenInfoCardModal] = useState(false)
    const handleRefreshStateContainer = () => {
        setRefreshStateContainer((prev) => !prev)
    }
    const handleRefreshState = () => {
        setRefreshState((prev) => !prev)
    }

    return (
        <StatesContext.Provider
            value={{
                refreshStateContainer,
                setRefreshStateContainer,
                refreshState,
                setRefreshState,
                openStateOptionsModal,
                setOpenStateOptionsModal,
                openNewStateModal,
                setOpenNewStateModal,
                selectedState,
                setSelectedState,
                selectedCard,
                setSelectedCard,
                openAddCardModal,
                setOpenAddCardModal,
                openInfoCardModal,
                setOpenInfoCardModal,
                handleRefreshStateContainer,
                handleRefreshState
            }}
        >
            {children}
        </StatesContext.Provider>
    )
}