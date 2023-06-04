import {TbTemperatureCelsius} from "react-icons/tb";
import {useEffect, useState} from "react";
import {AiOutlinePlus, AiOutlineMinus} from "react-icons/ai";
import LineChart from "./LineChart";
import {useParams} from "react-router-dom";
import Axios from "axios";
import {log10} from "chart.js/helpers";

export default function Home() {


    const [formState, setFormState] = useState(false);

    const[pilici, setPilici] = useState({});
    const[povijestTemperature, setPovijestTemperature] = useState([]);
    const[errorMsg, setErrorMsg] = useState("");
    const {id} = useParams();
    const [data, setData] = useState({
        dob: "",
        min: "",
        max: ""
    });

    const fetchPilici = () => {
        Axios.get(`http://localhost:8080/sensor/${id}`).then((res) => {
            setPilici(res.data);
            setPovijestTemperature(res.data.povijestTemperature);
        });
    }

    useEffect(() => {
        fetchPilici();
    }, []);

    var dataForChart = {
        labels: povijestTemperature?.map((povTemp) => (
            new Date(povTemp.datumVrijeme).getHours() + ":" + new Date(povTemp.datumVrijeme).getMinutes() + "." + new Date(povTemp.datumVrijeme).getSeconds()
        )),
        datasets: [{
            label: "Temperatura",
            data: povijestTemperature?.map((povTemp) => (
                povTemp.temperatura
            )),
            backgroundColor: "rgb(250 204 21)",
            borderColor: "rgb(250 204 21)",
            borderWidth: 3
        },
            {
                label: "Vlaga",
                data: povijestTemperature?.map((povTemp) => (
                    povTemp.vlaga
                )),
                backgroundColor: "rgb(99 102 241)",
                borderColor: "rgb(99 102 241)",
                borderWith: 3
            }]
    }

    function handle(e) {
        const newData = {...data}
        newData[e.target.id] = e.target.value
        setData(newData)
        console.log(newData)
    }

    function validateForm(checked) {
        if(data.dob !== "") {
            if (checked) {
                if (data.min !== "" || data.max !== "") {
                    setErrorMsg("Ako ste stavili zadani min-max, min max moraju biti nedefinirani!");
                    return false;
                } else return true;
            } else {
                if(data.min === "" || data.max === "") {
                    setErrorMsg("Pupinite polja min i max!");
                    return false;
                } else return true;
            }
        } else {
            setErrorMsg("Popunite polje dob!");
            return false;
        }
    }

    function submitForm(e) {
        e.preventDefault()
        let checked = document.getElementById("auto").checked;
        if(validateForm(checked)) {
            Axios.post(`http://localhost:8080/sensor/${id}`, {
                dob: data.dob,
                minTemperatura: checked ? pilici.minTemperatura : data.min,
                maxTemperatura: checked ? pilici.maxTemperatura : data.max,
                autoTemperatura: checked
            }).then(res => {
                    window.location.reload();
                    console.log(res.data)
                }
            ).catch((error) => { // error is handled in catch block
                if (error.response) { // status code out of the range of 2xx
                    console.log("Data :", error.response.data);
                    console.log("Status :" + error.response.status);
                } else if (error.request) { // The request was made but no response was received
                    console.log(error.request);
                } else {// Error on setting up the request
                    console.log('Error', error.message);
                }
            })
        }
    }


    function showForm(e, id) {
        if(formState) {
            document.getElementById(id).style.display = "none";
            setFormState(false);
        } else {
            document.getElementById(id).style.display = "block";
            setFormState(true);
        }
    }

    return (
        <div>
            <div className="flex justify-center mb-20">
            <div className="w-2/5 mt-10 inline">
                <div className="mb-5 text-xl bg-indigo-500 w-60 rounded-sm shadow-md h-10 flex justify-center items-center text-white font-semibold">Dob pilića</div>
                <div className="font-semibold w-32 mb-10 text-lg bg-yellow-300 rounded-sm shadow-md flex justify-center items-center">{pilici.dob + " dana"}</div>
                <div className="flex mt-10 mb-14">
                    <div className="mr-10">
                        <div className="mb-5 text-xl bg-indigo-500 w-60 rounded-sm shadow-md h-10 flex justify-center items-center text-white font-semibold">Minimalna temperatura</div>
                        <div className="font-semibold w-32 text-lg bg-yellow-300 rounded-sm shadow-md flex justify-center items-center"><p>{pilici.min}</p><TbTemperatureCelsius size={22} /></div>
                    </div>
                    <div>
                        <div className="mb-5 text-xl bg-indigo-500 w-60 rounded-sm shadow-md h-10 flex justify-center items-center text-white font-semibold">Maksimalna temperatura</div>
                        <div className="font-semibold w-32 text-lg bg-yellow-300 rounded-sm shadow-md flex justify-center items-center"><p>{pilici.max}</p><TbTemperatureCelsius size={22} /></div>
                    </div>
                </div>
                <button onClick={(event => showForm(event, "changeMinMax"))} className="font-semibold text-lg px-4 py-2 hover:bg-green-700 bg-green-500 text-white rounded-xl shadow-md">Promijeni min/max temperaturu i dob</button>
                <form id="changeMinMax" className="hidden mb-10" method="POST" onSubmit={(e) => submitForm(e)}>
                    <label htmlFor="dob" className="mt-5 block font-semibold">Dob:</label>
                    <input onChange={(e) => handle(e)} className="border-2 border-gray-500 rounded-md p-1 w-60" type="number" id="dob" name="dob" value={data.dob} />
                    <label htmlFor="auto" className="mt-5 block font-semibold">Zadani min-max:</label>
                    <input className="rounded-sm w-6 h-6" type="checkbox" id="auto" name="auto" value=""/>
                    <label htmlFor="min" className="mt-2 block font-semibold">Min:</label>
                    <input onChange={(e) => handle(e)} className="border-2 border-gray-500 rounded-md p-1 w-60" type="number" id="min" name="min" value={data.min}/>
                    <label htmlFor="max" className="mt-5 block font-semibold">Max:</label>
                    <input onChange={(e) => handle(e)} className="border-2 border-gray-500 rounded-md p-1 w-60 block" type="number" id="max" name="max" value={data.max}/>
                    <div className="mb-4">{errorMsg}</div>
                    <button type="submit" value="Submit" className="mt-5 hover:bg-green-500 bg-green-300 rounded-md shadow-md py-1.5 px-5 mr-3">
                        <p>Promijeni</p>
                    </button>
                </form>
            </div>
            <div className="w-2/5 mt-10 inline flex justify-center items-start">
                <div className="flex flex-col justify-center items-center">
                    <div className="mb-8 text-xl bg-indigo-500 w-96 rounded-sm shadow-md h-10 flex justify-center items-center text-white font-semibold">Trenutna temperatura</div>
                    <div className="flex mb-8">
                        <div className=" w-48 h-28 text-6xl bg-yellow-300 rounded-sm shadow-md flex justify-center items-center"><p>{pilici.trenutnaTemperatura}</p><TbTemperatureCelsius size={40} /></div>
                    </div>
                    <div className="mb-8 text-xl bg-indigo-500 w-96 rounded-sm shadow-md h-10 flex justify-center items-center text-white font-semibold">Trenutna vlažnost</div>
                    <div className=" w-48 h-28 bg-yellow-300 rounded-sm shadow-md flex justify-center items-center"><p className="text-6xl mr-2">{pilici.trenutnaVlaga}</p><p className="font-semibold text-xl">kg/m3</p></div>

                </div>
             </div>
            </div>
            <div className="flex justify-center items-center mb-10">
                <div className="w-3/5">
                    <LineChart chartData={dataForChart} />
                </div>
            </div>
        </div>
    )
}