import dynamic from "next/dynamic";
import { SetAlertMessageType } from "@/src/components/common/AlertMessage";

export default function Appointments({
    setAlertMessage,
}: {
    setAlertMessage: SetAlertMessageType;
}) {
    const DayCalendar = dynamic(
        () => import("../../components/appointments/DayCalendar"),
        {
            ssr: false,
        }
    );

    return (
        <div>
            <DayCalendar setAlertMessage={setAlertMessage} />
        </div>
    );
}
