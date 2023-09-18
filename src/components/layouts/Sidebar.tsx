import { useState } from "react";

import Link from "next/link";
import DoubleLeftArrow from "@/src/components/icons/DoubleLeftArrow";
import LogoIcon from "@/src/components/icons/LogoIcon";
import HomeIcon from "@/src/components/icons/HomeIcon";
import AppointmentsIcon from "@/src/components/icons/AppointmentsIcon";
import EmailIcon from "@/src/components/icons/EmailIcon";
import ContactIcon from "@/src/components/icons/ContactIcon";
import DataAnalyticsIcon from "@/src/components/icons/DataAnalyticsIcon";
import HelpCenterIcon from "@/src/components/icons/HelpCenterIcon";
import SubscriptionIcon from "@/src/components/icons/SubscriptionIcon";
import SettingsIcon from "@/src/components/icons/SettingsIcon";

export default function Sidebar() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    return (
        <aside
            className={`relative flex flex-col border-r transition-all ease-in duration-300 z-40 ${
                sidebarOpen ? "w-64" : "w-24"
            }`}
        >
            <nav
                className={`fixed flex-1 flex flex-col bg-midnight h-full transition-all ease-in duration-300  ${
                    sidebarOpen ? "w-64" : "w-24"
                }`}
            >
                <div
                    className={`min-h-[6rem] border-b border-gray-700 flex items-center justify-center`}
                >
                    <div
                        className={`flex items-center justify-center gap-2 py-6 pr-6 transition-all ease-in-out duration-200 ${
                            sidebarOpen ? "pl-6" : "pl-[5.2rem] pr-6"
                        }`}
                    >
                        <span
                            className={`[&>svg]:h-7 [&>svg]:w-7 ${
                                sidebarOpen ? "" : ""
                            }`}
                        >
                            <LogoIcon className="fill-primary h-7 w-7" />
                        </span>
                        <div
                            className={`text-primary font-semibold uppercase text-sm transition-all ease-in-out duration-200 ${
                                sidebarOpen ? "visible" : "invisible"
                            } `}
                        >
                            Lorem
                        </div>
                    </div>
                </div>
                <div className="flex flex-col h-full py-10">
                    <Link
                        href="/appointments"
                        className={`relative group flex items-center gap-3 py-4 transition-all ease hover:bg-neutral-800 ${
                            sidebarOpen ? "px-8" : "px-10"
                        } `}
                    >
                        <span className="[&>svg]:h-4 [&>svg]:w-4">
                            <HomeIcon
                                className={`stroke-white h-4 w-4 group-hover:stroke-primary `}
                            />
                        </span>
                        <div
                            className={`text-sm transition-all text-white group-hover:text-primary ${
                                sidebarOpen ? "visible" : "invisible"
                            } `}
                        >
                            Home
                        </div>
                        <div className="absolute invisible group-hover:visible w-1 h-full bg-primary right-0 transition-all ease-linear"></div>
                    </Link>
                    <Link
                        href="/appointments"
                        className={`relative group flex items-center gap-3 py-4 transition-all ease hover:bg-neutral-800 ${
                            sidebarOpen ? "px-8" : "px-10"
                        } `}
                    >
                        <span className="[&>svg]:h-4 [&>svg]:w-4">
                            <AppointmentsIcon
                                className={`fill-white h-4 w-4 group-hover:fill-primary`}
                            />
                        </span>
                        <div
                            className={`text-sm transition-all text-white group-hover:text-primary ${
                                sidebarOpen ? "visible" : "invisible"
                            } `}
                        >
                            Appointments
                        </div>
                        <div className="absolute invisible group-hover:visible w-1 h-full bg-primary right-0 transition-all ease-linear"></div>
                    </Link>
                    <Link
                        href="/appointments"
                        className={`relative group flex items-center gap-3 py-4 transition-all ease hover:bg-neutral-800 ${
                            sidebarOpen ? "px-8" : "px-10"
                        } `}
                    >
                        <span className="[&>svg]:h-4 [&>svg]:w-4">
                            <EmailIcon
                                className={`fill-white h-4 w-4 group-hover:fill-primary`}
                            />
                        </span>
                        <div
                            className={`text-sm transition-all text-white group-hover:text-primary ${
                                sidebarOpen ? "visible" : "invisible"
                            } `}
                        >
                            Messages
                        </div>
                        <div className="absolute invisible group-hover:visible w-1 h-full bg-primary right-0 transition-all ease-linear"></div>
                    </Link>
                    <Link
                        href="/appointments"
                        className={`relative group flex items-center gap-3 py-4 transition-all ease hover:bg-neutral-800 ${
                            sidebarOpen ? "px-8" : "px-10"
                        } `}
                    >
                        <span className="[&>svg]:h-4 [&>svg]:w-4">
                            <ContactIcon
                                className={`fill-white h-4 w-4 group-hover:fill-primary`}
                            />
                        </span>
                        <div
                            className={`text-sm transition-all text-white group-hover:text-primary ${
                                sidebarOpen ? "visible" : "invisible"
                            } `}
                        >
                            Contacts
                        </div>
                        <div className="absolute invisible group-hover:visible w-1 h-full bg-primary right-0 transition-all ease-linear"></div>
                    </Link>
                    <Link
                        href="/appointments"
                        className={`relative group flex items-center gap-3 py-4 transition-all ease hover:bg-neutral-800 ${
                            sidebarOpen ? "px-8" : "px-10"
                        } `}
                    >
                        <span className="[&>svg]:h-4 [&>svg]:w-4">
                            <DataAnalyticsIcon
                                className={`fill-white h-4 w-4 group-hover:fill-primary`}
                            />
                        </span>
                        <div
                            className={`text-sm transition-all text-white group-hover:text-primary ${
                                sidebarOpen ? "visible" : "invisible"
                            } `}
                        >
                            Data Analytics
                        </div>
                        <div className="absolute invisible group-hover:visible w-1 h-full bg-primary right-0 transition-all ease-linear"></div>
                    </Link>
                    <Link
                        href="/appointments"
                        className={`relative group flex items-center gap-3 py-4 transition-all ease hover:bg-neutral-800 ${
                            sidebarOpen ? "px-8" : "px-10"
                        } `}
                    >
                        <span className="[&>svg]:h-4 [&>svg]:w-4">
                            <SubscriptionIcon
                                className={`stroke-white h-4 w-4 group-hover:stroke-primary`}
                            />
                        </span>
                        <div
                            className={`text-sm transition-all text-white group-hover:text-primary ${
                                sidebarOpen ? "visible" : "invisible"
                            } `}
                        >
                            Subscription
                        </div>
                        <div className="absolute invisible group-hover:visible w-1 h-full bg-primary right-0 transition-all ease-linear"></div>
                    </Link>
                    <Link
                        href="/appointments"
                        className={`relative group flex items-center gap-3 py-4 transition-all ease hover:bg-neutral-800 ${
                            sidebarOpen ? "px-8" : "px-10"
                        } `}
                    >
                        <span className="[&>svg]:h-4 [&>svg]:w-4">
                            <HelpCenterIcon
                                className={`fill-white h-4 w-4 group-hover:fill-primary`}
                            />
                        </span>
                        <div
                            className={`text-sm transition-all ease-in-out text-white group-hover:text-primary ${
                                sidebarOpen ? "visible" : "invisible"
                            } `}
                        >
                            Help Center
                        </div>
                        <div className="absolute invisible group-hover:visible w-1 h-full bg-primary right-0 transition-all ease-linear"></div>
                    </Link>
                    <Link
                        href="/appointments"
                        className={`relative group flex items-center gap-3 py-4 transition-all ease hover:bg-neutral-800 ${
                            sidebarOpen ? "px-8" : "px-10"
                        } `}
                    >
                        <span className="[&>svg]:h-4 [&>svg]:w-4">
                            <SettingsIcon
                                className={`fill-white h-4 w-4 group-hover:fill-primary`}
                            />
                        </span>
                        <div
                            className={`text-sm transition-all text-white group-hover:text-primary ${
                                sidebarOpen ? "visible" : "invisible"
                            } `}
                        >
                            Settings
                        </div>
                        <div className="absolute invisible group-hover:visible w-1 h-full bg-primary right-0 transition-all ease-linear"></div>
                    </Link>
                </div>
                <div
                    className={`gap-3 text-center flex flex-col justify-center border-t border-gray-700  ${
                        sidebarOpen ? "py-10 px-10" : "px-2 py-10"
                    }`}
                >
                    <div className="flex justify-center">
                        <span
                            className={`[&>svg]:h-5 [&>svg]:w-5 ${
                                sidebarOpen ? "" : ""
                            }`}
                        >
                            <LogoIcon className="fill-primary h-5 w-5" />
                        </span>
                    </div>
                    <div className={`text-xs text-gray-500`}>© Lorem 2023</div>
                </div>
                <div className="h-full absolute -right-7 flex justify-center place-items-center">
                    <button
                        type="button"
                        className="p-1.5 mr-4 bg-neutral-700 rounded-md hover:bg-primary"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        <div className="flex">
                            <DoubleLeftArrow
                                className={`fill-white w-4 h-4 transition-all ${
                                    !sidebarOpen ? "rotate-180" : ""
                                }`}
                            />
                        </div>
                    </button>
                </div>
            </nav>
        </aside>
    );
}
