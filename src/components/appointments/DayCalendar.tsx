import React, { useRef, useState, useEffect, useCallback } from "react";

import * as Moment from "moment";
import { extendMoment } from "moment-range";
import Time, {
    DEFAULT_DATE_FORMAT,
    DEFAULT_TIME_FORMAT,
} from "@/src/models/Time";
import Appointment, { AppointmentInterface } from "@/src/models/Appointment";
import appointmentsJson from "@/src/dummy/appointments.json";

import Head from "next/head";
import LeftArrow from "@/src/components/icons/LeftArrowIcon";
import RightArrow from "@/src/components/icons/RightArrowIcon";
import ShowAppointment from "./ShowAppointment";
import CreateAppointmentModal from "./CreateAppointmentModal";
import { SetAlertMessageType } from "../common/AlertMessage";

const moment = extendMoment(Moment);

export default function DayCalendar({
    setAlertMessage,
}: {
    setAlertMessage: SetAlertMessageType;
}) {
    const timeRanges = Time.getTimeRanges(30);

    const today = new Date();
    const [date, setDate] = useState(today);

    const [isCreateModalShown, setIsCreateModalShown] = useState(false);

    const [selectedAppointment, setSelectedAppointment] =
        useState<AppointmentInterface | null>(null);

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

    const convertToHtml = useCallback(
        ({
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
            const dateFormat = "YYYY-MM-DD hh:mm:ss";
            const endTime = endElement.getAttribute("data-time") as string;

            let offsetBottom = endElement.offsetTop;

            if (endTime.includes(":00")) {
                offsetBottom =
                    endElement.offsetTop + endElement.offsetHeight / 2;
            }

            const top = startElement.offsetTop + "px";
            const bottom = -offsetBottom + "px";

            const timeInterval = moment.range(
                moment(appointment.startDate, dateFormat),
                moment(appointment.endDate, dateFormat)
            );

            let overlapIndexes: number[] = [];

            appointments.map((data, appointmentIndex) => {
                const start = moment(data.startDate, dateFormat);
                const end = moment(data.endDate, dateFormat);

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

            const onClickShowAppointment = () => {
                setSelectedAppointment(appointment);
            };

            return (
                <div
                    className="absolute right-0 bottom-0"
                    style={{
                        inset: `${top} 0 ${bottom} ${left}`,
                    }}
                    key={index}
                >
                    <button
                        type="button"
                        onClick={onClickShowAppointment}
                        className="absolute inset-0 block w-full overflow-x-auto text-left p-3 bg-red-200 border border-red-500 rounded-lg shadow hover:bg-red-100"
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
                    </button>
                </div>
            );
        },
        [appointments]
    );

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
    }, [appointments, date, convertToHtml]);

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
            <Head>
                <title>Appointments</title>
            </Head>
            <CreateAppointmentModal
                isModalShown={isCreateModalShown}
                appointments={appointments}
                setIsModalShown={setIsCreateModalShown}
                setAppointments={setAppointments}
                setAlertMessage={setAlertMessage}
            />
            <div className="flex">
                <div className="w-full border-b">
                    <div className="p-4 border-y">
                        <span className="text-gray-500 text-base">
                            Appointments
                        </span>
                        <div className="flex justify-between mt-1.5">
                            <div>
                                <div className="flex items-center gap-2">
                                    <h6 className="font-bold text-2xl">
                                        {moment(date).format("MMMM")}
                                    </h6>
                                    <button
                                        type="button"
                                        className="rounded-full p-1.5 bg-gray-100 hover:bg-gray-200"
                                        onClick={onClickPreviousDate}
                                    >
                                        <LeftArrow />
                                    </button>
                                    <button
                                        type="button"
                                        className="rounded-full p-1.5 bg-gray-100 hover:bg-gray-200"
                                        onClick={onClickNextDate}
                                    >
                                        <RightArrow />
                                    </button>
                                </div>
                                <div className="mt-1.5">
                                    <p className="text-gray-500 text-base">
                                        {moment(date).format("YYYY-MM-DD") ===
                                        moment(today).format("YYYY-MM-DD") ? (
                                            <span>Today is</span>
                                        ) : (
                                            ""
                                        )}
                                        <span>
                                            {" "}
                                            {moment(date).format(
                                                "dddd, MMMM, D, YYYY"
                                            )}
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    onClick={() => setIsCreateModalShown(true)}
                                    className="text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:ring-orange-200 font-medium rounded-lg text-base px-5 py-2.5 mr-2 mb-2"
                                >
                                    New Appointment
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="h-[600px] w-full overflow-x-auto">
                        <div className="relative shadow-md">
                            <table className="w-full text-sm text-left">
                                <tbody>
                                    {timeRanges.map((timeRange, index) => (
                                        <tr
                                            key={index}
                                            className={`${
                                                timeRange.includes(":00") &&
                                                index > 0
                                                    ? "border-t"
                                                    : ""
                                            }${
                                                timeRanges.length - 1 === index
                                                    ? "border-b"
                                                    : ""
                                            }`}
                                        >
                                            <td
                                                className="border-r px-4 py-8 text-center"
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
                                                        hoursValueRef.current[
                                                            index
                                                        ] = element;
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
                                                <span className="hidden">
                                                    Timeslot
                                                </span>
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
                </div>
                {selectedAppointment && (
                    <div className="border  w-1/4">
                        <ShowAppointment
                            selectedAppointment={selectedAppointment}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
