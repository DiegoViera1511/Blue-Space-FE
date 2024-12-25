import { EllipsisVertical } from 'lucide-react';
import {Plus} from "lucide-react";
import {Card} from "../Card/card.tsx";
import {useContext} from "react";
import {UserContext} from "../../context/userContext.tsx";

interface StateProps{
    title:string
}

export function State({title} : StateProps){
    const {
        setOpenStateOptionsModal,
        setOpenAddCardModal
    } = useContext(UserContext)
    return(
        <div
            className="flex flex-col min-w-[75%] max-w-[75%] md:min-w-[20%] md:max-w-[20%] min-h-[20%] rounded-lg h-fit px-1 py-1 m-3 bg-gray-100
            shadow-lg">
            <div className="flex flex-row justify-between text-ellipsis overflow-hidden px-3 py-2">
                <p className="font-bold">{title}</p>
                <button onClick={() => setOpenStateOptionsModal(true)}>
                    <EllipsisVertical/>
                </button>
            </div>
            <hr className="border-t border-gray-400 mt-2"/>
            <div className={"flex flex-col"}>
                <div className="flex flex-col mt-2 mb-2 max-h-[500px] md:max-h-[530px] overflow-y-auto items-center gap-4">
                    <Card title={"Crear repositorio de Git Hub"}/>
                    <Card title={"Crear repositorio de Git Hub"}/>
                    <Card title={"Crear repositorio de Git Hub"}/>
                    <Card title={"Crear repositorio de Git Hub"}/>

                </div>
                <button className={"m-5 w-fit h-fit"} onClick={() => setOpenAddCardModal(true)}>
                    <Plus/>
                </button>
            </div>


        </div>
    )
}