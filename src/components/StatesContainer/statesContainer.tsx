import {State} from "../State/state.tsx";
import {Plus} from "lucide-react";
export function StatesContainer(){
    return (
        <div className="flex flex-row mt-12 overflow-x-auto w-full h-[85%] ">
            <State title={"Backlog"}/>
            <State title={"Ready"}/>
            <State title={"Developing"}/>
            <State title={"Testing"}/>
            <State title={"Testing"}/>
            <State title={"Testing"}/>
            <State title={"Testing"}/>
            <State title={"Testing"}/>
            <State title={"Testing"}/>
            <State title={"Testing"}/>
            <State title={"Testing"}/>
            <State title={"Testing"}/>
            <div className="flex items-center w-full">
                <div
                    className="flex items-center justify-center rounded-full 
                    mx-4 w-16 h-16 bg-gray-100 hover:bg-gray-400 transition-colors duration-200
                    shadow-lg cursor-pointer"
                    onClick={() => alert("Developing")}
                >
                    <Plus/>
                </div>
            </div>
        </div>
    )
}