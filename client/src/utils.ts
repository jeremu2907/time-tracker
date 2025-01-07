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

export function areDatesInSameWeek(dateStr1: string, dateStr2: string) {
    // Helper function to get the start of the week (Monday) for a given date
    function getStartOfWeek(date: any) {
        const day = date.getDay();
        const diff = (day === 0 ? 6 : day - 1); // Get the number of days to subtract to get the previous Monday
        const startOfWeek = new Date(date);
        startOfWeek.setDate(date.getDate() - diff);
        startOfWeek.setHours(0, 0, 0, 0);  // Set time to midnight for accurate comparison
        return startOfWeek;
    }

    // Convert the string to Date objects but manually adjust them for local time
    function parseLocalDate(dateStr: any) {
        const [year, month, day] = dateStr.split('-').map(Number); // Split into components
        const localDate = new Date(year, month - 1, day);  // Create a new Date object with local time
        localDate.setHours(0, 0, 0, 0);  // Ensure the time is set to midnight
        return localDate;
    }

    // Convert string to Date objects
    const date1 = new Date(parseLocalDate(dateStr1));
    const date2 = new Date(parseLocalDate(dateStr2));

    // Get the start of the week (Monday) for both dates
    const startOfWeek1 = getStartOfWeek(date1);
    const startOfWeek2 = getStartOfWeek(date2);

    // Compare if the start of the week for both dates is the same
    return startOfWeek1.getTime() === startOfWeek2.getTime();
}
