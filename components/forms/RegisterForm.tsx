"use client"

import { createUser } from '@/lib/actions/patient.actions';
import { UserFormValidation } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl } from '../ui/form';
import CustomFormField from './CustomFormField';
import { FormFieldType } from './PatientForm';
import SubmitButton from '../SubmitButton';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Doctors, GenderOptions } from '@/constants';
import { Label } from '../ui/label';
import { SelectItem } from '../ui/select';
import Image from 'next/image';

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
            <form onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-12 flex-1">
                <section className="space-y-4">
                    <h1 className='header'>Welcome 👋</h1>
                    <p className='text-dark-700'>Let us know more about yourself</p>
                </section>
                <section className='space-y-6'>
                    <div className='mb-9 space-y-1'>
                        <h2 className='sub-header'>Personal Information</h2>
                    </div>
                    {/* User */}
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.INPUT}
                        name="name"
                        label="Full name"
                        placeholder="ex. Adam"
                        iconSrc="/assets/icons/user.svg"
                        iconAlt="user"
                    />
                    {/* Email and Phone number */}
                    <div className='flex flex-col gap-6 xl:flex-row'>
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
                    {/* Date and Gender */}
                    <div className='flex flex-col gap-6 xl:flex-row'>
                        <CustomFormField
                            control={form.control}
                            fieldType={FormFieldType.DATE_PICKER}
                            name="birthDate"
                            label="Date of Birth"
                        />
                        <CustomFormField
                            control={form.control}
                            fieldType={FormFieldType.SKELETON}
                            name="gender"
                            label="Gender"
                            renderSkeleton={(field) => (
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className='flex h-11 gap-6 xl:justify-between'
                                    >
                                        {GenderOptions.map((option) => (
                                            <div key={option} className='radio-group'>
                                                <RadioGroupItem value={option} id={option} />
                                                <Label htmlFor={option} className='cursor-pointer'>
                                                    {option}
                                                </Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                            )}
                        />
                    </div>
                    {/* Address and Occupation */}
                    <div className='flex flex-col gap-6 xl:flex-row'>
                        <CustomFormField
                            control={form.control}
                            fieldType={FormFieldType.INPUT}
                            name="address"
                            label="Address"
                            placeholder="ex. 141 Downtown, CA"
                        />
                        <CustomFormField
                            control={form.control}
                            fieldType={FormFieldType.INPUT}
                            name="occupation"
                            label="Occupation"
                            placeholder="ex. Teacher"
                        />
                    </div>
                    {/* Emergency contact name and number */}
                    <div className='flex flex-col gap-6 xl:flex-row'>
                        <CustomFormField
                            control={form.control}
                            fieldType={FormFieldType.INPUT}
                            name="emergencyContactName"
                            label="Emergency contact name"
                            placeholder="ex. Guardian’s name"
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
                <section className='space-y-6'>
                    <div className='mb-9 space-y-1'>
                        <h2 className='sub-header'>Medical Information</h2>
                    </div>
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.SELECT}
                        name="primaryPhysician"
                        label="Primary Physician"
                        placeholder="Select a physician"
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
                            fieldType={FormFieldType.INPUT}
                            name="insuranceProvider"
                            label="Insurance provider "
                            placeholder="ex: BlueCross"
                        />
                        <CustomFormField
                            control={form.control}
                            fieldType={FormFieldType.INPUT}
                            name="insurancePolicyNumber"
                            label="Insurance policy number"
                            placeholder="ex: ABC1234567"
                        />
                    </div>
                    <div className='flex flex-col gap-6 xl:flex-row'>
                        <CustomFormField
                            control={form.control}
                            fieldType={FormFieldType.TEXTAREA}
                            name="allergies"
                            label="Allergies (if any)"
                            placeholder="ex: Peanuts, Penicillin, Pollen"
                        />
                        <CustomFormField
                            control={form.control}
                            fieldType={FormFieldType.TEXTAREA}
                            name="currentMedication"
                            label="Current medications"
                            placeholder="ex: Ibuprofen 200mg, Levothyroxine 50mcgr"
                        />
                    </div>
                    <div className='flex flex-col gap-6 xl:flex-row'>
                        <CustomFormField
                            control={form.control}
                            fieldType={FormFieldType.TEXTAREA}
                            name="familyMedicalHistory"
                            label="Family medical history (if relevant)"
                            placeholder="ex: Mother had breast cancer"
                        />
                        <CustomFormField
                            control={form.control}
                            fieldType={FormFieldType.TEXTAREA}
                            name="pastMedicalHistory"
                            label="Past medical history"
                            placeholder="ex: Asthma diagnosis in childhood"
                        />
                    </div>
                </section>

                <section className='space-y-6'>
                    <div className='mb-9 space-y-1'>
                        <h2 className='sub-header'>Identification and Verification</h2>
                    </div>
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.SELECT}
                        name="identificationType"
                        label="Full name"
                        placeholder="ex. Adam"
                        iconSrc="/assets/icons/user.svg"
                        iconAlt="user"
                    />
                    <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.INPUT}
                        name="identificationNumber"
                        label="Identification Number"
                        placeholder="ex 1234567"
                    />
                </section>

                <section className='space-y-6'>
                    <div className='mb-9 space-y-1'>
                        <h2 className='sub-header'>Consent and Privacy</h2>
                    </div>
                    {/* <CustomFormField
                        control={form.control}
                        fieldType={FormFieldType.CHECKBOX}
                        name="privacyConsent"
                        label="I consent to receive treatment for my health condition."
                        iconSrc="/assets/icons/user.svg"
                        iconAlt="user"
                    /> */}
                    {/* <div className='flex space-x-4'>

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
                    </div> */}
                </section>

                <SubmitButton isLoading={isLoading}> Submit and continue </SubmitButton>
            </form>
        </Form>
    )
}

export default RegisterForm