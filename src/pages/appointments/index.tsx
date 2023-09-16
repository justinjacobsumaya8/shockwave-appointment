import dynamic from "next/dynamic";

export default function Appointments() {
    const DayCalendar = dynamic(
        () => import("../../components/appointments/DayCalendar"),
        {
            ssr: false,
        }
    );

    return (
        <div>
            <DayCalendar />
        </div>
    );
}
