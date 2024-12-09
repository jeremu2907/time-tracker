import axios from "axios";
import { useEffect, useState } from "react";
import { ENDPOINT } from "@/config";
import { unixTimeStampToReadableDate, unixTimeStampToReadableTime } from "@/utils";

interface DateEntry {
    id: number,
    startTime: number,
    endTime: number,
    zone: number,
    dateParsed: string,
    startTimeParsed: string,
    endTimeParsed: string
};

export default function MonthlyLoggerPage() {
    const [entries, setEntries] = useState<DateEntry[]>([]);

    // const addRow = () => {
    //     const dateTime = new Date();
    //     const newEntry: DateEntry = {

    //     };
    //     setEntries(prev => [newEntry, ...prev]);
    // }

    const fetchEntries = async () => {
        try {
            const response = await axios.get(`${ENDPOINT}/date-entry/all`);
            const rawData: DateEntry[] = response.data;
            rawData.map(data => {
                data.dateParsed = unixTimeStampToReadableDate(data.startTime, data.zone);
                data.startTimeParsed = unixTimeStampToReadableTime(data.startTime, data.zone);
                data.endTimeParsed = unixTimeStampToReadableTime(data.endTime, data.zone);
            })
            setEntries(rawData);
        } catch (error) {
            console.error("Error fetching entries:", error);
        }
    }

    useEffect(() => {
        fetchEntries();
    },
        []
    );

    return (
        <div className="border-l border-solid pl-10 flex flex-col">
            <button className="mb-10 self-auto">+</button>
            {entries.map((entry) => {
                return (
                    <div key={`date-entry-${entry.id}`} className="">
                        <input
                            defaultValue={entry.dateParsed}
                            className='p-2 font-bold w-[10em] bg-transparent border-b mb-2 border-neutral-600'
                        />
                        <div className="flex gap-10">
                            <div>
                                <p>Start</p>
                                <input
                                    defaultValue={entry.startTimeParsed}
                                    className='p-2 w-[10em]'
                                />
                                <button className="ml-2">clock in</button>
                            </div>
                            <div>
                                <p>End</p>
                                <input
                                    defaultValue={entry.endTimeParsed}
                                    className='p-2 w-[10em]'
                                />
                                <button className="ml-2">clock out</button>
                            </div>
                        </div>
                        <div className='mb-10' />
                    </div>
                )
            })}
        </div>
    )
}