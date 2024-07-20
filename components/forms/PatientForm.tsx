"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import CustomFormField from "./CustomFormField"

export enum FormFieldType {
  INPUT= 'input',
  TEXTAREA= 'textarea',
  PHONE_INPUT= 'phoneIput',
  CHECKBOX= 'checkbox',
  DATE_PICKER= 'datePicker',
  SELECT= 'select',
  SKELETON= 'skeleton'
}

const formSchema = z.object({
  fullname: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({ message: "Invalid Email " }),
  phone: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

const PatientForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      email: "",
      phone: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className='header'>Hi there, ...</h1>
          <p className='text-dark-700'>Get Started with Appointments.</p>
        </section>
        <CustomFormField 
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="fullname"
          label="Full name"
          placeholder="ex. Adam"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user-icon"
        />
        <CustomFormField 
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="email"
          label="Email address"
          placeholder="ex. john@example.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email-icon"
        />
        <CustomFormField 
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="phone"
          label="Phone number"
          placeholder="ex. 9876542273"
          iconSrc=""
          iconAlt=""
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default PatientForm