import React from 'react';
import Button from '../components/Button';
import Input from '../components/Input';

const TimeTracker: React.FC = () => {
    return (
        <section className='flex-[3] bg-baseLight h-auto w-full p-10 flex-col flex'>
            <h1>Time Tracker</h1>
            <h2 className='mt-40 mb-24 text-8xl font-semibold self-center'>
                Dec 9, 2024
            </h2>
            <div className='flex justify-evenly w-full'>
                <div className='flex flex-col gap-12'>
                    <Input
                        type='time'
                        onChange={() => console.log("hi")}
                    />
                    <Button value='clock in' onClick={() => console.log("hi")} />
                </div>
                <div className='flex flex-col gap-12'>
                    <Input
                        type='time'
                        onChange={() => console.log("hi")}
                    />
                    <Button value='clock out' onClick={() => console.log("hi")} />
                </div>
            </div>
        </section>
    )
}

export default TimeTracker;
