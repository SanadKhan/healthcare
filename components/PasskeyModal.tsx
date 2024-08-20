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
import { encryptKey } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

const PasskeyModal = ({ isAdminModal }: { isAdminModal : boolean }) => {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [passkey, setPasskey] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        setIsOpen(isAdminModal)
    },[])

    const handleOnClickAdmin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
        e.preventDefault();
        console.log("values", passkey)
        if(passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
            const encryptedKey = encryptKey(passkey)
            console.log("encrypt", encryptedKey)
        }   
        setError("Invalid passkey, please try again!")
    }

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
                        <InputOTPGroup className="shad-otp ">
                            <InputOTPSlot className="shad-otp-slot" index={0} />
                            <InputOTPSlot className="shad-otp-slot" index={1} />
                            <InputOTPSlot className="shad-otp-slot" index={2} />
                            <InputOTPSlot className="shad-otp-slot" index={3} />
                            <InputOTPSlot className="shad-otp-slot" index={4} />
                            <InputOTPSlot className="shad-otp-slot" index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                    { error && (
                        <p className="shad-error text-14-regular mt-4 flex justify-center ">
                            {error}
                        </p>
                    )}
                </div>
                <AlertDialogFooter>
                    <AlertDialogAction className="shad-primary-btn w-full" onClick={handleOnClickAdmin}>
                        Enter Admin Panel
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default PasskeyModal