import { AppointmentInterface } from "@/src/models/Appointment";

import Image from "next/image";
import DotsVerticalIcon from "../icons/DotsVerticalIcon";
import EmailIcon from "../icons/EmailIcon";
import PhoneIcon from "../icons/PhoneIcon";
import PinIcon from "../icons/PinIcon";
import BreedIcon from "../icons/BreedIcon";
import GenderIcon from "../icons/GenderIcon";
import AgeIcon from "../icons/AgeIcon";
import CalendarIcon from "../icons/CalendarIcon";

export default function ShowAppointment({
    selectedAppointment,
}: {
    selectedAppointment: AppointmentInterface;
}) {
    return (
        <div>
            <div className="flex items-center justify-between py-4 px-6 border-b">
                <div className="flex items-center gap-4">
                    <Image
                        src="/images/profile-1.png"
                        width={70}
                        height={70}
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
                            <td width="40%" className="py-2">
                                <div className="flex items-center gap-2">
                                    <EmailIcon className="fill-gray-400" />
                                    <span className="text-sm text-gray-400">
                                        Email
                                    </span>
                                </div>
                            </td>
                            <td>
                                <span className="text-sm">
                                    {selectedAppointment.client.email}
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
                                    {selectedAppointment.client.phone}
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
                                    {selectedAppointment.client.address}
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
                            <td width="40%" className="py-2">
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
                        src="/images/pet-1.png"
                        width={52}
                        height={52}
                        alt="Pet 1"
                    />
                    <div>
                        <p className="text-sm font-semibold">Brownie</p>
                        <p className="text-sm text-gray-400">Dog</p>
                    </div>
                </div>
                <table className="mt-2">
                    <tbody>
                        <tr>
                            <td width="50%" className="py-2">
                                <div className="flex items-center gap-2">
                                    <BreedIcon className="stroke-gray-400" />
                                    <span className="text-sm text-gray-400">
                                        Breed
                                    </span>
                                </div>
                            </td>
                            <td>
                                <span className="text-sm">French Bulldog</span>
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
                                <span className="text-sm">Male</span>
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
                                <span className="text-sm">10 months</span>
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
                                    January 12, 2023
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
