"use client"

import { Label } from "@/hooks/use-modal-store";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "../ui/dialog"
import { useModal } from "@/hooks/use-modal-store"


export const InviteModal = () => {
    const{isOpen,onClose,type}=useModal();

   
    const isModalOpen = isOpen && type === "invite"

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="font-bold text-2xl text-center">
                        Invite People
                    </DialogTitle>
                    
                </DialogHeader>
               <div className="p-6">
                <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70  ">
                    Server Invite Link
                </Label>
               </div>
            </DialogContent>
        </Dialog>
    )
}