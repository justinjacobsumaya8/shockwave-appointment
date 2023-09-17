import moment from "moment";

export const DEFAULT_DATE_FORMAT = "YYYY-MM-DD";
export const DEFAULT_TIME_FORMAT = "hh:mm:ss";
export const PROPER_TIME_FORMAT = "hh:mm A";

class Time {
    static hourly = () => {
        const hours: string[] = [];
        for (let index = 0; index < 24; index++) {
            hours.push(`${index}:00`);
        }
        return hours;
    }

    static getTimeRanges(interval: number): string[] {
        const ranges = [];
        const date = new Date();
    
        for (let minutes = 0; minutes < 24 * 60; minutes = minutes + interval) {
            date.setHours(0);
            date.setMinutes(minutes);

            const time = moment(date).format(PROPER_TIME_FORMAT);

            // Restrict to only show 6 am to 11 pm
            if (
                moment(time, PROPER_TIME_FORMAT) >=
                    moment("6:00 AM", PROPER_TIME_FORMAT) &&
                moment(time, PROPER_TIME_FORMAT) <=
                    moment("11:00 PM", PROPER_TIME_FORMAT)
            ) {
                ranges.push(time);
            }
            
        }
        
        return ranges;
    }
}

export default Time;