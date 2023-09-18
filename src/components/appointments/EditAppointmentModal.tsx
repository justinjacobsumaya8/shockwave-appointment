import moment from "moment";
import React, { useEffect } from "react";
import { VeterinaryInterface } from "@/src/models/Veterinary";
import Time, {
    DEFAULT_TIME_FORMAT,
    PROPER_TIME_FORMAT,
} from "@/src/models/Time";
import { alertMessageActions } from "@/src/redux/slices/alertMessage.slice";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { fetchVeterinaries } from "@/src/redux/actions/veterinaries.action";
import { SERVICES } from "@/src/models/Appointment";
import { editAppointmentActions } from "@/src/redux/slices/editAppointment.slice";
import { appointmentsActions } from "@/src/redux/slices/appointments.slice";
import { search } from "@/src/redux/actions/globalSearch.action";

import Image from "next/image";
import CloseIcon from "../icons/CloseIcon";
import EmailIcon from "../icons/EmailIcon";
import PhoneIcon from "../icons/PhoneIcon";
import PinIcon from "../icons/PinIcon";

const { setAlertMessage } = alertMessageActions;
const { updateAppointment } = appointmentsActions;
const {
    setIsEditModalShown,
    resetActiveAppointment,
    setTitle,
    setService,
    setDate,
    setStartTime,
    setEndTime,
    setVeterinary,
    setPetName,
    setPetBreed,
    setPetBirthday,
    setPetGender,
    setPetType,
    setPetImage,
    setClientName,
} = editAppointmentActions;

export default function EditAppointmentModal() {
    const dispatch = useAppDispatch();

    const { isEditModalShown, activeAppointment } = useAppSelector(
        (state) => state.editAppointment
    );

    const { veterinaries } = useAppSelector((state) => state.veterinaries);

    const timeRanges = Time.getTimeRanges(30);

    useEffect(() => {
        dispatch(fetchVeterinaries());
    }, [dispatch]);

    const onClickClose = () => {
        dispatch(setIsEditModalShown(false));
        dispatch(resetActiveAppointment());
    };

    const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setTitle(event.target.value));
    };

    const onChangeService = (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setService(event.target.value));
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

    const onChangePetName = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setPetName(event.target.value));
    };

    const onChangePetBreed = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setPetBreed(event.target.value));
    };

    const onChangePetBirthday = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        dispatch(setPetBirthday(event.target.value));
    };

    const onChangePetGender = (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setPetGender(event.target.value));
    };

    const onChangePetType = (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setPetType(event.target.value));
    };

    const onChangePetImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];
            dispatch(setPetImage(URL.createObjectURL(file)));
        }
    };

    const onChangeClientName = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setClientName(event.target.value));
    };

    const onChangeVeterinary = (veterinary: VeterinaryInterface) => {
        dispatch(setVeterinary(veterinary));
    };

    const onSubmitEdit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!activeAppointment) {
            return alert("Appointment not found");
        }

        const startTime = moment(
            activeAppointment.startTime,
            PROPER_TIME_FORMAT
        );
        const endTime = moment(activeAppointment.endTime, PROPER_TIME_FORMAT);

        if (activeAppointment.title === "") {
            alert("Title is required.");
            return;
        }

        if (activeAppointment.service === "") {
            alert("Service is required.");
            return;
        }

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

        if (!activeAppointment.veterinary) {
            alert("Please select veterinary.");
            return;
        }

        if (endTime.isBefore(startTime)) {
            alert("End time cannot be before start time");
            return;
        }

        if (activeAppointment.pet.name === "") {
            alert("Pet name is required.");
            return;
        }

        if (activeAppointment.pet.breed === "") {
            alert("Pet breed is required.");
            return;
        }

        if (activeAppointment.pet.birthday === "") {
            alert("Pet birthday is required.");
            return;
        }

        if (activeAppointment.pet.type === "") {
            alert("Pet type is required.");
            return;
        }

        if (activeAppointment.pet.image === "") {
            alert("Pet image is required.");
            return;
        }

        if (activeAppointment.client.name === "") {
            alert("Client name is required.");
            return;
        }

        dispatch(
            setAlertMessage({
                message: "Appointment updated successfully",
                type: "success",
            })
        );

        dispatch(
            updateAppointment({
                ...activeAppointment,
                startTime: startTime.format("HH:mm:ss"),
                endTime: endTime.format("HH:mm:ss"),
            })
        );
        dispatch(setIsEditModalShown(false));
        dispatch(resetActiveAppointment());
        dispatch(search(""));
    };

    return (
        <>
            {isEditModalShown && activeAppointment && (
                <div
                    tabIndex={-1}
                    aria-hidden="true"
                    className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 max-h-full justify-center items-center flex backdrop"
                >
                    <div className="relative w-full max-w-6xl max-h-full">
                        <div className="relative bg-white rounded-lg shadow">
                            <div className="flex items-start justify-between p-4 border-b rounded-t">
                                <h3 className="text-xl font-semibold text-gray-900">
                                    Edit Appointment
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
                                            value={activeAppointment.title}
                                            onChange={onChangeTitle}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="service"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Service
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <select
                                            id="service"
                                            value={activeAppointment.service}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            onChange={onChangeService}
                                        >
                                            <option value="">--</option>
                                            {SERVICES.map((service, index) => (
                                                <option
                                                    key={index}
                                                    value={service}
                                                >
                                                    {service}
                                                </option>
                                            ))}
                                        </select>
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
                                                                    PROPER_TIME_FORMAT
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
                                    <hr />
                                    <div className="uppercase text-xs font-bold text-gray-400 tracking-wide">
                                        Pet Details
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <label
                                                htmlFor="pet-name"
                                                className="block mb-2 text-sm font-medium text-gray-900"
                                            >
                                                Name
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                id="pet-name"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                value={
                                                    activeAppointment.pet.name
                                                }
                                                placeholder="e.g: Brownie"
                                                onChange={onChangePetName}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="pet-breed"
                                                className="block mb-2 text-sm font-medium text-gray-900"
                                            >
                                                Breed
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                id="pet-breed"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                value={
                                                    activeAppointment.pet.breed
                                                }
                                                placeholder="e.g: Bulldog"
                                                onChange={onChangePetBreed}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <label
                                                htmlFor="pet-birthday"
                                                className="block mb-2 text-sm font-medium text-gray-900"
                                            >
                                                Birthday
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="date"
                                                id="pet-birthday"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                value={
                                                    activeAppointment.pet
                                                        .birthday
                                                }
                                                onChange={onChangePetBirthday}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="pet-gender"
                                                className="block mb-2 text-sm font-medium text-gray-900"
                                            >
                                                Gender
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <select
                                                id="pet-gender"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                value={
                                                    activeAppointment.pet.gender
                                                }
                                                onChange={onChangePetGender}
                                                required
                                            >
                                                <option value="">--</option>
                                                <option value="Male">
                                                    Male
                                                </option>
                                                <option value="Female">
                                                    Female
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <label
                                                htmlFor="pet-type"
                                                className="block mb-2 text-sm font-medium text-gray-900"
                                            >
                                                Type
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <select
                                                id="pet-type"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                value={
                                                    activeAppointment.pet.type
                                                }
                                                onChange={onChangePetType}
                                                required
                                            >
                                                <option value="">--</option>
                                                <option value="Dog">Dog</option>
                                                <option value="Cat">Cat</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="pet-image"
                                                className="block mb-2 text-sm font-medium text-gray-900"
                                            >
                                                Image
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <div className="flex gap-3">
                                                <input
                                                    type="file"
                                                    id="pet-image"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                    onChange={onChangePetImage}
                                                    accept="image/*"
                                                />
                                                <Image
                                                    src={
                                                        activeAppointment.pet
                                                            .image
                                                    }
                                                    width={52}
                                                    height={52}
                                                    className="rounded-full"
                                                    alt="Pet 1"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="client-name"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            {`Owner's name`}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            id="client-name"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            value={
                                                activeAppointment.client.name
                                            }
                                            onChange={onChangeClientName}
                                            required
                                        />
                                    </div>
                                    <hr />
                                    <div>
                                        <div className="uppercase text-xs font-bold text-gray-400 tracking-wide mb-5">
                                            Select Veterinary
                                        </div>
                                        <div className="grid grid-cols-3 gap-3">
                                            {veterinaries.map((data, index) => (
                                                <button
                                                    type="button"
                                                    key={index}
                                                    onClick={() =>
                                                        onChangeVeterinary(data)
                                                    }
                                                    className={`block max-w-sm p-6 text-left border border-gray-200 rounded-lg shadow hover:bg-gray-100 ${
                                                        activeAppointment
                                                            .veterinary.id ===
                                                        data.id
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
                                                                {data.name}
                                                            </p>
                                                            <p className="text-sm text-gray-400">
                                                                {data.building}
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
                                                                            data.contactNumber
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
                                                                            data.address
                                                                        }
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </button>
                                            ))}
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
