import React, { useState } from 'react';

import Input from './Input';
import axios from 'axios';
import { ENDPOINT } from '../config';
import Button from './Button';
import { toast } from 'react-toastify';

interface RowProps {
    id: number,
    date: string;
    start: string;
    end: string;
    callBack?: (event: React.FormEvent<HTMLInputElement>) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const RecentRow: React.FC<RowProps> = ({ id, date, start, end, callBack }) => {
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

        await axios.patch(
            `${ENDPOINT}/patch`,
            data
        );

        toast.success("Updated entry");
        setTimeout(() => {window.location.reload()}, 3000);
    }

    const revertValues = () => {
        setDateDisplay(date);
        setStartDisplay(start);
        setEndDisplay(end);
    }

    const removeEntry = async () => {
        const url = `${ENDPOINT}/delete?id=${id}`;
        await axios.delete(url);
        toast.success("Removed entry");
        setTimeout(() => {window.location.reload()}, 3000);
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
                    <Button role='button' value='cancel' styles='text-sm p-2 h-fit ml-auto' onClick={revertValues}/>
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
