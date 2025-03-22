import {BaseModalProps, NotificationStateEnum, NotificationType} from "../../../types.ts";
import {Modal} from "../../common/modal/modal.tsx";
import {UserContainer} from "../../userContainer/userContainer.tsx";
import {fullFormatDate} from "../../../utils.ts";
import {SimpleButton} from "../../common/simpleButton/simpleButton.tsx";
import {httpRequest} from "../../../api";
import {InfoContainer2, InfoContainerProps2, InfoContainerTypes} from "../../common/infoContainer2/infoContainer2.tsx";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../../context/userContext.tsx";

interface NotificationViewProps extends BaseModalProps {
    data: NotificationType
    setRefreshNotifications: React.Dispatch<React.SetStateAction<boolean>>;
}

export function NotificationView({open,setOpen,data,setRefreshNotifications}: NotificationViewProps) {
    const [infoContainer, setInfoContainer] = useState<InfoContainerProps2 | null >(null)
    const {setRefreshProjects} = useContext(UserContext)
    
    const handleAcceptInvitation = async () => {
        if (data.invitation_project_id) {
            const response = await httpRequest({
                url: `/usersToProjects`,
                method: 'POST',
                data: {
                    username: data.receiver_id,
                    project_id: data.invitation_project_id
                }
            })
            if (response.status === 201) {
                setRefreshProjects((prev) => !prev)
                await httpRequest({
                    url:`/notification/${data.id}`,
                    method: 'PUT',
                    data: {
                        state: NotificationStateEnum.ACCEPTED
                    }
                })
            }
            setInfoContainer({
                info: "Invitation accepted",
                type: InfoContainerTypes.INFO
            })
            setRefreshNotifications((prev) => !prev)
        }
    }
    
    useEffect(() => {
        if (data.state === NotificationStateEnum.ACCEPTED) {
            setInfoContainer({
                info: "Invitation accepted",
                type: InfoContainerTypes.INFO
            })
        }else if (infoContainer) {
            setInfoContainer(null)
        }
    }, [data.state, open]);
    
    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <div className="flex flex-col max-w-56 sm:max-w-xl gap-2">
                <div className={"flex flex-col items-center justify-between overflow-clip w-full gap-4"}>
                    <div className={"flex flex-row items-center overflow-clip justify-start w-full gap-4"}>
                        <UserContainer name={data.sender_id ?? "Blue Space"}/>
                        <p className={"text-sm truncate "}>{data.sender_id ?? "Blue Space"}</p>
                    </div>
                    <p className={"text-nowrap text-sm overflow-clip w-full"}>{fullFormatDate(data.date)}</p>
                </div>
                <hr/>
                <div>
                    <p className={"flex w-full overflow-clip"}>{data.content}</p>
                </div>
                {data.invitation_project_id ?
                    (infoContainer ?
                            <InfoContainer2 info={infoContainer.info} type={infoContainer.type} cn={"w-fit"}/>
                            :
                            <div>
                                <SimpleButton
                                    onClick={() => handleAcceptInvitation()}
                                    text={"Accept"}
                                    cn={"text-sm hover:bg-gray-100"}
                                />
                            </div>
                    )
                    :
                    <></>
                }
            </div>
        </Modal>
    )
}