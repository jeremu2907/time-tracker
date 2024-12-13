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
    const CURRENT_CLOCK_STATUS_KEY = "CURRENT_CLOCK_STATUS_KEY";

    const clockButtonClicked = (name: string, mutator: React.Dispatch<React.SetStateAction<string>>) => {
        const timeT = getCurrentTime();
        mutator(timeT);
        localStorageUpdate(name, timeT);
    }

    const updateTime = (e: FormEvent<HTMLInputElement>, mutator: React.Dispatch<React.SetStateAction<string>>) => {
        mutator(e.currentTarget.value.trim());
        localStorageUpdate(e.currentTarget.name, e.currentTarget.value.trim());
    }

    const localStorageUpdate = (name: string, value: string) => {
        const dataT = {
            date: currentDate,
            startTime: startTime,
            endTime: endTime
        };

        const data = {...dataT, [name]: value};

        localStorage.setItem(CURRENT_CLOCK_STATUS_KEY, JSON.stringify(data));
        console.log("saved data");
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
        localStorage.removeItem(CURRENT_CLOCK_STATUS_KEY);
        console.log("removed local saved data");
        setTimeout(() => { window.location.reload() }, 3000);
    }

    const fetchLocalStorageData = () => {
        const localStorageData = JSON.parse(localStorage.getItem(CURRENT_CLOCK_STATUS_KEY) ?? '{}');

        if (!localStorageData.date) {
            console.log("no saved data");
            localStorage.removeItem(CURRENT_CLOCK_STATUS_KEY);
            return;
        }

        if (localStorageData.date !== standardDateToUSConvention(getCurrentDate())) {
            console.log("no saved data");
            localStorage.removeItem(CURRENT_CLOCK_STATUS_KEY);
            return;
        }

        console.log("found saved data")
        setStartTime(localStorageData.startTime);
        setEndTime(localStorageData.endTime);
    }

    useEffect(() => {
        fetchLocalStorageData();

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
                        name='startTime'
                        type='time'
                        value={startTime}
                        onChange={e => { updateTime(e, setStartTime) }}
                    />
                    <Button value='clock in' onClick={() => { clockButtonClicked('startTime', setStartTime) }} />
                </div>
                <div className='flex flex-col gap-12'>
                    <Input
                        name='endTime'
                        type='time'
                        value={endTime}
                        onChange={e => { updateTime(e, setEndTime) }}
                    />
                    <Button value='clock out' onClick={() => { clockButtonClicked('endTime', setEndTime) }} />
                </div>
            </div>
            <Button value='submit' onClick={submitButtonClicked} />
        </section>
    )
}

export default TimeTracker;
