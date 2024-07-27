import React from 'react'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from '../ui/input'
import { Textarea } from "@/components/ui/textarea"
import { Control } from 'react-hook-form'
import { FormFieldType } from './PatientForm'
import Image from 'next/image'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { Checkbox } from '../ui/checkbox'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Select, SelectContent, SelectTrigger, SelectValue } from '../ui/select'


type CustomProps = {
    control: Control<any>;
    fieldType: string;
    name: string;
    label?: string;
    placeholder?: string;
    iconSrc?: string;
    iconAlt?: string;
    disabled?: boolean;
    dateFormat?: string;
    showTimeSelect?: boolean;
    children?: React.ReactNode;
    renderSkeleton?: (field: any) => React.ReactNode,
}

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
    const { placeholder, fieldType, iconSrc, iconAlt, showTimeSelect, dateFormat, renderSkeleton } = props

    switch (fieldType) {
        case FormFieldType.INPUT:
            return (
                <div className='flex rounded-md border border-dark-500 bg-dark-400'>
                    {iconSrc && (
                        <Image
                            src={iconSrc}
                            alt={iconAlt || 'icon'}
                            height={24}
                            width={24}
                            className='ml-2'
                        />
                    )}
                    <FormControl>
                        <Input
                            placeholder={placeholder}
                            {...field}
                            className='shad-input border-0'
                        />
                    </FormControl>
                </div>
            )
        case FormFieldType.PHONE_INPUT:
            return (
                <FormControl>
                    <PhoneInput
                        defaultCountry='IN'
                        placeholder={placeholder}
                        {...field}
                        international
                        className='input-phone'
                    />
                </FormControl>
            )
        case FormFieldType.DATE_PICKER:
            return (
                <div className='flex rounded-md border border-dark-500 bg-dark-400'>
                    <Image
                        src={"/assets/icons/calendar.svg"}
                        height={24}
                        width={24}
                        alt='calendar'
                        className='ml-2'
                    />
                    <FormControl>
                        <DatePicker
                            selected={field.value}
                            onChange={(date) => field.onChange(date)}
                            dateFormat={dateFormat ?? 'MM/dd/yyyy'}
                            showTimeSelect={showTimeSelect ?? false}
                            timeInputLabel='Time:'
                            wrapperClassName='date-picker'
                        />
                    </FormControl>
                </div>
            )
        case FormFieldType.SKELETON:
            return renderSkeleton ? renderSkeleton(field) : null
        case FormFieldType.SELECT:
            return (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                        <SelectTrigger className='shad-select-trigger'>
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent className='shad-select-content'>
                        {props.children}
                    </SelectContent>
                </Select>
            )
        case FormFieldType.TEXTAREA:
            return (
                <FormControl>
                    <Textarea
                        placeholder={placeholder}
                    />
                </FormControl>
            )
        case FormFieldType.CHECKBOX:
            return (
                <div className="flex items-center space-x-2">
                    <FormControl>
                        <Checkbox id="terms" />
                        <label htmlFor="terms">

                            {placeholder}
                        </label>
                    </FormControl>
                </div>
            )
        default:
            break;
    }

}

const CustomFormField = (props: CustomProps) => {
    const { control, name, label, fieldType } = props
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className='flex-1'>
                    {fieldType !== FormFieldType.CHECKBOX && label && (
                        <FormLabel>{label}</FormLabel>
                    )}
                    <RenderField field={field} props={props} />

                    <FormMessage className='shad-error' />
                </FormItem>
            )}
        />
    )
}

export default CustomFormField