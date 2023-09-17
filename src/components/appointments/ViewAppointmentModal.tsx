import moment from "moment";
import React from "react";
import {
    DEFAULT_DATE_FORMAT,
    DEFAULT_TIME_FORMAT,
    PROPER_TIME_FORMAT,
} from "@/src/models/Time";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { showAppointmentActions } from "@/src/redux/slices/showAppointment.slice";

import Image from "next/image";
import CloseIcon from "../icons/CloseIcon";
import EmailIcon from "../icons/EmailIcon";
import PhoneIcon from "../icons/PhoneIcon";
import PinIcon from "../icons/PinIcon";

const { setIsViewModalShown, resetActiveAppointment } = showAppointmentActions;

export default function ViewAppointmentModal() {
    const dispatch = useAppDispatch();

    const { isViewModalShown, activeAppointment } = useAppSelector(
        (state) => state.showAppointment
    );

    const onClickClose = () => {
        dispatch(setIsViewModalShown(false));
        dispatch(resetActiveAppointment());
    };

    return (
        <>
            {isViewModalShown && activeAppointment && (
                <div
                    tabIndex={-1}
                    aria-hidden="true"
                    className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 max-h-full justify-center items-center flex backdrop"
                >
                    <div className="relative w-full max-w-lg max-h-full">
                        <div className="relative bg-white rounded-lg shadow">
                            <div className="flex items-start justify-between p-4 border-b rounded-t">
                                <h3 className="text-xl font-semibold text-gray-900">
                                    View Appointment
                                </h3>
                                <button
                                    type="button"
                                    onClick={onClickClose}
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
                                >
                                    <CloseIcon className="w-3 h-3" />
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="grid grid-cols-2">
                                    <div>
                                        <label
                                            htmlFor="title"
                                            className="block mb-2 text-sm font-medium text-gray-400"
                                        >
                                            Title
                                        </label>
                                        <span>{activeAppointment.title}</span>
                                    </div>
                                    <div>
                                        <div>
                                            <label
                                                htmlFor="service"
                                                className="block mb-2 text-sm font-medium text-gray-400"
                                            >
                                                Service
                                            </label>
                                            <span>
                                                {activeAppointment.service}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label
                                            htmlFor="date"
                                            className="block mb-2 text-sm font-medium text-gray-400"
                                        >
                                            Date
                                        </label>
                                        <span>
                                            {moment(
                                                activeAppointment.date,
                                                DEFAULT_DATE_FORMAT
                                            ).format("DD-MMM-YYYY")}
                                        </span>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="start-time"
                                            className="block mb-2 text-sm font-medium text-gray-400"
                                        >
                                            Time
                                        </label>
                                        <span>
                                            {moment(
                                                activeAppointment.startTime,
                                                DEFAULT_TIME_FORMAT
                                            ).format(PROPER_TIME_FORMAT)}{" "}
                                            -{" "}
                                            {moment(
                                                activeAppointment.endTime,
                                                DEFAULT_TIME_FORMAT
                                            ).format(PROPER_TIME_FORMAT)}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <label
                                        htmlFor="time"
                                        className="block mb-2 text-sm font-medium text-gray-400"
                                    >
                                        Veterinary
                                    </label>
                                    <span>
                                        {
                                            activeAppointment.client.veterinary
                                                .name
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
