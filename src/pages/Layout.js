import {Outlet} from "react-router-dom";
import {GiChicken} from "react-icons/gi";

export default function Layout() {
    return (
        <>
            <nav className="flex justify-center items-center bg-yellow-300">
                <div className="text-white py-3 px-4 bg-yellow-300 rounded-sm w-24 flex justify-center items-center">
                    <GiChicken size={35}/>
                </div>
            </nav>
            <Outlet />
        </>
    )
}