import React, { FormEvent, useEffect, useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import { getCurrentDate, getCurrentTime, standardDateToUSConvention } from '../utils';

const TimeTracker: React.FC = () => {
    const [currentDate, setCurrentDate] = useState<string>(standardDateToUSConvention(getCurrentDate()));
    const [startTime, setStartTime] = useState<string>("");
    const [endTime, setEndTime] = useState<string>("");

    const clockIn = (mutator: React.Dispatch<React.SetStateAction<string>>) => {
        mutator(getCurrentTime());
    }

    const updateTime = (e: FormEvent<HTMLInputElement>, mutator: React.Dispatch<React.SetStateAction<string>>) => {
        mutator(e.currentTarget.value);
    }

    useEffect(() => {
        setInterval(() => {
            setCurrentDate(standardDateToUSConvention(getCurrentDate()));
        }, 1000 * 60)
    }, [])

    return (
        <section className='flex-[3] bg-baseLight h-auto w-full p-10 flex-col flex'>
            <h1>Time Tracker</h1>
            <h2 className='mt-40 mb-24 text-8xl font-semibold self-center'>
                {currentDate}
            </h2>
            <div className='flex justify-evenly w-full'>
                <div className='flex flex-col gap-12'>
                    <Input
                        type='time'
                        value={startTime}
                        onChange={e => {updateTime(e, setStartTime)}}
                    />
                    <Button value='clock in' onClick={() => { clockIn(setStartTime)}} />
                </div>
                <div className='flex flex-col gap-12'>
                    <Input
                        type='time'
                        value={endTime}
                        onChange={e => {updateTime(e, setEndTime)}}
                    />
                    <Button value='clock out' onClick={() => { clockIn(setEndTime)}} />
                </div>
            </div>
        </section>
    )
}

export default TimeTracker;
