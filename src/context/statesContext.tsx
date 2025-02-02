import {createContext, useState} from "react";
import {CardType, defaultCardType, defaultStateType, StateType} from "../types.ts";

interface StatesContextType {
    refreshState: boolean,
    setRefreshState: React.Dispatch<React.SetStateAction<boolean>>
    refreshStateContainer: boolean,
    setRefreshStateContainer: React.Dispatch<React.SetStateAction<boolean>>
    selectedState: StateType,
    setSelectedState: React.Dispatch<React.SetStateAction<StateType>>
    selectedCard: CardType,
    setSelectedCard: React.Dispatch<React.SetStateAction<CardType>>
    handleRefreshStateContainer: () => void
    handleRefreshState: () => void
}

export const StatesContext = createContext<StatesContextType>({} as StatesContextType);

export function StatesProvider({children}: { children: React.ReactNode }) {
    
    const [refreshState, setRefreshState] = useState(false)
    const [refreshStateContainer, setRefreshStateContainer] = useState(false)
    const [selectedState, setSelectedState] = useState<StateType>(defaultStateType)
    const [selectedCard, setSelectedCard] = useState<CardType>(defaultCardType)
    
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
                selectedState,
                setSelectedState,
                selectedCard,
                setSelectedCard,
                handleRefreshStateContainer,
                handleRefreshState
            }}
        >
            {children}
        </StatesContext.Provider>
    )
}