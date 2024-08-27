import Image from 'next/image';
import React from 'react'

type StatCardProps = {
    icon: string;
    count: number;
    label: string;
}

const StatCard: React.FC<StatCardProps> = ({
    icon,
    count,
    label
}) => {
  return (
    <div className='p-4 bg-black space-y-4 rounded-lg w-full'>
        <div className='flex gap-2'>
            <Image
                src={icon}
                alt='appointment-icon'
                height={400}
                width={400}
                className='h-6 w-fit'
            />
            <span>{count}</span>
        </div>
        <p>{label}</p>
    </div>
  )
}

export default StatCard