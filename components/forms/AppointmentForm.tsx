"use client"

import { CreateAppointmentSchema } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const AppointmentForm = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const router = useRouter();

    const form = useForm<z.infer<typeof CreateAppointmentSchema>>({
        resolver: zodResolver(CreateAppointmentSchema),
        defaultValues: {
            primaryPhysician: "",
            schedule: new Date(Date.now()),
            reason: "",
            note: "",
            cancellationReason: "",
        },
    })

    async function onSubmit(values: z.infer<typeof CreateAppointmentSchema>) {
        setIsLoading(true)
        console.log("submit values",values );
        
        // let formData
        // if (values.identificationDocument && values.identificationDocument?.length > 0) {
        //     const blobFile = new Blob([values.identificationDocument[0]], {
        //         type: values.identificationDocument[0].type
        //     })
            
        //     formData = new FormData()
        //     formData.append('blobFile', blobFile)
        //     formData.append('fileName', values.identificationDocument[0].name)
        // }
        try {
            const appointmentData = {
                ...values,
                birthDate: new Date(values.schedule),
            }
            console.log("patietn data", appointmentData);
            // regsiter patient
            // const newAppointment = await registerPatient(appointmentData)
            // if (newAppointment) router.push(`/patients/${user.$id}/new-appointment`)
        } catch (error) {
            console.log(error)
        }
        setIsLoading(false);
    }
  return (
    <div>AppointmentForm</div>
  )
}

export default AppointmentForm