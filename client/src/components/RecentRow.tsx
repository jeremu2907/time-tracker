import React from 'react';

import Input from './Input';

interface RowProps {
    id: number,
    date: string;
    start: string;
    end: string;
    callBack?: (event: React.FormEvent<HTMLInputElement>) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const RecentRow: React.FC<RowProps> = ({ id, date, start, end, callBack }) => {
    return (
        <li className='w-full mb-12'>
            <form className='bullet'>
                <Input
                    styleString='font-semibold text-xl border-none p-0'
                    type='date'
                    value={date}
                    onChange={() => { }}
                />
                <div className='flex justify-between'>
                    <Input
                        styleString='p-0'
                        type='time'
                        value={start}
                        onChange={() => { }}
                    />
                    <Input
                        styleString='p-0'
                        type='time'
                        value={end}
                        onChange={() => { }}
                    />
                </div>
            </form>
        </li>
    );
};

export default RecentRow;
