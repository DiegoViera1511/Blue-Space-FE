import {useState} from "react";

interface useLocalStorageProps<T> {
    key: string;
    initialValue: T;
}

export function useLocalStorage<T>({key  , initialValue} : useLocalStorageProps<T>) {
    const [storedValue , setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue
        }catch (error){
            console.error(error)
        }
    });

    const setValue = (value : T) => {
        try {
            setStoredValue(value)
            window.localStorage.setItem(key , JSON.stringify(value))
        }catch (error){
            console.error(error)
        }
    }
    return [storedValue , setValue]
}