import React, { FormEvent, useEffect, useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import { getCurrentDate, getCurrentTime, standardDateToUSConvention } from '../utils';
import axios from 'axios';
import { ENDPOINT } from '../config';
import { toast } from 'react-toastify';

const TimeTracker: React.FC = () => {
    const [currentDate, setCurrentDate] = useState<string>(standardDateToUSConvention(getCurrentDate()));
    const [startTime, setStartTime] = useState<string>("");
    const [endTime, setEndTime] = useState<string>("");

    const clockButtonClicked = (mutator: React.Dispatch<React.SetStateAction<string>>) => {
        mutator(getCurrentTime());
    }

    const updateTime = (e: FormEvent<HTMLInputElement>, mutator: React.Dispatch<React.SetStateAction<string>>) => {
        mutator(e.currentTarget.value.trim());
    }

    const submitButtonClicked = async () => {
        if (startTime === '') {
            toast('Not clocked in');
            return;
        }

        const data = {
            date: getCurrentDate(),
            startTime: startTime,
            endTime: endTime
        };

        await axios.post(
            `${ENDPOINT}/post`,
            data
        )

        toast.success("Submitted time entry");
        setTimeout(() => {window.location.reload()}, 3000);
    }

    useEffect(() => {
        setInterval(() => {
            setCurrentDate(standardDateToUSConvention(getCurrentDate()));
        }, 1000 * 60)
    }, [])

    return (
        <section className='flex-[3] bg-baseLight h-auto w-full p-10 flex-col flex overflow-y-auto'>
            <h1>Time Tracker</h1>
            <h2 className='mt-32 mb-20 text-8xl font-semibold self-center'>
                {currentDate}
            </h2>
            <div className='flex justify-evenly w-full mb-20'>
                <div className='flex flex-col gap-12'>
                    <Input
                        type='time'
                        value={startTime}
                        onChange={e => { updateTime(e, setStartTime) }}
                    />
                    <Button value='clock in' onClick={() => { clockButtonClicked(setStartTime) }} />
                </div>
                <div className='flex flex-col gap-12'>
                    <Input
                        type='time'
                        value={endTime}
                        onChange={e => { updateTime(e, setEndTime) }}
                    />
                    <Button value='clock out' onClick={() => { clockButtonClicked(setEndTime) }} />
                </div>
            </div>
            <Button value='submit' onClick={submitButtonClicked} />
        </section>
    )
}

export default TimeTracker;
