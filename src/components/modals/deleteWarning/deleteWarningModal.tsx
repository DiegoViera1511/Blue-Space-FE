import {Modal} from "../../common/modal/modal.tsx";
import {SimpleButton} from "../../common/simpleButton/simpleButton.tsx";

export interface DeleteWarningProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    objectName: string;
    objectType: string;
    handleDelete: () => void;
}

export function DeleteWarningModal({open, setOpen, objectName, objectType, handleDelete}: DeleteWarningProps) {

    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <div className={"flex flex-row items-center justify-center m-2"}>
                <div
                    className={" flex flex-col gap-4 p-3 rounded"}
                >
                    <div className={"bg-white rounded p-3"}>
                        <p>Delete "{objectName}" ?</p>
                        <p>Delete this {objectType} will also delete its data.</p>
                    </div>
                    <hr/>
                    <div
                        className={"flex flex-row gap-4 items-center justify-center"}
                    >
                        <SimpleButton
                            onClick={() => setOpen(false)}
                            text={"Cancel"}
                            cn={"bg-white"}
                        />
                        <SimpleButton
                            onClick={() => handleDelete()}
                            text={"Delete"}
                            cn={"bg-white text-red-500"}
                        />
                    </div>
                </div>
            </div>
        </Modal>


    )
}