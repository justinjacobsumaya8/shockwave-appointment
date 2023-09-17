import React, { useRef, useState, useEffect, useCallback } from "react";

import * as Moment from "moment";
import { extendMoment } from "moment-range";
import Time, {
    DEFAULT_DATE_FORMAT,
    DEFAULT_TIME_FORMAT,
    PROPER_TIME_FORMAT,
} from "@/src/models/Time";
import { fetchAppointments } from "@/src/redux/actions/appointments.action";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import {
    AppointmentInterface,
    CONSULTATION_SERVICE,
} from "@/src/models/Appointment";
import { createAppointmentActions } from "@/src/redux/slices/createAppointment.slice";
import { appointmentsActions } from "@/src/redux/slices/appointments.slice";
import { editAppointmentActions } from "@/src/redux/slices/editAppointment.slice";
import { showAppointmentActions } from "@/src/redux/slices/showAppointment.slice";
import { useRouter } from "next/router";
import { search } from "@/src/redux/actions/globalSearch.action";

import Head from "next/head";
import LeftArrow from "@/src/components/icons/LeftArrowIcon";
import RightArrow from "@/src/components/icons/RightArrowIcon";
import ViewClient from "./ViewClient";
import ConsultationIcon from "../icons/ConsultationIcon";
import InjectionIcon from "../icons/InjectionIcon";
import UserIcon from "../icons/UserIcon";
import DotsVertical from "../icons/DotsVerticalIcon";
import CreateAppointmentModal from "./CreateAppointmentModal";
import EditAppointmentModal from "./EditAppointmentModal";
import ViewAppointmentModal from "./ViewAppointmentModal";
import RescheduleAppointmentModal from "./RescheduleAppointmentModal";

const { setIsCreateModalShown } = createAppointmentActions;
const { setSelectedAppointment, removeAppointment } = appointmentsActions;

const moment = extendMoment(Moment);

export default function DayCalendar() {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const timeRanges = Time.getTimeRanges(30);

    const today = new Date();
    const [date, setDate] = useState(today);

    const { appointments, selectedAppointment } = useAppSelector(
        (state) => state.appointments
    );

    console.log(appointments);

    const [isDropdownShownBooleans, setIsDropdownShownBooleans] = useState<
        boolean[]
    >([]);
    const [appointmentCards, setAppointmentCards] = useState<React.ReactNode[]>(
        []
    );

    const hoursValueRef = useRef<HTMLTableCellElement[]>([]);
    hoursValueRef.current = hoursValueRef.current.slice(0, timeRanges.length);

    useEffect(() => {
        let booleans = [];
        for (let index = 0; index < appointments.length; index++) {
            booleans[index] = false;
        }
        setIsDropdownShownBooleans(booleans);
    }, [appointments]);

    useEffect(() => {
        dispatch(fetchAppointments());
    }, [dispatch]);

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
            const endTime = endElement.getAttribute("data-time") as string;

            let offsetBottom = endElement.offsetTop;

            if (endTime.includes(":00")) {
                offsetBottom =
                    endElement.offsetTop + endElement.offsetHeight / 2;
            }

            const top = startElement.offsetTop + "px";
            const bottom = -offsetBottom + "px";

            const timeInterval = moment.range(
                moment(appointment.startTime, DEFAULT_TIME_FORMAT),
                moment(appointment.endTime, DEFAULT_TIME_FORMAT)
            );

            let overlapIndexes: number[] = [];

            appointments.map((data, appointmentIndex) => {
                const start = moment(data.startTime, DEFAULT_TIME_FORMAT);
                const end = moment(data.endTime, DEFAULT_TIME_FORMAT);

                const interval = moment.range(start, end);

                if (timeInterval.overlaps(interval)) {
                    overlapIndexes[appointmentIndex] = appointmentIndex;
                }
            });

            let left = "";
            let zIndex = 1;
            if (overlapIndexes.length > 1 && overlapIndexes[index]) {
                let count = 0;
                let baseLeft = 15;
                overlapIndexes.map((overlapIndex) => {
                    if (overlapIndex <= index) {
                        count++;
                    }
                });
                if (count > 1) {
                    left = baseLeft * count + "%";
                    zIndex += count;
                }
            }

            const onClickClient = () => {
                dispatch(setSelectedAppointment(appointment));
            };

            const onClickToggleDropdown = () => {
                isDropdownShownBooleans[index] =
                    !isDropdownShownBooleans[index];
                setIsDropdownShownBooleans([...isDropdownShownBooleans]);
            };

            const onClickShow = () => {
                isDropdownShownBooleans[index] = false;
                setIsDropdownShownBooleans([...isDropdownShownBooleans]);

                dispatch(showAppointmentActions.setIsViewModalShown(true));
                dispatch(
                    showAppointmentActions.setActiveAppointment(appointment)
                );
            };

            const onClickEdit = () => {
                isDropdownShownBooleans[index] = false;
                setIsDropdownShownBooleans([...isDropdownShownBooleans]);

                dispatch(editAppointmentActions.setIsEditModalShown(true));
                dispatch(
                    editAppointmentActions.setActiveAppointment(appointment)
                );
            };

            const onClickReschedule = () => {
                isDropdownShownBooleans[index] = false;
                setIsDropdownShownBooleans([...isDropdownShownBooleans]);

                dispatch(
                    editAppointmentActions.setIsRescheduleModalShown(true)
                );
                dispatch(
                    editAppointmentActions.setActiveAppointment(appointment)
                );
            };

            const onClickCancel = () => {
                isDropdownShownBooleans[index] = false;
                setIsDropdownShownBooleans([...isDropdownShownBooleans]);

                if (
                    !confirm(
                        "Are you sure you want to cancel this appointment?"
                    )
                ) {
                    return;
                }

                dispatch(removeAppointment(appointment));
                dispatch(search(""));
            };

            return (
                <div
                    className="absolute right-0 bottom-0"
                    style={{
                        inset: `${top} 0 ${bottom} ${left}`,
                        zIndex: zIndex,
                    }}
                    key={index}
                >
                    <div
                        className={`absolute inset-0 block w-full overflow-x-auto text-left p-3 border rounded-lg shadow ${
                            appointment.service === CONSULTATION_SERVICE
                                ? "bg-violet-100 border-violet-500 hover:bg-violet-200"
                                : "bg-orange-50 border-orange-500 hover:bg-orange-100"
                        }`}
                    >
                        <div className="absolute right-3 top-5">
                            <button
                                type="button"
                                onClick={onClickToggleDropdown}
                            >
                                <DotsVertical />
                            </button>
                            {isDropdownShownBooleans[index] && (
                                <div className="absolute origin-top-right right-[1rem] top-0 mt-2 w-60 rounded-md shadow-lg shadow-slate-200 text-sm overflow-hidden border border-gray-200 z-30">
                                    <div
                                        className="rounded-md bg-white shadow-xs"
                                        role="menu"
                                        aria-orientation="vertical"
                                        aria-labelledby="options-menu"
                                    >
                                        <div className="bg-white py-3">
                                            <div className="w-full text-left">
                                                <button
                                                    type="button"
                                                    onClick={onClickShow}
                                                    className="hover:bg-gray-100 text-left text-sm w-full px-3 py-1 flex items-center gap-2"
                                                >
                                                    <div className="text-gray-600 text-sm">
                                                        View
                                                    </div>
                                                </button>
                                            </div>
                                            <div className="pt-1 w-full text-left ">
                                                <button
                                                    type="button"
                                                    onClick={onClickEdit}
                                                    className="hover:bg-gray-100 text-left text-sm w-full px-3 py-1 flex items-center gap-2"
                                                >
                                                    <div className="text-gray-600 text-sm">
                                                        Edit
                                                    </div>
                                                </button>
                                            </div>
                                            <div className="pt-1 w-full text-left ">
                                                <button
                                                    type="button"
                                                    onClick={onClickReschedule}
                                                    className="hover:bg-gray-100 text-left text-sm w-full px-3 py-1 flex items-center gap-2"
                                                >
                                                    <div className="text-gray-600 text-sm">
                                                        Reschedule
                                                    </div>
                                                </button>
                                            </div>
                                            <div className="pt-1 w-full text-left ">
                                                <button
                                                    type="button"
                                                    onClick={onClickCancel}
                                                    className="hover:bg-gray-100 text-left text-sm w-full px-3 py-1 flex items-center gap-2"
                                                >
                                                    <div className="text-gray-600 text-sm">
                                                        Cancel
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="flex items-center h-full">
                            <div className="flex gap-3">
                                <div>
                                    {appointment.service ===
                                    CONSULTATION_SERVICE ? (
                                        <div className="p-2 rounded-full bg-violet-200">
                                            <ConsultationIcon className="stroke-violet-600" />
                                        </div>
                                    ) : (
                                        <div className="p-2 rounded-full bg-orange-100">
                                            <InjectionIcon className="fill-orange-400" />
                                        </div>
                                    )}
                                </div>
                                <div className="mb-1">
                                    <h6 className="text-md font-bold tracking-tight text-gray-900">
                                        {appointment.title}
                                    </h6>
                                    <p className="font-normal text-sm text-gray-700 mt-1">
                                        {`${moment(
                                            appointment.startTime,
                                            DEFAULT_TIME_FORMAT
                                        ).format(
                                            PROPER_TIME_FORMAT
                                        )} - ${moment(
                                            appointment.endTime,
                                            DEFAULT_TIME_FORMAT
                                        ).format(PROPER_TIME_FORMAT)}`}
                                    </p>
                                    <button
                                        type="button"
                                        onClick={onClickClient}
                                        className="font-normal text-sm text-gray-700 flex gap-2 mt-3"
                                    >
                                        <UserIcon
                                            className={
                                                appointment.service ===
                                                CONSULTATION_SERVICE
                                                    ? "stroke-violet-600"
                                                    : "stroke-orange-400"
                                            }
                                        />
                                        {appointment.client.name}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        },
        [dispatch, appointments, isDropdownShownBooleans]
    );

    useEffect(() => {
        const scheduleHtmlCards: React.ReactNode[] = [];
        const currentDate = moment(date).format(DEFAULT_DATE_FORMAT);

        if (hoursValueRef.current.length) {
            appointments.map((appointment, index) => {
                const appointmentDate = moment(appointment.date).format(
                    DEFAULT_DATE_FORMAT
                );

                const startTime = moment(
                    appointment.startTime,
                    DEFAULT_TIME_FORMAT
                ).format(PROPER_TIME_FORMAT);

                const endTime = moment(
                    appointment.endTime,
                    DEFAULT_TIME_FORMAT
                ).format(PROPER_TIME_FORMAT);

                if (appointmentDate !== currentDate) {
                    return;
                }

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

    const onClickNewAppointment = () => {
        dispatch(setIsCreateModalShown(true));
    };

    return (
        <div>
            <Head>
                <title>Appointments</title>
            </Head>
            <div className="flex">
                <div className="w-full border-b">
                    <div className="px-8 pt-8 pb-4 border-y">
                        <div className="text-neutral-400 text-sm mb-2">
                            Appointments
                        </div>
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
                                    onClick={onClickNewAppointment}
                                    className="text-white bg-primary hover:bg-orange-600 focus:ring-4 focus:ring-orange-200 font-medium rounded-xl text-sm px-5 py-2.5 mr-2 mb-2"
                                >
                                    New Appointment
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="h-[75vh] w-full overflow-x-auto">
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
                                                className={`border-r px-4 text-center ${
                                                    timeRange.includes(":00")
                                                        ? "pt-8 pb-0"
                                                        : "pt-8 pb-4"
                                                }`}
                                                width="8%"
                                            >
                                                {timeRange.includes(":00")
                                                    ? timeRange
                                                    : ""}
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
                    <div className="border w-[30%]">
                        <ViewClient />
                    </div>
                )}
            </div>
            <CreateAppointmentModal />
            <EditAppointmentModal />
            <RescheduleAppointmentModal />
            <ViewAppointmentModal />
        </div>
    );
}
