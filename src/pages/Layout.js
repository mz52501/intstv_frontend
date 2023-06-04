import {Link, Outlet, useNavigate} from "react-router-dom";
import {GiChicken} from "react-icons/gi";

export default function Layout() {

    const navigate = useNavigate();

    return (
        <>
            <nav className="flex items-center bg-yellow-300">
                <div>
                <button onClick={() => {navigate("/sensor/1");
                    window.location.reload();}}
                        className="font-semibold text-white mr-2 py-2.5 ml-2 rounded-sm px-3 bg-indigo-500 text-lg hover:bg-indigo-700 hover:bg-indigo-700">
                    <p className="item">Inkubator 1</p>
                </button>
                <button onClick={() => {navigate("/sensor/2");
                    window.location.reload();}}
                        className="font-semibold text-white mr-2 rounded-sm py-2.5 px-3 bg-indigo-500 text-lg hover:bg-indigo-700 hover:bg-indigo-700">
                    <p className="item" to="/subjects">Inkubator 2</p>
                </button>
                <button onClick={() => {navigate("/sensor/3");
                    window.location.reload();}}
                        className="font-semibold text-white py-2.5 px-3 rounded-sm text-lg bg-indigo-500 hover:bg-indigo-700 hover:bg-indigo-700">
                <p className="item">Inkubator 3</p>
                </button>
                </div>
                <div className="w-1/2 flex justify-center items-center">
                <div className="text-white py-3 px-4 rounded-sm w-24 flex justify-center items-center">
                    <GiChicken size={35}/>
                </div>
                </div>
            </nav>
            <Outlet />
        </>
    )
}