import React, { FormEvent, useEffect, useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import RecentRow from '../components/RecentRow';
import axios from 'axios';
import { ENDPOINT } from '../config';
import { getCurrentMonth, getCurrentYear } from '../utils';

interface dateEntry {
    id: number
    date: string;
    startTime: string;
    endTime: string;
}

const Summary: React.FC = () => {
    const [dateEntries, setDateEntries] = useState<dateEntry[]>();
    const [year, setYear] = useState<string>(getCurrentYear());
    const [month, setMonth] = useState<string>(getCurrentMonth());

    const changedYearMonth = async (e: FormEvent<HTMLInputElement>) => {
        const newVal = e.currentTarget.value.split('-');
        const yearTemp = newVal[0];
        const monthTemp = newVal[1];

        setYear(yearTemp);
        setMonth(monthTemp);
    }

    const updateEntries = async () => {
        const url = `${ENDPOINT}/by-year-month?year=${year}&month=${month}`
        const response = await axios.get(url);
        setDateEntries(response.data);
    }

    const requestCSV = async () => {
        const url = `${ENDPOINT}/csv?year=${year}&month=${month}`
        const response = await axios.get(url, {
            responseType: 'blob', // Ensures the response is treated as binary data
        });

        const blob = new Blob([response.data], { type: 'text/csv' });

        // Create a download link
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${year}-${month}-time-sheet.csv`;
        document.body.appendChild(link);
        link.click();

        // Clean up
        URL.revokeObjectURL(link.href);
        document.body.removeChild(link);
    }

    useEffect(() => {
        updateEntries();
    }, [year, month])

    return (
        <section className='flex-[2] bg-baseDark w-full p-10'>
            <h1>Summary</h1>
            <div className='flex justify-evenly mt-12 mb-12'>
                <Input type='month' onChange={changedYearMonth} value={`${year}-${month}`} />
                <Button value='.csv' onClick={requestCSV} />
            </div>
            <ul className='border-l h-auto w-auto max-h-[60vh] overflow-y-scroll pl-6 pr-6 recent-row-container'>
                {dateEntries && dateEntries.map((dateEntry: dateEntry) => {
                    return (
                        <RecentRow
                            key={`date-entry-${dateEntry.id}`}
                            id={dateEntry.id}
                            date={dateEntry.date}
                            start={dateEntry.startTime}
                            end={dateEntry.endTime}
                        />)
                })}
            </ul>
        </section>
    )
}

export default Summary;
