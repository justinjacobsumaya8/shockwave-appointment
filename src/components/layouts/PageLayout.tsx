import React, { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const PageLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <div className="flex overflow-x-hidden h-screen">
                <Sidebar />
                <div className="flex-1 transition-all ease-in">
                    <Navbar />
                    <main className="transition-all ease-in">{children}</main>
                </div>
            </div>
        </>
    );
};

export default PageLayout;
