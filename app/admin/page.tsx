import StatCard from '@/components/StatCard'
import Image, { StaticImageData } from 'next/image'
import React from 'react'

const Admin = () => {

  return (
    <div className='m-2'>
        <header className='flex justify-between bg-black rounded-xl p-4'>
            <Image
                src={"/assets/icons/logo-full.svg"}
                height={1000}
                width={1000}
                alt="logo"
                className="h-8 w-fit"
            />
            Admin
        </header>

        <main className='m-6 space-y-8'>
            <section className='space-y-4'>
                <h1 className='header'>Welcome, Admin</h1>
                <p className='text-dark-700'>Start day with managing new appointments</p>
            </section>
            <section className='flex gap-4 justify-between'>
                <StatCard 
                    type='appointments'
                    icon="/assets/icons/appointments.svg"
                    count={0}
                    label="Total number of scheduled appointments"
                />
                <StatCard 
                    type='pending'
                    icon="/assets/icons/pending.svg"
                    count={0}
                    label="Total number of pending appointments"
                />
                <StatCard 
                    type='cancelled'
                    icon="/assets/icons/cancelled.svg"
                    count={0}
                    label="Total number of cancelled  appointments"
                />
            </section>
        </main>
    </div>
  )
}

export default Admin