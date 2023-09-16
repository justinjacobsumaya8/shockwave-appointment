import moment from "moment";
import React, { useEffect, useState } from "react";
import veterinariesJson from "@/src/dummy/veterinaries.json";
import Veterinary, { VeterinaryInterface } from "@/src/models/Veterinary";
import { AppointmentInterface } from "@/src/models/Appointment";
import Time, { DEFAULT_TIME_FORMAT } from "@/src/models/Time";

import Image from "next/image";
import CloseIcon from "../icons/CloseIcon";
import EmailIcon from "../icons/EmailIcon";
import PhoneIcon from "../icons/PhoneIcon";
import PinIcon from "../icons/PinIcon";

export default function CreateAppointmentModal({
    isModalShown,
    appointments,
    setIsModalShown,
    setAppointments,
    setAlertMessage,
}: {
    isModalShown: boolean;
    appointments: AppointmentInterface[];
    setIsModalShown: React.Dispatch<React.SetStateAction<boolean>>;
    setAppointments: React.Dispatch<
        React.SetStateAction<AppointmentInterface[]>
    >;
    setAlertMessage: React.Dispatch<
        React.SetStateAction<{
            message: string;
            type: string;
        }>
    >;
}) {
    const timeRanges = Time.getTimeRanges(30);

    const [veterinaries, setVeterinaries] = useState<VeterinaryInterface[]>([]);

    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [selectedVeterinary, setSelectedVeterinary] =
        useState<VeterinaryInterface | null>(null);

    useEffect(() => {
        const vetData = veterinariesJson.map((data) => Veterinary.format(data));
        setVeterinaries(vetData);
    }, []);

    const onClickClose = () => {
        setIsModalShown(false);
    };

    const onSubmitCreate = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const timeStart = moment(startTime, DEFAULT_TIME_FORMAT);
        const timeEnd = moment(endTime, DEFAULT_TIME_FORMAT);

        if (title === "") {
            alert("Title is required.");
            return;
        }

        if (date === "") {
            alert("Date is required.");
            return;
        }

        if (startTime === "") {
            alert("Start time is required.");
            return;
        }

        if (endTime === "") {
            alert("Start time is required.");
            return;
        }

        if (!selectedVeterinary) {
            alert("Please select veterinary.");
            return;
        }

        if (timeEnd.isBefore(timeStart)) {
            alert("End time cannot be before start time");
            return;
        }

        const startDate = date + " " + timeStart.format("hh:mm:ss");
        const endDate = date + " " + timeEnd.format("hh:mm:ss");

        const newAppointment = {
            title,
            startDate,
            endDate,
            client: appointments[0].client,
            veterinary: selectedVeterinary,
        };

        setAlertMessage({
            message: "Appointment created successfully",
            type: "success",
        });
        setAppointments([...appointments, newAppointment]);
    };

    return (
        <>
            {isModalShown && (
                <div
                    tabIndex={-1}
                    aria-hidden="true"
                    className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 max-h-full justify-center items-center flex backdrop"
                >
                    <div className="relative w-full max-w-6xl max-h-full">
                        <div className="relative bg-white rounded-lg shadow">
                            <div className="flex items-start justify-between p-4 border-b rounded-t">
                                <h3 className="text-xl font-semibold text-gray-900">
                                    Create new
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
                                    id="form-create-appointment"
                                    onSubmit={onSubmitCreate}
                                >
                                    <div>
                                        <label
                                            htmlFor="title"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Title
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            id="title"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="e.g: Brownie's Vaccination"
                                            value={title}
                                            onChange={(event) =>
                                                setTitle(event.target.value)
                                            }
                                            required
                                        />
                                    </div>
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
                                            value={date}
                                            onChange={(event) =>
                                                setDate(event.target.value)
                                            }
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
                                                value={startTime}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                onChange={(event) =>
                                                    setStartTime(
                                                        event.target.value
                                                    )
                                                }
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
                                                value={endTime}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                onChange={(event) =>
                                                    setEndTime(
                                                        event.target.value
                                                    )
                                                }
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
                                                                    DEFAULT_TIME_FORMAT
                                                                ) <=
                                                                moment(
                                                                    startTime,
                                                                    DEFAULT_TIME_FORMAT
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
                                    <div>
                                        <label
                                            htmlFor="time"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Select Veterinary
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <div className="grid grid-cols-3 gap-3">
                                            {veterinaries.map(
                                                (veterinary, index) => (
                                                    <button
                                                        type="button"
                                                        key={index}
                                                        onClick={() =>
                                                            setSelectedVeterinary(
                                                                veterinary
                                                            )
                                                        }
                                                        className={`block max-w-sm p-6 border border-gray-200 rounded-lg shadow hover:bg-gray-100 ${
                                                            selectedVeterinary &&
                                                            selectedVeterinary.id ===
                                                                veterinary.id
                                                                ? "bg-gray-100"
                                                                : "bg-white"
                                                        }`}
                                                    >
                                                        <div className="mt-4 flex items-center gap-4">
                                                            <Image
                                                                src="/images/clinic-1.png"
                                                                width={52}
                                                                height={52}
                                                                alt="Clinic 1"
                                                            />
                                                            <div>
                                                                <p className="text-sm font-semibold">
                                                                    {
                                                                        veterinary.building
                                                                    }
                                                                </p>
                                                                <p className="text-sm text-gray-400">
                                                                    Kentucky
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <table className="mt-2">
                                                            <tbody>
                                                                <tr>
                                                                    <td
                                                                        width="40%"
                                                                        className="py-2"
                                                                    >
                                                                        <div className="flex items-center gap-2">
                                                                            <EmailIcon className="fill-gray-400" />
                                                                            <span className="text-sm text-gray-400">
                                                                                Email
                                                                            </span>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <span className="text-sm">
                                                                            branch1@gmail.com
                                                                        </span>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="py-2">
                                                                        <div className="flex items-center gap-2">
                                                                            <PhoneIcon className="stroke-gray-400" />
                                                                            <span className="text-sm text-gray-400">
                                                                                Phone
                                                                            </span>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <span className="text-sm">
                                                                            {
                                                                                veterinary.contactNumber
                                                                            }
                                                                        </span>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td className="py-2 align-baseline">
                                                                        <div className="flex items-center gap-2">
                                                                            <PinIcon className="stroke-gray-400" />
                                                                            <span className="text-sm text-gray-400">
                                                                                Address
                                                                            </span>
                                                                        </div>
                                                                    </td>
                                                                    <td className="py-2">
                                                                        <span className="text-sm">
                                                                            {
                                                                                veterinary.address
                                                                            }
                                                                        </span>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </button>
                                                )
                                            )}
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
                                    form="form-create-appointment"
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
