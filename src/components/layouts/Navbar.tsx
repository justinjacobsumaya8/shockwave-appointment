import user from "@/src/dummy/user.json";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/src/redux/hooks";
import { appointmentsActions } from "@/src/redux/slices/appointments.slice";

import Image from "next/image";
import SearchIcon from "@/src/components/icons/SearchIcon";
import BottomArrowIcon from "@/src/components/icons/BottomArrowIcon";
import NotificationIcon from "@/src/components/icons/NotificationIcon";
import SettingsIcon from "@/src/components/icons/SettingsIcon";
import SignoutIcon from "@/src/components/icons/SignoutIcon";
import UserImage from "@/public/images/user-img-1.jpg";

const { setSelectedAppointment } = appointmentsActions;

export default function Navbar() {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const [showUserDropdown, setShowUserDropdown] = useState(false);

    const [keyword, setKeyword] = useState("");

    const onChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value === "") {
            router.push(`/search?keyword=`);
        }
        setKeyword(event.target.value);
    };

    const onSubmitSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(setSelectedAppointment(null));

        router.push(`/search?keyword=${keyword}`);
    };

    useEffect(() => {
        setKeyword((router.query.keyword ?? "") as string);
    }, [router]);

    return (
        <header className="flex sticky top-0 bottom-0 items-center py-4 px-8 min-h-[6rem] text-semibold z-10 bg-white transition-all ease-in left-0 border-b">
            <div className="flex w-full gap-9">
                <div className="grow">
                    <form
                        onSubmit={onSubmitSearch}
                        className="relative rounded-lg shadow-sm"
                    >
                        <input
                            type="text"
                            value={keyword}
                            onChange={onChangeSearch}
                            className="grow w-full rounded-md border-0 py-1.5 pl-5 pr-20 bg-neutral-100 text-gray-900 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6"
                            placeholder="Search"
                        />
                        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center pl-2">
                            <span className="sm:text-sm">
                                <SearchIcon className="stroke-gray-500 fill-none h-4 w-4" />
                            </span>
                        </div>
                    </form>
                </div>
                <div className="flex items-center">
                    <div className="flex items-center gap-2 ml-3">
                        <div>
                            <button
                                type="button"
                                className="flex items-center p-1 text-sm bg-white rounded-full focus:ring-2 focus:ring-gray-100 gap-2"
                                aria-expanded="false"
                                onClick={() =>
                                    setShowUserDropdown(!showUserDropdown)
                                }
                            >
                                <Image
                                    src={UserImage}
                                    alt="user-img"
                                    width={30}
                                    height={30}
                                    className="rounded-full"
                                />
                                <p className="text-sm font-medium">
                                    {user.name}
                                </p>
                                <BottomArrowIcon
                                    className={`h-4 w-4 fill-black ${
                                        showUserDropdown ? "rotate-180" : ""
                                    }`}
                                />
                            </button>

                            {showUserDropdown && (
                                <div className="origin-top-right absolute right-[1rem] top-18 mt-2 w-60 rounded-md shadow-lg shadow-slate-200 text-sm overflow-hidden border border-gray-200 z-20">
                                    <div
                                        className="rounded-md bg-white shadow-xs"
                                        role="menu"
                                        aria-orientation="vertical"
                                        aria-labelledby="options-menu"
                                    >
                                        <div className="bg-white py-3">
                                            <div className="w-full px-4 pb-2 border-b border-gray-100">
                                                <p className="font-bold text-left text-gray-600">
                                                    {user.name}
                                                </p>
                                                <p className="text-xs font-medium text-gray-600">
                                                    {user.email}
                                                </p>
                                            </div>
                                            <div className="pt-3 w-full text-left ">
                                                <button className="hover:bg-gray-100 text-left text-sm w-full px-3 py-1 flex items-center gap-2">
                                                    <div className="text-gray-600 text-sm">
                                                        Profile
                                                    </div>
                                                </button>
                                            </div>
                                            <div className="pt-1 w-full text-left ">
                                                <button className="hover:bg-gray-100 text-left text-sm w-full px-3 py-1 flex items-center gap-2">
                                                    <div className="text-gray-600 text-sm">
                                                        Settings
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div>
                            <div className="group bg-gray-100 p-2 rounded-full cursor-pointer hover:bg-orange-100">
                                <NotificationIcon className="h-4 w-4 stroke-gray-700 fill-none group-hover:stroke-primary" />
                            </div>
                        </div>
                        <div>
                            <div className="group bg-gray-100 p-2 rounded-full cursor-pointer hover:bg-orange-100">
                                <SettingsIcon className="h-4 w-4 fill-gray-700 stroke-none group-hover:fill-primary" />
                            </div>
                        </div>
                        <div>
                            <div className="group bg-gray-100 p-2 rounded-full cursor-pointer hover:bg-orange-100">
                                <SignoutIcon className="h-4 w-4 fille-gray-700 group-hover:fill-primary" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
