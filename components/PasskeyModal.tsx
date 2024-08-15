"use client"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog"

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
  } from "@/components/ui/input-otp"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

const PasskeyModal = ({ isAdminModal }: { isAdminModal : boolean }) => {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [passkey, setPasskey] = useState();
    useEffect(() => {
        setIsOpen(isAdminModal)
    },[])

    const closeModal = () => {
        setIsOpen(false)
        router.push('/')
    }

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent className="shad-alert-dialog">
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-start justify-between">
                        Admin Access Verification
                        <Image 
                            src="/assets/icons/close.svg"
                            alt="close"
                            width={20}
                            height={20}
                            onClick={closeModal}
                            className="cursor-pointer"
                        />
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        To access the admin page, please enter passkey.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div>
                    <InputOTP maxLength={6} value={passkey} onChange={(value) => setPasskey(value as any)}>
                        <InputOTPGroup className="me-shad-input-group">
                            <InputOTPSlot className="me-shad-input-slot" index={0} />
                            <InputOTPSlot className="me-shad-input-slot" index={1} />
                            <InputOTPSlot className="me-shad-input-slot" index={2} />
                            <InputOTPSlot className="me-shad-input-slot" index={3} />
                            <InputOTPSlot className="me-shad-input-slot" index={4} />
                            <InputOTPSlot className="me-shad-input-slot" index={5} />
                        </InputOTPGroup>
                        {/* <InputOTPGroup>
                            <InputOTPSlot className="me-shad-input-slot" index={3} />
                            <InputOTPSlot className="me-shad-input-slot" index={4} />
                            <InputOTPSlot className="me-shad-input-slot" index={5} />
                        </InputOTPGroup> */}
                    </InputOTP>
                </div>
                <AlertDialogFooter>
                    <AlertDialogAction className="bg-green-500 w-full">Enter Admin Panel</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default PasskeyModal