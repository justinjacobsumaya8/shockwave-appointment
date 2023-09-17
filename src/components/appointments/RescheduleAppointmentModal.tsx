import moment from "moment";
import React, { useEffect } from "react";
import Time, {
    DEFAULT_TIME_FORMAT,
    PROPER_TIME_FORMAT,
} from "@/src/models/Time";
import { alertMessageActions } from "@/src/redux/slices/alertMessage.slice";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { fetchVeterinaries } from "@/src/redux/actions/veterinaries.action";
import { editAppointmentActions } from "@/src/redux/slices/editAppointment.slice";
import { appointmentsActions } from "@/src/redux/slices/appointments.slice";

import CloseIcon from "../icons/CloseIcon";
import { search } from "@/src/redux/actions/globalSearch.action";

const { setAlertMessage } = alertMessageActions;
const { updateAppointment } = appointmentsActions;
const {
    setIsRescheduleModalShown,
    resetActiveAppointment,
    setDate,
    setStartTime,
    setEndTime,
} = editAppointmentActions;

export default function RescheduleAppointmentModal() {
    const dispatch = useAppDispatch();

    const { isRescheduleModalShown, activeAppointment } = useAppSelector(
        (state) => state.editAppointment
    );

    const timeRanges = Time.getTimeRanges(30);

    useEffect(() => {
        dispatch(fetchVeterinaries());
    }, [dispatch]);

    const onClickClose = () => {
        dispatch(setIsRescheduleModalShown(false));
        dispatch(resetActiveAppointment());
    };

    const onChangeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setDate(event.target.value));
    };

    const onChangeStartDate = (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setStartTime(event.target.value));
    };

    const onChangeEndDate = (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setEndTime(event.target.value));
    };

    const onSubmitEdit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!activeAppointment) {
            return alert("Appointment not found");
        }

        const startTime = moment(
            activeAppointment.startTime,
            DEFAULT_TIME_FORMAT
        );
        const endTime = moment(activeAppointment.endTime, DEFAULT_TIME_FORMAT);

        if (activeAppointment.date === "") {
            alert("Date is required.");
            return;
        }

        if (activeAppointment.startTime === "") {
            alert("Start time is required.");
            return;
        }

        if (activeAppointment.endTime === "") {
            alert("Start time is required.");
            return;
        }

        if (endTime.isBefore(startTime)) {
            alert("End time cannot be before start time");
            return;
        }

        dispatch(
            setAlertMessage({
                message: "Appointment updated successfully",
                type: "success",
            })
        );

        dispatch(updateAppointment(activeAppointment));
        dispatch(setIsRescheduleModalShown(false));
        dispatch(resetActiveAppointment());
        dispatch(search(""));
    };

    return (
        <>
            {isRescheduleModalShown && activeAppointment && (
                <div
                    tabIndex={-1}
                    aria-hidden="true"
                    className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 max-h-full justify-center items-center flex backdrop"
                >
                    <div className="relative w-full max-w-xl max-h-full">
                        <div className="relative bg-white rounded-lg shadow">
                            <div className="flex items-start justify-between p-4 border-b rounded-t">
                                <h3 className="text-xl font-semibold text-gray-900">
                                    Reschedule Appointment
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
                                <form
                                    className="space-y-6"
                                    id="form-edit-appointment"
                                    onSubmit={onSubmitEdit}
                                >
                                    <div>
                                        <label
                                            htmlFor="date"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Date
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="date"
                                            id="date"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            value={activeAppointment.date}
                                            onChange={onChangeDate}
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <label
                                                htmlFor="start-time"
                                                className="block mb-2 text-sm font-medium text-gray-900"
                                            >
                                                Start Time
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <select
                                                id="start-time"
                                                value={
                                                    activeAppointment.startTime
                                                }
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                onChange={onChangeStartDate}
                                            >
                                                <option value="">--</option>
                                                {timeRanges.map(
                                                    (timeRange, index) => (
                                                        <option
                                                            key={index}
                                                            value={timeRange}
                                                        >
                                                            {timeRange}
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="end-time"
                                                className="block mb-2 text-sm font-medium text-gray-900"
                                            >
                                                End Time
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <select
                                                id="end-time"
                                                value={
                                                    activeAppointment.endTime
                                                }
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                onChange={onChangeEndDate}
                                            >
                                                <option value="">--</option>
                                                {timeRanges.map(
                                                    (timeRange, index) => (
                                                        <option
                                                            key={index}
                                                            value={timeRange}
                                                            disabled={
                                                                moment(
                                                                    timeRange,
                                                                    PROPER_TIME_FORMAT
                                                                ) <=
                                                                moment(
                                                                    activeAppointment.startTime,
                                                                    "hh:mm:ss"
                                                                )
                                                            }
                                                        >
                                                            {timeRange}
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="flex items-center justify-end p-6 space-x-2 border-t border-gray-200 rounded-b">
                                <button
                                    type="button"
                                    onClick={onClickClose}
                                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                    form="form-edit-appointment"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
