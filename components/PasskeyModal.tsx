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
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                </div>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default PasskeyModal