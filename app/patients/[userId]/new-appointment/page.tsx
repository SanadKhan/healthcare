import AppointmentForm from '@/components/forms/AppointmentForm'
import { getPatient, getUser } from '@/lib/actions/patient.actions'
import Image from 'next/image'
import React from 'react'

const NewAppointment = async({ params: { userId }}: SearchParamProps) => {
    const patient = await getPatient(userId)
    return (
        <div className="flex h-screen max-h-screen">
            <section className="remove-scrollbar container">
                <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
                    <Image
                        src={"/assets/icons/logo-full.svg"}
                        height={1000}
                        width={1000}
                        alt="logo"
                        className="mb-12 h-10 w-fit"
                    />
                    {/* <RegisterForm user={user} /> */}
                    <AppointmentForm 
                        type="create"
                        userId={userId}
                        patientId={patient.$id}
                    />
                        
                    <p className="copyright py-10">© 2024 CarePulse</p>
                </div>
            </section>
            <Image
                src={"/assets/images/appointment-img.png"}
                height={1000}
                width={1000}
                alt="register"
                className="side-img max-w-[390px]"
            />
        </div>
    )
}


export default NewAppointment