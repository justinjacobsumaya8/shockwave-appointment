import dynamic from "next/dynamic";
import PageLayout from "@/src/components/layouts/PageLayout";

export default function Appointments() {
    const DayCalendar = dynamic(
        () => import("../../components/appointments/DayCalendar"),
        {
            ssr: false,
        }
    );

    return (
        <PageLayout>
            <DayCalendar />
        </PageLayout>
    );
}
