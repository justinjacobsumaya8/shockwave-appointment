import moment from "moment";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { editAppointmentActions } from "@/src/redux/slices/editAppointment.slice";
import { appointmentsActions } from "@/src/redux/slices/appointments.slice";
import { search } from "@/src/redux/actions/globalSearch.action";

import Image from "next/image";
import DotsVerticalIcon from "../icons/DotsVerticalIcon";
import EmailIcon from "../icons/EmailIcon";
import PhoneIcon from "../icons/PhoneIcon";
import PinIcon from "../icons/PinIcon";
import BreedIcon from "../icons/BreedIcon";
import GenderIcon from "../icons/GenderIcon";
import AgeIcon from "../icons/AgeIcon";
import CalendarIcon from "../icons/CalendarIcon";
import { DEFAULT_DATE_FORMAT } from "@/src/models/Time";
import { getAge } from "@/src/utils/helpers";

const { removeAppointment, setSelectedAppointment } = appointmentsActions;

export default function ShowClient() {
    const dispatch = useAppDispatch();

    const { selectedAppointment } = useAppSelector(
        (state) => state.appointments
    );

    if (!selectedAppointment) {
        return "";
    }

    const onClickReschedule = () => {
        dispatch(editAppointmentActions.setIsRescheduleModalShown(true));
        dispatch(
            editAppointmentActions.setActiveAppointment(selectedAppointment)
        );
    };

    const onClickCancel = () => {
        if (!confirm("Are you sure you want to cancel this appointment?")) {
            return;
        }

        dispatch(removeAppointment(selectedAppointment));
        dispatch(setSelectedAppointment(null));
        dispatch(search(""));
    };

    const onClickClose = () => {
        dispatch(setSelectedAppointment(null));
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
                <div>
                    <button type="button">
                        <DotsVerticalIcon />
                    </button>
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
