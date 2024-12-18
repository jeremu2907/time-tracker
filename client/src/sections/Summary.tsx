import React, { FormEvent, useEffect, useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import RecentRow from '../components/RecentRow';
import { api } from '../config';
import { DateEntry } from '../interfaces/dateEntry';
import { getCurrentDate, getCurrentMonth, getCurrentYear, getWeekNumberInMonth, timeDifferenceHours } from '../utils';

interface SectionProps {
    refreshFlag: number,
};

const Summary: React.FC<SectionProps> = ({refreshFlag}) => {
    const [dateEntries, setDateEntries] = useState<DateEntry[]>([]);
    const [year, setYear] = useState<string>(getCurrentYear());
    const [month, setMonth] = useState<string>(getCurrentMonth());
    const [totalHours, setTotalHours] = useState<number>(0);
    const [weeklyTotalHours, setWeeklyTotalHours] = useState<number>(0);

    const changedYearMonth = async (e: FormEvent<HTMLInputElement>) => {
        const newVal = e.currentTarget.value.split('-');
        const yearTemp = newVal[0];
        const monthTemp = newVal[1];

        setYear(yearTemp);
        setMonth(monthTemp);
    }

    const updateEntries = async () => {
        const url = `/by-year-month?year=${year}&month=${month}`;
        const response = await api.get(url);
        setDateEntries(response.data);
    }

    const requestCSV = async () => {
        const url = `/csv?year=${year}&month=${month}`
        const response = await api.get(url, {
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

    const removeEntryCallback = (idx: number) => {
        const newList = [
            ...dateEntries.slice(0, idx),
            ...dateEntries.slice(idx + 1)
        ];
        setDateEntries(newList);
    }

    const updateTotalHoursThisMonth = () => {
        let hours = 0;
        dateEntries.forEach((entry : DateEntry) => {
            if(entry.startTime.length > 0 && entry.endTime.length > 0){
                hours += timeDifferenceHours(entry.startTime, entry.endTime)
            };
        }, hours)

        setTotalHours(Number(hours.toFixed(1)));
    }

    const updateWeeklyTotalHours = () => {
        const currentWeekNumber = getWeekNumberInMonth(getCurrentDate());
        let idxOfLastDateInCurrentWeek = -1;
        
        for(let i = 0; i < dateEntries.length; i++){
            if(getWeekNumberInMonth(dateEntries[i].date) < currentWeekNumber){
                break;
            } else {
                idxOfLastDateInCurrentWeek = i;
            }
        }

        if(idxOfLastDateInCurrentWeek === -1){
            setWeeklyTotalHours(0);
        }

        setWeeklyTotalHours(
            dateEntries
            .slice(0, idxOfLastDateInCurrentWeek + 1)
            .map(dateEntry => {
                if(dateEntry.startTime.length > 0 && dateEntry.endTime.length > 0){
                    return timeDifferenceHours(dateEntry.startTime, dateEntry.endTime);
                } else {
                    return 0;
                }
            })
            .reduce((sum, current) => Number((sum + current).toFixed(1)), 0)
        );
    }

    const updateDateEntry = (idx: number, value: DateEntry) => {
        const newList = dateEntries;
        newList[idx] = value;
        setDateEntries([...newList]);
    }

    useEffect(() => {
        updateEntries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [year, month, refreshFlag])

    useEffect(() => {
        updateTotalHoursThisMonth();
        updateWeeklyTotalHours();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dateEntries])

    return (
        <section className='flex-[2] bg-baseDark w-full p-10'>
            <h1>Summary</h1>
            <div className='flex justify-evenly mt-4 mb-4'>
                <Input type='month' onChange={changedYearMonth} value={`${year}-${month}`} />
                <Button value='.csv' onClick={requestCSV} />
            </div>
            <div className='flex justify-evenly mt-8 mb-4'>
                <h2>Total hours this month: <strong>{totalHours}</strong> hr</h2>
                <h2>Total hours this week: <strong>{weeklyTotalHours}</strong> hr</h2>
            </div>
            <ul className='border-l h-auto w-auto max-h-[60vh] overflow-y-scroll pl-6 pr-6 recent-row-container'>
                {dateEntries && dateEntries.map((dateEntry: DateEntry, idx) => {
                    return (
                        <RecentRow
                            key={`date-entry-${dateEntry.id}`}
                            id={dateEntry.id}
                            date={dateEntry.date}
                            start={dateEntry.startTime}
                            end={dateEntry.endTime}
                            idx={idx}
                            removeEntryCallback={removeEntryCallback}
                            updateDateEntry={updateDateEntry}
                        />)
                })}
            </ul>
        </section>
    )
}

export default Summary;
