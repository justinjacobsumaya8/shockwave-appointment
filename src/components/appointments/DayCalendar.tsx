import React, { useRef, useState, useEffect } from "react";

import moment from "moment";
import Time, {
    DEFAULT_DATE_FORMAT,
    DEFAULT_TIME_FORMAT,
} from "@/src/models/Time";
import Appointment, { AppointmentInterface } from "@/src/models/Appointment";
import appointmentsJson from "@/src/dummy/appointments.json";

import LeftArrow from "@/src/components/icons/LeftArrow";
import RightArrow from "@/src/components/icons/RightArrow";

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
        const firstElementHeight =
            hoursValueRef.current[0].getBoundingClientRect().height;
        const secondElementHeight =
            hoursValueRef.current[1].getBoundingClientRect().height;

        const startTime = startElement.getAttribute("data-time") as string;
        const endTime = endElement.getAttribute("data-time") as string;

        const startElementRect = startElement.getBoundingClientRect();
        const endElementRect = endElement.getBoundingClientRect();

        let startElementTop = startElementRect.top;
        let elementHeight = secondElementHeight;

        if (startTime.includes(":30")) {
            startElementTop =
                startElementRect.top -
                firstElementHeight -
                firstElementHeight / 2;
        } else {
            startElementTop = startElementRect.top - firstElementHeight;
        }

        if (endTime.includes(":30")) {
            elementHeight = endElementRect.bottom - startElementRect.bottom;
        } else {
            elementHeight = endElementRect.bottom - startElementRect.top;
        }

        // console.log(startElementRect)
        const top = startElementTop + "px";
        const height = elementHeight + "px";

        return (
            <div
                className="absolute right-0 bottom-0"
                style={{ 
                    top,
                    left: 0
                    // left: '500px'
                }}
                key={index}
            >
                <a
                    href="#"
                    className="block w-full overflow-x-auto p-3 bg-red-200 border border-red-500 rounded-lg shadow hover:bg-red-100"
                    style={{
                        minHeight: secondElementHeight,
                        height,
                    }}
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
                                    className="border-r-2 px-4 py-8 pb-0 text-center"
                                    width="8%"
                                >
                                    {timeRange.includes(":00") ? timeRange : ""}
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
