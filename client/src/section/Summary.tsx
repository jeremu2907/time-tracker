import React from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import RecentRow from '../components/RecentRow';

const Summary: React.FC = () => {
    return (
        <section className='flex-[2] bg-baseDark w-full p-10'>
            <h1>Summary</h1>
            <div className='flex justify-evenly mt-12 mb-12'>
                <Input type='month' onChange={() => {console.log("hi")}} value='2024-12'/>
                <Button value='.csv' onClick={() => {}} />
            </div>
            <ul className='border-l h-auto w-auto max-h-[60vh] overflow-y-scroll pl-6 pr-6 recent-row-container'>
                <RecentRow date='2024-12-08' start='08:00' end='17:00' callBack={() => {}} />
                <RecentRow date='2024-12-08' start='08:00' end='17:00' callBack={() => {}} />
                <RecentRow date='2024-12-08' start='08:00' end='17:00' callBack={() => {}} />
                <RecentRow date='2024-12-08' start='08:00' end='17:00' callBack={() => {}} />
                <RecentRow date='2024-12-08' start='08:00' end='17:00' callBack={() => {}} />
            </ul>
        </section>
    )
}

export default Summary;
