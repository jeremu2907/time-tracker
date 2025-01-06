import React, { Dispatch, FormEvent, SetStateAction, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../components/Button';
import Input from '../components/Input';
import { api } from '../config';
import { getCurrentDate, getCurrentTime, standardDateToUSConvention } from '../utils';

interface SectionProps {
    setRefreshFlag: Dispatch<SetStateAction<number>>
}

const TimeTracker: React.FC<SectionProps> = ({setRefreshFlag}) => {
    const [currentDate, setCurrentDate] = useState<string>(standardDateToUSConvention(getCurrentDate()));
    const [startTime, setStartTime] = useState<string>("");
    const [endTime, setEndTime] = useState<string>("");
    const [note, setNote] = useState<string>("");
    const CURRENT_CLOCK_STATUS_KEY = "CURRENT_CLOCK_STATUS_KEY";

    const clockButtonClicked = (name: string, mutator: React.Dispatch<React.SetStateAction<string>>) => {
        const timeT = getCurrentTime();
        mutator(timeT);
        localStorageUpdate(name, timeT);
    }

    const noteChanged = (name: string, value: string) => {
        setNote(value);
        localStorageUpdate(name, value);
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
            toast('Not clocked in', {position: "top-left"});
            return;
        }

        const data = {
            date: getCurrentDate(),
            startTime: startTime,
            endTime: endTime,
            note: note
        };

        await api.post(
            '/post',
            data
        )

        toast.success("Submitted time entry", {position: "top-left"});
        localStorage.removeItem(CURRENT_CLOCK_STATUS_KEY);
        console.log("removed local saved data");
        setRefreshFlag(prev => prev + 1);
        setStartTime("");
        setEndTime("");
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
        setNote(localStorageData.note);
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
            <h2 className='mt-20 mb-20 text-8xl font-semibold self-center'>
                {currentDate}
            </h2>
            <p>note</p>
            <Input
                styleString='w-full opacity-50'
                type='text'
                name='note'
                value={note}
                onChange={e => {noteChanged('note', e.currentTarget.value)}}
            />
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
