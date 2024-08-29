import clsx from 'clsx';
import Image from 'next/image';
import React from 'react'

type StatCardProps = {
    type: 'pending'|'appointments'|'cancelled';
    icon: string;
    count: number;
    label: string;
}

const StatCard: React.FC<StatCardProps> = ({
    type,
    icon,
    count,
    label
}) => {
  return (
    <div className={clsx('stat-card', {
        'bg-appointments': type === 'appointments',
        'bg-pending': type === 'pending',
        'bg-cancelled': type === 'cancelled'
    } )}>
        <div className='flex items-center gap-2'>
            <Image
                src={icon}
                alt={label}
                height={32}
                width={32}
                className='h-8 w-fit'
            />
            <h2 className='text-32-bold'>{count}</h2>
        </div>
        <p className='text-14-regular'>{label}</p>
    </div>
  )
}

export default StatCard