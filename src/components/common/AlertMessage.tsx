import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import React, { useEffect, useState } from "react";
import { alertMessageActions } from "@/src/redux/slices/alertMessage.slice";

const { setAlertMessage } = alertMessageActions;

const SUCCESS = "success";
const ERROR = "error";

export default function AlertMessage() {
    const [showElement, setShowElement] = useState(false);
    const dispatch = useAppDispatch();

    const { message, type } = useAppSelector((state) => state.alertMessage);

    useEffect(() => {
        if (message) {
            setShowElement(true);
            setTimeout(() => {
                setShowElement(false);
                dispatch(
                    setAlertMessage({
                        message: "",
                        type: "",
                    })
                );
            }, 3000);
        }
    }, [dispatch, message]);

    return (
        <>
            {showElement && (
                <div className="relative z-20">
                    <div className="rounded-lg absolute top-5 right-5">
                        <div
                            className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow"
                            role="alert"
                        >
                            {type === SUCCESS && (
                                <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                                    <svg
                                        aria-hidden="true"
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                    <span className="sr-only">Check icon</span>
                                </div>
                            )}
                            {type === ERROR && (
                                <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg">
                                    <svg
                                        aria-hidden="true"
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                    <span className="sr-only">Error icon</span>
                                </div>
                            )}
                            <div className="ml-3 text-sm font-normal">
                                {message}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
