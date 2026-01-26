import {type FC, memo, useMemo } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const DefaultLayout: FC = () => {
    const year = useMemo(() => new Date().getFullYear(), []);

    return (
        <>
            <Header title="My Music App" />

            <main role="main" className="app-main">
                <Outlet />
            </main>

            <Footer textContent={`© ${year}`} />
        </>
    );
};

export default memo(DefaultLayout);
