import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { search } from "@/src/redux/actions/globalSearch.action";
import {
    DEFAULT_DATE_FORMAT,
    DEFAULT_TIME_FORMAT,
    PROPER_TIME_FORMAT,
} from "@/src/models/Time";
import InjectionIcon from "@/src/components/icons/InjectionIcon";
import {
    AppointmentInterface,
    CONSULTATION_SERVICE,
} from "@/src/models/Appointment";
import { editAppointmentActions } from "@/src/redux/slices/editAppointment.slice";
import { showAppointmentActions } from "@/src/redux/slices/showAppointment.slice";
import { createAppointmentActions } from "@/src/redux/slices/createAppointment.slice";
import { appointmentsActions } from "@/src/redux/slices/appointments.slice";

import PageLayout from "@/src/components/layouts/PageLayout";
import ConsultationIcon from "@/src/components/icons/ConsultationIcon";
import UserIcon from "@/src/components/icons/UserIcon";
import DotsVertical from "@/src/components/icons/DotsVerticalIcon";
import EditAppointmentModal from "@/src/components/appointments/EditAppointmentModal";
import ViewAppointmentModal from "@/src/components/appointments/ViewAppointmentModal";
import CreateAppointmentModal from "@/src/components/appointments/CreateAppointmentModal";
import RescheduleAppointmentModal from "@/src/components/appointments/RescheduleAppointmentModal";
import ViewClient from "@/src/components/appointments/ViewClient";

const { removeAppointment, setSelectedAppointment } = appointmentsActions;
const { setIsCreateModalShown } = createAppointmentActions;

export default function Search() {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const { selectedAppointment } = useAppSelector(
        (state) => state.appointments
    );
    const [isDropdownShownBooleans, setIsDropdownShownBooleans] = useState<
        boolean[]
    >([]);
    const { appointments } = useAppSelector((state) => state.globalSearch);

    useEffect(() => {
        dispatch(search(router.query.keyword as string));
    }, [dispatch, router]);

    useEffect(() => {
        let booleans = [];
        for (let index = 0; index < appointments.length; index++) {
            booleans[index] = false;
        }
        setIsDropdownShownBooleans(booleans);
    }, [appointments]);

    const onClickNewAppointment = () => {
        dispatch(setIsCreateModalShown(true));
    };

    const onClickToggleDropdown = (index: number) => {
        isDropdownShownBooleans[index] = !isDropdownShownBooleans[index];
        setIsDropdownShownBooleans([...isDropdownShownBooleans]);
    };

    const onClickShow = (index: number, appointment: AppointmentInterface) => {
        isDropdownShownBooleans[index] = false;
        setIsDropdownShownBooleans([...isDropdownShownBooleans]);

        dispatch(showAppointmentActions.setIsViewModalShown(true));
        dispatch(showAppointmentActions.setActiveAppointment(appointment));
    };

    const onClickEdit = (index: number, appointment: AppointmentInterface) => {
        isDropdownShownBooleans[index] = false;
        setIsDropdownShownBooleans([...isDropdownShownBooleans]);

        dispatch(editAppointmentActions.setIsEditModalShown(true));
        dispatch(editAppointmentActions.setActiveAppointment(appointment));
    };

    const onClickReschedule = (
        index: number,
        appointment: AppointmentInterface
    ) => {
        isDropdownShownBooleans[index] = false;
        setIsDropdownShownBooleans([...isDropdownShownBooleans]);

        dispatch(editAppointmentActions.setIsRescheduleModalShown(true));
        dispatch(editAppointmentActions.setActiveAppointment(appointment));
    };

    const onClickCancel = (
        index: number,
        appointment: AppointmentInterface
    ) => {
        isDropdownShownBooleans[index] = false;
        setIsDropdownShownBooleans([...isDropdownShownBooleans]);

        if (!confirm("Are you sure you want to cancel this appointment?")) {
            return;
        }

        dispatch(removeAppointment(appointment));
        router.push("/search?keyword=");
    };

    const onClickViewClient = (appointment: AppointmentInterface) => {
        dispatch(setSelectedAppointment(appointment));
    };

    return (
        <PageLayout>
            <div className="flex">
                <div className="px-8 pt-8 pb-4 w-full">
                    <div className="mb-4">
                        <button
                            type="button"
                            onClick={onClickNewAppointment}
                            className="text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:ring-orange-200 font-medium rounded-xl text-sm px-5 py-2.5 mr-2 mb-2"
                        >
                            New Appointment
                        </button>
                    </div>
                    {appointments.length > 0 ? (
                        <div>
                            {appointments.map((appointment, index) => (
                                <div
                                    key={index}
                                    className={`relative p-6 flex w-full text-left border border-transparent gap-4 rounded-xl mb-6 ${
                                        appointment.service ===
                                        CONSULTATION_SERVICE
                                            ? "bg-violet-100 border-violet-500 hover:bg-violet-200"
                                            : "bg-orange-50 border-orange-500 hover:bg-orange-100"
                                    }`}
                                >
                                    <div className="absolute right-3 top-5">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                onClickToggleDropdown(index)
                                            }
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
                                                                onClick={() =>
                                                                    onClickShow(
                                                                        index,
                                                                        appointment
                                                                    )
                                                                }
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
                                                                onClick={() =>
                                                                    onClickEdit(
                                                                        index,
                                                                        appointment
                                                                    )
                                                                }
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
                                                                onClick={() =>
                                                                    onClickReschedule(
                                                                        index,
                                                                        appointment
                                                                    )
                                                                }
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
                                                                onClick={() => {
                                                                    onClickCancel(
                                                                        index,
                                                                        appointment
                                                                    );
                                                                }}
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
                                    <div>
                                        <h6 className="text-md font-bold tracking-tight text-gray-900">
                                            {appointment.title}
                                        </h6>
                                        <p className="font-medium text-xs text-gray-700 mt-1">
                                            {moment(
                                                appointment.date,
                                                DEFAULT_DATE_FORMAT
                                            ).format("DD-MMM-YYYY")}
                                        </p>
                                        <p className="font-medium text-xs text-gray-700 mt-1">
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
                                            onClick={() =>
                                                onClickViewClient(appointment)
                                            }
                                            className="font-normal text-sm text-gray-700 flex items-center gap-2 mt-3"
                                        >
                                            <UserIcon
                                                className={
                                                    "h-4 w-4 stroke-violet-600"
                                                }
                                            />
                                            <div className="text-xs hover:text-purple">
                                                {appointment.client.name}
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div>
                            <span>No data available.</span>
                        </div>
                    )}
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
        </PageLayout>
    );
}
