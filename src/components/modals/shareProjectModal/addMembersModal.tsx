import {BaseModalProps, NotificationEnum, NotificationStateEnum} from "../../../types.ts";
import {Modal} from "../../common/modal/modal.tsx";
import {Search} from "lucide-react"
import {SimpleButton} from "../../common/simpleButton/simpleButton.tsx";
import {httpRequest} from "../../../api";
import {useContext, useEffect, useState} from "react";
import {InfoContainer2, InfoContainerProps2, InfoContainerTypes} from "../../common/infoContainer2/infoContainer2.tsx";
import {UserContext} from "../../../context/userContext.tsx";

export function AddMembersModal({open , setOpen} : BaseModalProps) {
    const {selectedProject , user} = useContext(UserContext)
    const [inputValue, setInputValue] = useState('')
    const [message, setMessage] = useState<InfoContainerProps2 | null>(null)
    const handleSendInvitation = async () => {
        const userFound = await httpRequest({
            url: `/user/${inputValue}`,
            method: 'GET'
        })
        if (userFound.status === 404) {
            setMessage({info: `User ${inputValue} do not exist` , type: InfoContainerTypes.ERROR})
            return
        }
        const userToProjectFound = await httpRequest({
            url:`/usersToProjects/${inputValue}/${selectedProject.id}`,
            method: 'GET'
        })
        if (userToProjectFound.status === 200) {
            setMessage({info: `User ${inputValue} is already in the project` , type: InfoContainerTypes.INFO})
            return
        }else if (userToProjectFound.status === 404) {
            const notification = await httpRequest({
                url: '/notification',
                method: 'POST',
                data: {
                    sender_id: user,
                    receiver_id: inputValue,
                    content: `Hello!, you have been invited to join the project ${selectedProject.name}`,
                    invitation_project_id: selectedProject.id,
                    type: NotificationEnum.INVITATION,
                    state: NotificationStateEnum.UNREAD
                }
            })
            if (notification.status === 201){
                setMessage({info: `Invitation sent to ${inputValue}` , type: InfoContainerTypes.SUCCESS})
            }
            //TODO web socket implementation
        }
        
    }
    useEffect(() => {
        setMessage(null)
    }, [open]);
    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <div className={"flex flex-col gap-4 p-2"}>
                <p className={"text-xl font-bold"}>Send Invitation</p>

                {message ? <InfoContainer2 info={message?.info} type={message?.type} /> : <></>}
                <div className={"flex flex-row gap-2 items-center p-2 justify-start rounded-full bg-gray-100"}>
                    <Search/>
                    <input 
                        className={"w-48 sm:w-96 bg-gray-100 outline-none"}
                        placeholder={"username"}
                        value={inputValue}
                        onChange={(e) => {
                                setInputValue(e.target.value)
                                setMessage(null)
                            }
                        }
                    />
                </div>
                <div className={"flex flex-row gap-4 items-center justify-center"}>
                    <SimpleButton 
                        onClick={() => setOpen(false)} 
                        text={"Cancel"}
                        cn={"hover:bg-gray-100"}
                    />
                    <SimpleButton
                        onClick={() => handleSendInvitation()}
                        text={"Send"}
                        cn={"hover:bg-gray-100"}
                    />
                </div>
            </div>
        </Modal>
    )
}