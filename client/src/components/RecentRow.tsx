import React, { useState } from 'react';

import { toast } from 'react-toastify';
import { api } from '../config';
import Button from './Button';
import Input from './Input';
import { DateEntry } from '../interfaces/dateEntry';
import { timeDifferenceHours } from '../utils';

interface RowProps {
    id: number;
    date: string;
    start: string;
    end: string;
    note: string;
    idx: number;
    removeEntryCallback: (idx: number) => void;
    updateDateEntry: (idx: number, value: DateEntry) => void;
}

const RecentRow: React.FC<RowProps> = ({ id, date, start, end, note, idx, removeEntryCallback, updateDateEntry}) => {
    const [dateDisplay, setDateDisplay] = useState<string>(date);
    const [startDisplay, setStartDisplay] = useState<string>(start);
    const [endDisplay, setEndDisplay] = useState<string>(end);
    const [noteDisplay, setNoteDisplay] = useState<string>(note ?? undefined);

    const updateValues = async (form: HTMLFormElement) => {
        const formData = new FormData(form);
        const data: DateEntry = {
            id: id,
            date: formData.get('date')?.toString() ?? '',
            startTime: formData.get('start')?.toString() ?? '',
            endTime: formData.get('end')?.toString() ?? '',
            note: formData.get('note')?.toString() ?? ''
        }

        await api.patch(
            '/patch',
            data
        );

        toast.success("Updated entry");
        updateDateEntry(idx, data);
    }

    const revertValues = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setDateDisplay(date);
        setStartDisplay(start);
        setEndDisplay(end);
    }

    const removeEntry = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const url = `delete?id=${id}`;
        await api.delete(url);
        toast.success("Removed entry");
        removeEntryCallback(idx);
    }

    return (
        <li className='w-full mb-12 hover:bg-[#ffffff0a] rounded-xl px-3'>
            <form
                className='bullet'
                onSubmit={e => {
                    e.preventDefault();
                    updateValues(e.currentTarget)
                }}
            >
                <div className='flex justify-between items-center'>
                    <Input
                        styleString='font-semibold text-xl border-none p-0'
                        type='date'
                        name='date'
                        value={dateDisplay}
                        onChange={(e) => { setDateDisplay(e.currentTarget.value) }}
                    />
                    <Button role='button' value='delete' styles='text-sm p-2 h-fit ml-auto' onClick={removeEntry}/>
                    <Button role='button' value='cancel' styles='text-sm p-2 h-fit ml-5' onClick={revertValues}/>
                    <Button role='submit' value='update' styles='text-sm p-2 h-fit ml-5'/>
                </div>
                <div className='flex justify-between items-center'>
                    <Input
                        styleString='p-0'
                        type='time'
                        name='start'
                        value={startDisplay}
                        onChange={(e) => { setStartDisplay(e.currentTarget.value) }}
                    />
                    <Input
                        styleString='p-0'
                        type='time'
                        name='end'
                        value={endDisplay}
                        onChange={(e) => { setEndDisplay(e.currentTarget.value) }}
                    />
                    <p><strong>{timeDifferenceHours(start, end)}</strong> hr</p>
                </div>
                <p className="mt-4 opacity-50">Notes</p>
                <Input
                    styleString='w-full opacity-50'
                    type='text'
                    name='note'
                    value={noteDisplay}
                    onChange={e => {setNoteDisplay(e.currentTarget.value)}}
                />
            </form>
        </li>
    );
};

export default RecentRow;
