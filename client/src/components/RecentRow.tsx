import React, { useState } from 'react';

import { toast } from 'react-toastify';
import { api } from '../config';
import Button from './Button';
import Input from './Input';

interface RowProps {
    id: number;
    date: string;
    start: string;
    end: string;
    removeEntryCallback: (idx: number) => void;
    idx: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const RecentRow: React.FC<RowProps> = ({ id, date, start, end, removeEntryCallback, idx }) => {
    const [dateDisplay, setDateDisplay] = useState(date);
    const [startDisplay, setStartDisplay] = useState(start);
    const [endDisplay, setEndDisplay] = useState(end);

    const updateValues = async (form: HTMLFormElement) => {
        const formData = new FormData(form);
        const data = {
            id: id,
            date: formData.get('date'),
            startTime: formData.get('start'),
            endTime: formData.get('end')
        }

        await api.patch(
            '/patch',
            data
        );

        toast.success("Updated entry");
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
        <li className='w-full mb-12'>
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
                <div className='flex justify-between'>
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
                </div>
            </form>
        </li>
    );
};

export default RecentRow;
