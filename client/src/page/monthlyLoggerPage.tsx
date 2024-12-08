import axios from "axios";
import { useEffect, useState } from "react";
import { ENDPOINT } from "@/config";
import { unixTimeStampToReadableDate, unixTimeStampToReadableTime } from "@/utils";
import { Separator } from "@radix-ui/react-separator";

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
        <div className="border-l border-solid pl-10">
            {entries.map((entry) => {
                return (
                    <div key={`date-entry-${entry.id}`} className="">
                        <h2 className="in-line">{entry.dateParsed}</h2>
                        <div className="flex gap-10">
                            <p>{entry.startTimeParsed}</p>
                            <p>{entry.endTimeParsed}</p>
                        </div>
                        <div className='mb-10' />
                    </div>
                )
            })}
        </div>
    )
}