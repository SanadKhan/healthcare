"use client"

import { getAppointmentSchema } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '../ui/form';
import CustomFormField from '../CustomFormField';
import { FormFieldType } from './PatientForm';
import { Doctors } from '@/constants';
import { SelectItem } from '../ui/select';
import Image from 'next/image';
import SubmitButton from '../SubmitButton';
import { createAppointment } from '@/lib/actions/appointment.action';

const AppointmentForm = ({
    type, userId, patientId
}: {
    type: "create" | "cancel" | "schedule";
    userId: string;
    patientId: string
}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const router = useRouter();

    const AppointmentFormValidation  = getAppointmentSchema(type)

    const form = useForm<z.infer<typeof AppointmentFormValidation>>({
        resolver: zodResolver(AppointmentFormValidation),
        defaultValues: {
            primaryPhysician: "",
            schedule: new Date(Date.now()),
            reason: "",
            note: "",
            cancellationReason: "",
        },
    })

    async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
        setIsLoading(true);

        let status;
        switch (type) {
            case 'schedule':
                status = 'schedule'
                break;
            case 'cancel':
                status = 'cancelled'
                break;
            default:
                status = 'pending'
                break;
        }
        try {
            if(type==='create' && patientId){
                const appointmentData = {
                    userId,
                    patient: patientId,
                    primaryPhysician: values.primaryPhysician,
                    schedule: new Date(values.schedule),
                    reason: values.reason!,
                    note: values.note,
                    status: status as Status
                }
                const  appointment= await createAppointment(appointmentData)
                console.log("data",appointment);
                
                if(appointment) {
                    form.reset();
                    router.push(`/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`)
                }
            }
        } catch (error) {
            console.log(error)
        }
        setIsLoading(false);
    }

    let buttonLabel;

    switch (type) {
        case 'create':
            buttonLabel = 'Create Appointment'    
            break;
        case 'cancel':
            buttonLabel = 'Cancel Appointment'    
            break;
        case 'schedule':
            buttonLabel = 'Schedule Appointment'    
            break;
        default:
            break;
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-12 flex-1">
                <section className="space-y-4">
                    <h1 className='header'>Hey there 👋</h1>
                    <p className='text-dark-700'>Request a new appointment in 10 seconds</p>
                </section>

                {type !== "cancel" && (
                    <>
                        <CustomFormField
                            control={form.control}
                            fieldType={FormFieldType.SELECT}
                            name="primaryPhysician"
                            label="Doctor"
                            placeholder="Select a doctor"
                        >
                            {Doctors.map((doctor) => (
                                <SelectItem key={doctor.name} value={doctor.name}>
                                    <div className='flex cursor-pointer items-center gap-2'>
                                        <Image
                                            src={doctor.image}
                                            height={24}
                                            width={24}
                                            alt={doctor.name}
                                            className='rounded-full border border-dark-500'
                                        />
                                        <p>{doctor.name}</p>
                                    </div>
                                </SelectItem>
                            ))}
                        </CustomFormField>
                        <div className='flex flex-col gap-6 xl:flex-row'>
                            <CustomFormField
                                control={form.control}
                                fieldType={FormFieldType.TEXTAREA}
                                name="reason"
                                label="Reason for appointment "
                                placeholder="ex: Annual montly check-up"
                            />
                            <CustomFormField
                                control={form.control}
                                fieldType={FormFieldType.TEXTAREA}
                                name="notes"
                                label="Additional comments/notes"
                                placeholder="ex: Prefer afternoon appointments, if possible"
                            />
                        </div>
                        <CustomFormField
                            control={form.control}
                            fieldType={FormFieldType.DATE_PICKER}
                            name="schedule"
                            label="Expected appointment date"
                            showTimeSelect
                            dateFormat='MM/dd/yyyy - hh:mm aa'
                        />
                    </>
                )}
                {type === 'cancel' && (
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.TEXTAREA}
                        name="cancellationReason"
                        label="Reason for cancellation"
                        placeholder="ex: Urgent meeting came up"
                    />
                )}
                <SubmitButton
                    isLoading={isLoading}
                    className={`${type === 'cancel' ? 'shad-danger-btn' : 'shad-primary-btn'} w-full`}
                >
                    {buttonLabel}
                </SubmitButton>
            </form>
        </Form>
    )
}

export default AppointmentForm