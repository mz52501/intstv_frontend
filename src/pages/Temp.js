import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

export default function Temp() {

    const navigate = useNavigate();

    useEffect(() => {
        navigate("/sensor/1");
    }, []);

    return (
        <></>
    )
}