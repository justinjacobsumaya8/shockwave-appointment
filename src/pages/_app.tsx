import "@/src/styles/globals.css";

import type { AppProps } from "next/app";
import { Urbanist } from "next/font/google";
import { Provider as ReduxProvider } from "react-redux";
import { wrapper } from "../redux/store";

import AlertMessage from "../components/common/AlertMessage";
import { FC } from "react";

const urbanist = Urbanist({ subsets: ["latin"] });

const App: FC<AppProps> = ({ Component, ...rest }) => {
    const { store, props } = wrapper.useWrappedStore(rest);
    return (
        <ReduxProvider store={store}>
            <main className={urbanist.className}>
                <AlertMessage />
                <Component {...props.pageProps} />
            </main>
        </ReduxProvider>
    );
};

export default App;
