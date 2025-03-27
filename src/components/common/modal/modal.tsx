import {X} from 'lucide-react';

interface ModalProps {
    open: boolean,
    onClose: () => void,
    children: React.ReactNode
}

export function Modal({open, onClose, children}: ModalProps) {
    return (
        <div onClick={onClose}
             className={`fixed inset-0 flex justify-center overflow-y-scroll transition-colors ${
                 open ? 'visible bg-black/20' : 'invisible'}`}
        >
            <div onClick={(e) => e.stopPropagation()}
                 className={`bg-white rounded-lg shadow p-6 transition-all mt-[10%] mb-[5%] h-fit items-center justify-center
                 ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}
            >
                <button onClick={onClose} className={"absolute top-2 hover:bg-gray-100 p-1 rounded-md right-2 w-fit h-fit"}>
                    <X/>
                </button>
                {children}
            </div>
        </div>
    )
}