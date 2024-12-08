export const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function unixTimeStampToReadableDate(unixTimestampInSeconds: number, zone: number): string {
    // Convert the Unix timestamp (seconds) to milliseconds
    const date = new Date(unixTimestampInSeconds * 1000);
    date.setUTCHours(date.getUTCHours() + zone);
    const month = MONTHS[date.getUTCMonth()];
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();

    return `${month} ${day}, ${year}`;
}


export function unixTimeStampToReadableTime(unixTimestampInSeconds: number, zone: number): string {
    // Convert the Unix timestamp (seconds) to milliseconds
    const date = new Date(unixTimestampInSeconds * 1000);

    const hour24 = date.getUTCHours() + zone;
    const hour = (hour24 > 12)? hour24 - 12 : hour24;
    const minute = date.getUTCMinutes().toLocaleString('en-US', { minimumIntegerDigits: 2 });
    const designator = (hour24 > 12)? 'PM' : 'AM';


    return `${hour}:${minute} ${designator}`;
}