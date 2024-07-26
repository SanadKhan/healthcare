"use client"

import { createUser } from '@/lib/actions/patient.actions';
import { UserFormValidation } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '../ui/form';
import CustomFormField from './CustomFormField';
import { FormFieldType } from './PatientForm';
import SubmitButton from '../SubmitButton';

const RegisterForm = ({ user }: { user: User }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const router = useRouter();

    const form = useForm<z.infer<typeof UserFormValidation>>({
        resolver: zodResolver(UserFormValidation),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
        },
    })

    async function onSubmit({ name, email, phone }: z.infer<typeof UserFormValidation>) {
        setIsLoading(true)
        try {
            const userData = { name, email, phone }
            const user = await createUser(userData)
            if (user) router.push(`/patients/${user.$id}/register`)
        } catch (error) {
            console.log(error)
        }
        setIsLoading(false);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
                <section className="mb-12 space-y-4">
                    <h1 className='header'>Welcome 👋</h1>
                    <p className='text-dark-700'>Let us know more about yourself</p>
                </section>
                <section className='space-y-4'>
                    <h3 className='sub-header'>Personal Information</h3>
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.INPUT}
                        name="name"
                        label="Full name"
                        placeholder="ex. Adam"
                        iconSrc="/assets/icons/user.svg"
                        iconAlt="user"
                    />
                    <div className='flex space-x-4'>

                        <CustomFormField
                            control={form.control}
                            fieldType={FormFieldType.INPUT}
                            name="email"
                            label="Email address"
                            placeholder="ex. john@example.com"
                            iconSrc="/assets/icons/email.svg"
                            iconAlt="email"
                        />
                        <CustomFormField
                            control={form.control}
                            fieldType={FormFieldType.PHONE_INPUT}
                            name="phone"
                            label="Phone number"
                            placeholder="ex. 9876542273"
                            iconSrc="/assets/icons/phone.svg"
                            iconAlt="phone"
                        />
                    </div>
                    <div className='flex space-x-4'>

                        <CustomFormField
                            control={form.control}
                            fieldType={FormFieldType.INPUT}
                            name="address"
                            label="Address"
                            placeholder="ex. 141 Downtown, CA"
                            // iconSrc="/assets/icons/email.svg"
                            // iconAlt="email"
                        />
                        <CustomFormField
                            control={form.control}
                            fieldType={FormFieldType.INPUT}
                            name="occupation"
                            label="Occupation"
                            placeholder="ex. Teacher"
                            // iconSrc="/assets/icons/phone.svg"
                            // iconAlt="phone"
                        />
                    </div>
                    <div className='flex space-x-4'>

                        <CustomFormField
                            control={form.control}
                            fieldType={FormFieldType.INPUT}
                            name="emergencyContactName"
                            label="Emergency contact name"
                            placeholder="ex. Guardian’s name"
                            // iconSrc="/assets/icons/email.svg"
                            // iconAlt="email"
                        />
                        <CustomFormField
                            control={form.control}
                            fieldType={FormFieldType.PHONE_INPUT}
                            name="emergencyContactNumber"
                            label="Phone number"
                            placeholder="ex. 9876542273"
                            iconSrc="/assets/icons/phone.svg"
                            iconAlt="phone"
                        />
                    </div>
                </section>

                <section className='space-y-4'>
                    <h3 className='sub-header'>Medical Information</h3>
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.INPUT}
                        name="name"
                        label="Full name"
                        placeholder="ex. Adam"
                        iconSrc="/assets/icons/user.svg"
                        iconAlt="user"
                    />
                    <div className='flex space-x-4'>

                        <CustomFormField
                            control={form.control}
                            fieldType={FormFieldType.INPUT}
                            name="insuranceProvider"
                            label="Insurance provider "
                            placeholder="ex: BlueCross"
                            // iconSrc="/assets/icons/email.svg"
                            // iconAlt="email"
                        />
                        <CustomFormField
                            control={form.control}
                            fieldType={FormFieldType.INPUT}
                            name="insurancePolicyNumber"
                            label="Insurance policy number"
                            placeholder="ex: ABC1234567"
                            // iconSrc="/assets/icons/phone.svg"
                            // iconAlt="phone"
                        />
                    </div>
                    <div className='flex space-x-4'>

                        <CustomFormField
                            control={form.control}
                            fieldType={FormFieldType.TEXTAREA}
                            name="allergies"
                            label="Allergies (if any)"
                            placeholder="ex: Peanuts, Penicillin, Pollen"
                            // iconSrc="/assets/icons/email.svg"
                            // iconAlt="email"
                        />
                        <CustomFormField
                            control={form.control}
                            fieldType={FormFieldType.TEXTAREA}
                            name="currentMedication"
                            label="Current medications"
                            placeholder="ex: Ibuprofen 200mg, Levothyroxine 50mcgr"
                            // iconSrc="/assets/icons/phone.svg"
                            // iconAlt="phone"
                        />
                    </div>
                    <div className='flex space-x-4'>

                        <CustomFormField
                            control={form.control}
                            fieldType={FormFieldType.TEXTAREA}
                            name="familyMedicalHistory"
                            label="Family medical history (if relevant)"
                            placeholder="ex: Mother had breast cancer"
                            // iconSrc="/assets/icons/email.svg"
                            // iconAlt="email"
                        />
                        <CustomFormField
                            control={form.control}
                            fieldType={FormFieldType.TEXTAREA}
                            name="pastMedicalHistory"
                            label="Past medical history"
                            placeholder="ex: Asthma diagnosis in childhood"
                            // iconSrc="/assets/icons/phone.svg"
                            // iconAlt="phone"
                        />
                    </div>
                </section>

                <SubmitButton isLoading={isLoading}> Submit and continue </SubmitButton>
            </form>
        </Form>
    )
}

export default RegisterForm