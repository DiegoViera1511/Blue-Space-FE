import {apiHost} from "../../../api/api.ts";
import {UserContext} from "../../../context/userContext.tsx";
import {defaultNotificationType, NotificationStateEnum, NotificationType} from "../../../types.ts";
import {Modal} from "../../common/modal/modal.tsx";
import {SimpleButton} from "../../common/simpleButton/simpleButton.tsx";
import {useContext, useEffect, useState} from "react";
import {UserContainer} from "../../userContainer/userContainer.tsx";
import {NotificationView} from "./notificationView.tsx";
import {httpRequest} from "../../../api";
import {dayFormatDate} from "../../../utils.ts";

interface NotificationsModalProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setNotificationsUnread: React.Dispatch<React.SetStateAction<boolean>>;
}

export function NotificationsModal({open, setOpen,setNotificationsUnread}: NotificationsModalProps) {
    const [notifications, setNotifications] = useState<NotificationType[]>([]);
    const [openNotification, setOpenNotification] = useState(false)
    const [selectedNotification, setSelectedNotification] = useState<NotificationType>(defaultNotificationType)
    const [refresh , setRefresh] = useState(false)
    const {user,socket} = useContext(UserContext);
    
    const handleClearAll = async () => {
        await httpRequest({
            url: `/notification/clearAll/${user}`,
            method:"DELETE"
        })
        setRefresh((prev) => !prev)
    }
    
    const handleOpenNotification = async (notification : NotificationType) => {
        if (notification.state === NotificationStateEnum.UNREAD){
            await httpRequest({
                url: `/notification/${notification.id}`,
                method: "PUT",
                data: {
                    state: NotificationStateEnum.READ
                }
            })
        }
        setSelectedNotification(notification);
        setRefresh((prev) => !prev);
        setOpenNotification(true);
    }
    
    useEffect(() => {
        if (socket){
            socket.on('notification',() => {
                setRefresh((prev) => !prev);
            })
        }
        fetch(apiHost + `/notification?receiver_id=${user}`)
            .then((response) => response.json())
            .then((data) => {
                setNotifications(data)
                const hasUnread = (data as NotificationType[]).some((notification) => notification.state === NotificationStateEnum.UNREAD)
                setNotificationsUnread(hasUnread);
            })
            .catch((error) => console.log(error));
        return () => {
            if (socket) socket.off('notification');
        }
    }, [refresh,socket]);
    
    return (
        <>
            <Modal open={open} onClose={() => setOpen(false)}>
                <div
                    className={
                        "flex flex-col p-5 bg-white gap-4 items-center justify-start text-sm w-[250px] h-[400px] sm:w-[500px] "
                    }
                >
                    <div className={"flex flex-row items-center justify-between w-full"}>
                        <p className={"text-xl sm:text-2xl font-bold"}>Notifications</p>
                        <SimpleButton
                            onClick={() => handleClearAll()}
                            text={"Clear all"}
                            cn={"hover:bg-gray-100"}
                        />
                    </div>
                    <div
                        className={"flex flex-col w-full h-full py-1 gap-2 overflow-y-auto [mask-image:linear-gradient(to_bottom,transparent_0%,white_2%,white_98%,transparent_100%)] items-start justify-start"}
                    >
                        {notifications.length > 0 ? (
                            notifications.map((notification) => (
                                <div
                                    className={"flex flex-row items-center w-full justify-start p-2 gap-4 bg-gray-100 rounded-lg"}
                                    key={notification.id}
                                    onClick={() => handleOpenNotification(notification)}
                                >
                                    <UserContainer name={notification.sender_id ?? "Blue Space"}/>
                                    <div className={"flex flex-col items-start justify-start truncate cursor-pointer"}>
                                        <div className={"flex flex-row items-center justify-start gap-2 w-full"}>
                                            <p 
                                                className={"text-xs text-gray-500 "}
                                            >
                                                {dayFormatDate(notification.date)}
                                            </p>
                                            {notification.state === NotificationStateEnum.UNREAD ? (
                                                <div 
                                                    className={"flex items-center justify-center w-2 h-2 bg-blue-500 rounded-full"}/>
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                        <p 
                                            className={"text-sm w-full md:text-md truncate"}
                                        >
                                            {notification.content}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className={"flex items-center justify-center h-full w-full"}>
                                <p className={"text-xl"}>No notifications !</p>
                            </div>
                        )}
                    </div>
                </div>
            </Modal>
            <NotificationView data={selectedNotification as NotificationType} open={openNotification} setOpen={setOpenNotification}/>
        </>

    );
}
