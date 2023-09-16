import React, { useRef, useState, useEffect } from "react";

import Moment from "moment";
import { extendMoment } from "moment-range";
import Time, {
    DEFAULT_DATE_FORMAT,
    DEFAULT_TIME_FORMAT,
} from "@/src/models/Time";
import Appointment, { AppointmentInterface } from "@/src/models/Appointment";
import appointmentsJson from "@/src/dummy/appointments.json";

import LeftArrow from "@/src/components/icons/LeftArrow";
import RightArrow from "@/src/components/icons/RightArrow";

const moment = extendMoment(Moment);

export default function DayCalendar() {
    const timeRanges = Time.getTimeRanges(30);

    const today = new Date();
    const [date, setDate] = useState(today);

    const hoursValueRef = useRef<HTMLTableCellElement[]>([]);

    const [appointments, setAppointments] = useState<AppointmentInterface[]>(
        []
    );
    const [appointmentCards, setAppointmentCards] = useState<React.ReactNode[]>(
        []
    );

    hoursValueRef.current = hoursValueRef.current.slice(0, timeRanges.length);

    useEffect(() => {
        const data = appointmentsJson.map((datum) => Appointment.format(datum));
        setAppointments(data);
    }, []);

    useEffect(() => {
        const scheduleHtmlCards: React.ReactNode[] = [];
        const currentDate = moment(date).format(DEFAULT_DATE_FORMAT);

        const convertToHtml = ({
            index,
            appointment,
            startElement,
            endElement,
        }: {
            index: number;
            appointment: AppointmentInterface;
            startElement: HTMLTableCellElement;
            endElement: HTMLTableCellElement;
        }) => {
            const startTime = startElement.getAttribute("data-time") as string;
            const endTime = endElement.getAttribute("data-time") as string;

            let offsetBottom = endElement.offsetTop;

            if (endTime.includes(":00")) {
                offsetBottom =
                    endElement.offsetTop + endElement.offsetHeight / 2;
            }

            const top = startElement.offsetTop + "px";
            const bottom = -offsetBottom + "px";

            const timeInterval = moment.range(
                moment(startTime, DEFAULT_TIME_FORMAT),
                moment(endTime, DEFAULT_TIME_FORMAT)
            );

            let overlapIndexes: number[] = [];

            appointments.map((appointment, appointmentIndex) => {
                const start = moment(
                    appointment.startDate,
                    "YYYY-MM-DD hh:mm:ss"
                );
                const end = moment(appointment.endDate, "YYYY-MM-DD hh:mm:ss");

                const interval = moment.range(moment(start), moment(end));

                if (timeInterval.overlaps(interval)) {
                    overlapIndexes.push(appointmentIndex);
                }
            });

            let left = "";
            if (overlapIndexes.length > 1 && overlapIndexes[index]) {
                let count = 0;
                let baseLeft = 15;
                overlapIndexes.map((overlapIndex) => {
                    if (overlapIndex <= index) {
                        count++;
                    }
                });
                left = baseLeft * count + "%";
            }

            return (
                <div
                    className="absolute right-0 bottom-0"
                    style={{
                        inset: `${top} 0 ${bottom} ${left}`,
                    }}
                    key={index}
                >
                    <a
                        href="#"
                        className="absolute inset-0 block w-full overflow-x-auto p-3 bg-red-200 border border-red-500 rounded-lg shadow hover:bg-red-100"
                    >
                        <div className="mb-1">
                            <h6 className="text-md font-bold tracking-tight text-gray-900">
                                {appointment.title}
                            </h6>
                            <p className="font-normal text-sm text-gray-700">
                                {`${moment(appointment.startDate).format(
                                    DEFAULT_TIME_FORMAT
                                )} - ${moment(appointment.endDate).format(
                                    DEFAULT_TIME_FORMAT
                                )}`}
                            </p>
                        </div>
                        <p className="font-normal text-sm text-gray-700">
                            {appointment.client.name}
                        </p>
                    </a>
                </div>
            );
        };

        if (hoursValueRef.current.length) {
            appointments.map((appointment, index) => {
                const startDate = moment(appointment.startDate).format(
                    DEFAULT_DATE_FORMAT
                );

                if (startDate !== currentDate) {
                    return;
                }

                const startTime = moment(appointment.startDate).format(
                    DEFAULT_TIME_FORMAT
                );
                const endTime = moment(appointment.endDate).format(
                    DEFAULT_TIME_FORMAT
                );

                const startElement = hoursValueRef.current.find(
                    (element) => element.getAttribute("data-time") === startTime
                );
                const endElement = hoursValueRef.current.find(
                    (element) => element.getAttribute("data-time") === endTime
                );

                if (startElement && endElement) {
                    const scheduleHtml = convertToHtml({
                        index,
                        appointment,
                        startElement,
                        endElement,
                    });
                    scheduleHtmlCards.push(scheduleHtml);
                }
            });
        }

        setAppointmentCards(scheduleHtmlCards);
    }, [appointments, date]);

    const onClickPreviousDate = () => {
        const previousDate = moment(date).subtract(1, "day").toDate();
        setDate(previousDate);
    };

    const onClickNextDate = () => {
        const nextDay = moment(date).add(1, "day").toDate();
        setDate(nextDay);
    };

    return (
        <div>
            <div className="flex items-center gap-2">
                <h6 className="font-bold">{moment(date).format("MMMM")}</h6>
                <button
                    type="button"
                    className="rounded-full p-1.5 bg-gray-200 hover:bg-gray-100"
                    onClick={onClickPreviousDate}
                >
                    <LeftArrow />
                </button>
                <button
                    type="button"
                    className="rounded-full p-1.5 bg-gray-200 hover:bg-gray-100"
                    onClick={onClickNextDate}
                >
                    <RightArrow />
                </button>
            </div>
            <div>
                <p>
                    {/* {moment(date).format("YYYY-MM-DD") ===
                    moment(today).format("YYYY-MM-DD") ? (
                        <span>Today is</span>
                    ) : (
                        ""
                    )} */}
                    <span> {moment(date).format("dddd, MMMM, D, YYYY")}</span>
                </p>
            </div>
            <div className="relative overflow-x-auto shadow-md">
                <table className="w-full text-sm text-left">
                    <tbody>
                        {timeRanges.map((timeRange, index) => (
                            <tr
                                key={index}
                                className={`${
                                    timeRange.includes(":00")
                                        ? "border-t-2"
                                        : ""
                                }`}
                            >
                                <td
                                    className="border-r-2 px-4 py-8 text-center"
                                    width="8%"
                                >
                                    {timeRange.includes(":00")
                                        ? timeRange
                                        : timeRange}
                                </td>
                                <td
                                    data-time={timeRange}
                                    ref={(element) => {
                                        if (element) {
                                            hoursValueRef.current[index] =
                                                element;
                                        }
                                    }}
                                ></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="inset-0 absolute">
                    <table className="w-full h-full">
                        <tbody>
                            <tr role="row">
                                <td role="gridcell" width="8%">
                                    <span className="hidden">Timeslot</span>
                                </td>
                                <td role="gridcell">
                                    <div className="relative min-h-full">
                                        <div className="mt-2 mx-4 absolute left-0 right-0 top-0">
                                            {appointmentCards}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
