/**
 * 
 * @returns current date in yyyy-mm-dd
 */
export function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(today.getDate()).padStart(2, '0'); // Pad single-digit days
    return `${year}-${month}-${day}`;
};

export function getCurrentMonth() {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    return `${month}`;
}

export function getCurrentYear() {
    const today = new Date();
    const year = today.getFullYear();
    return `${year}`;
}

/**
 * 
 * @param htmlStandardDate yyyy-mm-dd
 * @returns MMM dd, yyyy
 */
export function standardDateToUSConvention(htmlStandardDate: string): string {
    // Split the input date string
    const [year, month, day] = htmlStandardDate.split('-').map(Number);

    // Create a Date object in the local time zone
    const date = new Date(year, month - 1, day); // Months are 0-indexed in JS

    // Define formatting options
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: '2-digit' };

    // Convert to the desired format
    return date.toLocaleDateString('en-US', options);
}


/**
 * 
 * @returns Get current time in HH:mm
 */
export function getCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0'); // Get hours in 24-hour format
    const minutes = String(now.getMinutes()).padStart(2, '0'); // Get minutes
    return `${hours}:${minutes}`;
};

/**
 * 
 * @param time time in HH:mm
 * @returns time in HH.(mm/60)
 */
function timeStringToHours(time: string) {
    const [hoursString, minutesString] = time.split(':');
    const hour = Number(hoursString);
    const minute = Number(minutesString) / 60;
    return hour + minute;
}

/**
 * 
 * @param start start time in HH:mm
 * @param end end time in HH:mm
 * @returns elapsed time between **start** and **end** in HH.(mm/60)
 */
export function timeDifferenceHours(start: string, end: string) {
    return parseFloat((timeStringToHours(end) - timeStringToHours(start)).toFixed(1));
}

/**
 * 
 * @param dateString 
 * @returns week number
 */
export function getWeekNumberInMonth(dateString: string): number {
    // const date = new Date(dateString);
    // const startDate = new Date(date.getFullYear(), 0, 1);
    // const days = Math.floor((date.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
    // return Math.ceil((days + startDate.getDay() + 1) / 7);
    const [, , dd] = dateString.split('-').map(item => Number(item));
    return Math.ceil(dd / 7);
}
