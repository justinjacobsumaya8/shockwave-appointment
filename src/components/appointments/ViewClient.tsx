import moment from "moment";
import { useState } from "react";
import { getAge } from "@/src/utils/helpers";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { search } from "@/src/redux/actions/globalSearch.action";
import { DEFAULT_DATE_FORMAT } from "@/src/models/Time";
import { editAppointmentActions } from "@/src/redux/slices/editAppointment.slice";
import { appointmentsActions } from "@/src/redux/slices/appointments.slice";
import { showAppointmentActions } from "@/src/redux/slices/showAppointment.slice";

import Image from "next/image";
import EmailIcon from "../icons/EmailIcon";
import PhoneIcon from "../icons/PhoneIcon";
import PinIcon from "../icons/PinIcon";
import BreedIcon from "../icons/BreedIcon";
import GenderIcon from "../icons/GenderIcon";
import AgeIcon from "../icons/AgeIcon";
import CalendarIcon from "../icons/CalendarIcon";
import DotsVerticalIcon from "../icons/DotsVerticalIcon";

const { removeAppointment, setSelectedAppointment } = appointmentsActions;

export default function ShowClient() {
    const dispatch = useAppDispatch();

    const [isDropdownShown, setIsDropdownShown] = useState(false);

    const { selectedAppointment } = useAppSelector(
        (state) => state.appointments
    );

    if (!selectedAppointment) {
        return "";
    }

    const onClickClose = () => {
        dispatch(setSelectedAppointment(null));
    };

    const onClickToggleDropdown = () => {
        setIsDropdownShown(!isDropdownShown);
    };

    const onClickShow = () => {
        setIsDropdownShown(false);

        dispatch(showAppointmentActions.setIsViewModalShown(true));
        dispatch(
            showAppointmentActions.setActiveAppointment(selectedAppointment)
        );
    };

    const onClickEdit = () => {
        setIsDropdownShown(false);

        dispatch(editAppointmentActions.setIsEditModalShown(true));
        dispatch(
            editAppointmentActions.setActiveAppointment(selectedAppointment)
        );
    };

    const onClickReschedule = () => {
        setIsDropdownShown(false);

        dispatch(editAppointmentActions.setIsRescheduleModalShown(true));
        dispatch(
            editAppointmentActions.setActiveAppointment(selectedAppointment)
        );
    };

    const onClickCancel = () => {
        setIsDropdownShown(false);

        if (!confirm("Are you sure you want to cancel this appointment?")) {
            return;
        }

        dispatch(removeAppointment(selectedAppointment));
        dispatch(setSelectedAppointment(null));
        dispatch(search(""));
    };

    return (
        <div className="overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between py-4 px-6 border-b">
                <div className="flex items-center gap-4">
                    <Image
                        src="/images/profile-1.png"
                        width={70}
                        height={70}
                        className="rounded-full"
                        alt="Profile 1"
                    />
                    <div>
                        <p
                            className="text-lg font-bold"
                            style={{ letterSpacing: " 0.48px" }}
                        >
                            {selectedAppointment.client.name}
                        </p>
                        <p className="text-sm text-gray-400">Client</p>
                    </div>
                </div>
                <div className="relative">
                    <button type="button" onClick={onClickToggleDropdown}>
                        <DotsVerticalIcon />
                    </button>
                    {isDropdownShown && (
                        <div className="absolute origin-top-right right-[1rem] top-15 mt-2 w-60 rounded-md shadow-lg shadow-slate-200 text-sm overflow-hidden border border-gray-200 z-30">
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
            </div>
            <div className="border-b py-4 px-8">
                <div className="uppercase text-xs font-bold text-gray-400 tracking-wide">
                    Contact Information
                </div>
                <table className="mt-2">
                    <tbody>
                        <tr>
                            <td width="100px" className="py-2">
                                <div className="flex items-center gap-2">
                                    <EmailIcon className="fill-gray-400" />
                                    <span className="text-sm text-gray-400">
                                        Email
                                    </span>
                                </div>
                            </td>
                            <td>
                                <span className="text-sm">
                                    chrissielee@gmail.com
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
                                    +01 234 567 8910
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
                                    1st Avenue, Golden Street, Springville
                                    Village, San Diego, California
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="border-b py-4 px-8">
                <div className="uppercase text-xs font-bold text-gray-400 tracking-wide">
                    Clinic Details
                </div>
                <div className="mt-4 flex items-center gap-4">
                    <Image
                        src="/images/clinic-1.png"
                        width={52}
                        height={52}
                        className="rounded-full"
                        alt="Clinic 1"
                    />
                    <div>
                        <p className="text-sm font-semibold">
                            {selectedAppointment.veterinary.building}
                        </p>
                        <p className="text-sm text-gray-400">Kentucky</p>
                    </div>
                </div>
                <table className="mt-2">
                    <tbody>
                        <tr>
                            <td width="100px" className="py-2">
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
                                        selectedAppointment.veterinary
                                            .contactNumber
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
                                    {selectedAppointment.veterinary.address}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="py-4 px-8">
                <div className="uppercase text-xs font-bold text-gray-400 tracking-wide">
                    Pet Details
                </div>
                <div className="mt-4 flex items-center gap-4">
                    <Image
                        src={selectedAppointment.pet.image}
                        width={52}
                        height={52}
                        className="rounded-full"
                        alt="Pet 1"
                    />
                    <div>
                        <p className="text-sm font-semibold">
                            {selectedAppointment.pet.name}
                        </p>
                        <p className="text-sm text-gray-400">
                            {selectedAppointment.pet.type}
                        </p>
                    </div>
                </div>
                <table className="mt-2">
                    <tbody>
                        <tr>
                            <td width="100px" className="py-2">
                                <div className="flex items-center gap-2">
                                    <BreedIcon className="stroke-gray-400" />
                                    <span className="text-sm text-gray-400">
                                        Breed
                                    </span>
                                </div>
                            </td>
                            <td>
                                <span className="text-sm">
                                    {selectedAppointment.pet.breed}
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td className="py-2">
                                <div className="flex items-center gap-2">
                                    <GenderIcon className="fill-gray-400" />
                                    <span className="text-sm text-gray-400">
                                        Sex
                                    </span>
                                </div>
                            </td>
                            <td>
                                <span className="text-sm">
                                    {selectedAppointment.pet.gender}
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td className="py-2 align-baseline">
                                <div className="flex items-center gap-2">
                                    <AgeIcon className="stroke-gray-400" />
                                    <span className="text-sm text-gray-400">
                                        Age
                                    </span>
                                </div>
                            </td>
                            <td className="py-2">
                                <span className="text-sm">
                                    {
                                        getAge(selectedAppointment.pet.birthday)
                                            .months
                                    }{" "}
                                    months
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td className="py-2 align-baseline">
                                <div className="flex items-center gap-2">
                                    <CalendarIcon className="fill-gray-400" />
                                    <span className="text-sm text-gray-400">
                                        Birthday
                                    </span>
                                </div>
                            </td>
                            <td className="py-2">
                                <span className="text-sm">
                                    {moment(
                                        selectedAppointment.pet.birthday,
                                        DEFAULT_DATE_FORMAT
                                    ).format("MMMM DD, YYYY")}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="p-4 border-t border-gray-200">
                <div>
                    <button
                        type="button"
                        onClick={onClickReschedule}
                        className="bg-primary hover:bg-orange-600 text-white w-full rounded-lg p-2 mb-3"
                    >
                        Reschedule Appointment
                    </button>
                </div>
                <div>
                    <button
                        type="button"
                        onClick={onClickClose}
                        className="bg-white text-gray-500 w-full rounded-lg p-2 border border-gray-200 hover:bg-gray-100 hover:border-gray-100"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
