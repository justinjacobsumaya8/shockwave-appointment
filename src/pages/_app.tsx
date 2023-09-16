import "@/src/styles/globals.css";

import type { AppProps } from "next/app";
import { Urbanist } from "next/font/google";
import { useState } from "react";
import AlertMessage from "../components/common/AlertMessage";

const urbanist = Urbanist({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
    const [alertMessage, setAlertMessage] = useState({
        type: "",
        message: "",
    });

    return (
        <main className={urbanist.className}>
            <AlertMessage
                alertMessage={alertMessage}
                setAlertMessage={setAlertMessage}
            />
            <Component
                {...pageProps}
                alertMessage={alertMessage}
                setAlertMessage={setAlertMessage}
            />
        </main>
    );
}
