import React, { useState } from "react";
import MiniCalendar from "components/calendar/MiniCalendar";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import TotalSpent from "views/admin/default/components/TotalSpent";
import PieChartCard from "views/admin/default/components/PieChartCard";
import { IoMdHome } from "react-icons/io";
import { IoDocuments } from "react-icons/io5";
import { MdBarChart, MdDashboard } from "react-icons/md";

import { columnsDataCheck, columnsDataComplex } from "./variables/columnsData";

import Widget from "views/rtl/default/components/Widget";
import CheckTable from "views/rtl/default/components/CheckTable";
import ComplexTable from "views/rtl/default/components/ComplexTable";
import DailyTraffic from "views/rtl/default/components/DailyTraffic";
import TaskCard from "views/rtl/default/components/TaskCard";
import tableDataCheck from "./variables/tableDataCheck.json";
import tableDataComplex from "./variables/tableDataComplex.json";
import { BsArrowBarUp } from "react-icons/bs";
import axios from "axios";

const Dashboard = () => {
  let ans = [];
  let temp1 = [],
    temp2 = [],
    temp3 = [],
    temp4 = [],
    temp5 = [],
    temp6 = [],
    temp7 = [],
    temp8 = [],
    temp9 = [],
    temp10 = [],
    temp11 = [];

  // Policy CSL
  const Polcsl = ["250/500", "500/1000", "100/300"];
  const PolcslOne = ["250/500", "500/1000"];
  const [selPolcsl, setPolcsl] = useState("");
  const Polcslhandle = (event) => {
    setPolcsl(event.target.value);
  };
  const oneHotPolcsl = (selected) => {
    temp1 = PolcslOne.map((category) => (category === selected ? 1 : 0));
    // console.log(typeof temp, temp);
    return temp1;
  };
  //

  // Sex
  const sex = ["Male", "Female"];
  const sexOne = ["Male"];
  const [selsex, setsex] = useState("");
  const sexhandle = (event) => {
    setsex(event.target.value);
  };
  const oneHotSex = (selected) => {
    temp2 = sexOne.map((category) => (category === selected ? 1 : 0));
    // console.log(typeof temp, temp);
    return temp2;
  };
  // sex

  // education
  const categories = [
    "College",
    "High School",
    "JD",
    "MD",
    "Masters",
    "PhD",
    "Associate",
  ];
  const categoriesOne = [
    "College",
    "High School",
    "JD",
    "MD",
    "Masters",
    "PhD",
  ];
  const [seledu, setedu] = useState("");
  const eduhandle = (event) => {
    setedu(event.target.value);
  };
  const oneHotEdu = (selected) => {
    temp3 = categoriesOne.map((category) => (category === selected ? 1 : 0));
    // console.log(typeof temp, temp);
    return temp3;
  };
  // education

  // Occupation
  const Occu = [
    "armed-forces",
    "craft-repair",
    "exec-managerial",
    "farming-fishing",
    "handlers-cleaners",
    "machine-op-inspct",
    "other-service",
    "priv-house-serv",
    "prof-specialty",
    "protective-serv",
    "sales",
    "tech-support",
    "transport-moving",
    "adm-clerical",
  ];
  const OccuOne = [
    "armed-forces",
    "craft-repair",
    "exec-managerial",
    "farming-fishing",
    "handlers-cleaners",
    "machine-op-inspct",
    "other-service",
    "priv-house-serv",
    "prof-specialty",
    "protective-serv",
    "sales",
    "tech-support",
    "transport-moving",
  ];
  const [selOccu, setOccu] = useState("");
  const Occuhandle = (event) => {
    setOccu(event.target.value);
  };
  const oneHotOccu = (selected) => {
    temp4 = OccuOne.map((category) => (category === selected ? 1 : 0));
    // console.log(typeof temp, temp);
    return temp4;
  };
  //

  // Relationship
  const Rela = [
    "not-in-family",
    "other-relative",
    "own-child",
    "unmarried",
    "wife",
    "husband",
  ];
  const RelaOne = [
    "not-in-family",
    "other-relative",
    "own-child",
    "unmarried",
    "wife",
  ];
  const [selRela, setRela] = useState("");
  const Relahandle = (event) => {
    setRela(event.target.value);
  };
  const oneHotRela = (selected) => {
    temp5 = RelaOne.map((category) => (category === selected ? 1 : 0));
    // console.log(typeof temp, temp);
    return temp5;
  };
  //

  // Incident Type
  const intype = [
    "Parked Car",
    "Single Vehicle Collisio",
    "Vehicle Theft",
    "Multi-vehicle Collision",
  ];
  const intypeOne = ["Parked Car", "Single Vehicle Collisio", "Vehicle Theft"];
  const [selintype, setintype] = useState("");
  const intypehandle = (event) => {
    setintype(event.target.value);
  };
  const oneHotintype = (selected) => {
    temp6 = intypeOne.map((category) => (category === selected ? 1 : 0));
    // console.log(typeof temp, temp);
    return temp6;
  };
  //

  // Collision Type
  const Coltype = ["Rear Collision", "Side Collision", "Front Collision"];
  const ColtypeOne = ["Rear Collision", "Side Collision"];
  const [selColtype, setColtype] = useState("");
  const Coltypehandle = (event) => {
    setColtype(event.target.value);
  };
  const oneHotColtype = (selected) => {
    temp7 = ColtypeOne.map((category) => (category === selected ? 1 : 0));
    // console.log(typeof temp, temp);
    return temp7;
  };
  //

  // Severity
  const Sevtype = [
    "Minor Damage",
    "Total Loss",
    "Trivial Damage",
    "Major Damage",
  ];
  const SevtypeOne = ["Minor Damage", "Total Loss", "Trivial Damage"];
  const [selSevtype, setSevtype] = useState("");
  const Sevtypehandle = (event) => {
    setSevtype(event.target.value);
  };
  const oneHotSevtype = (selected) => {
    temp8 = SevtypeOne.map((category) => (category === selected ? 1 : 0));
    // console.log(typeof temp, temp);
    return temp8;
  };
  //

  // Authority
  const Autho = ["Fire", "None", "Other", "Police", "Ambulance"];
  const AuthoOne = ["Fire", "None", "Other", "Police"];
  const [selAutho, setAutho] = useState("");
  const Authohandle = (event) => {
    setAutho(event.target.value);
  };
  const oneHotAutho = (selected) => {
    temp9 = AuthoOne.map((category) => (category === selected ? 1 : 0));
    // console.log(typeof temp, temp);
    return temp9;
  };
  //

  // Property Damage
  const Prodam = ["YES", "NO"];
  const ProdamOne = ["YES"];
  const [selProdam, setProdam] = useState("");
  const Prodamhandle = (event) => {
    setProdam(event.target.value);
  };
  const oneHotProdam = (selected) => {
    temp10 = ProdamOne.map((category) => (category === selected ? 1 : 0));
    // console.log(typeof temp, temp);
    return temp10;
  };
  //

  // Police Report avilable
  const Polrep = ["YES", "NO"];
  const PolrepOne = ["YES"];
  const [selPolrep, setPolrep] = useState("");
  const Polrephandle = (event) => {
    setPolrep(event.target.value);
  };
  const oneHotPolrep = (selected) => {
    temp11 = PolrepOne.map((category) => (category === selected ? 1 : 0));
    // console.log(typeof temp, temp);
    return temp11;
  };
  //

  const [Months, setMonths] = useState(0);
  const [PolDed, setPolDed] = useState(0);
  const [Umbli, setUmbli] = useState(0);
  const [Capga, setCapga] = useState(0);
  const [Caplo, setCaplo] = useState(0);
  const [Inhr, setInhr] = useState(0);
  const [Nvin, setNvin] = useState(0);
  const [BodIn, setBodIn] = useState(0);
  const [Wit, setWit] = useState(0);
  const [Inj, setInj] = useState(0);
  const [ProC, setProC] = useState(0);
  const [VehC, setVehC] = useState(0);

  // console.log("Months", Months);
  const [pred, setPred] = useState("hi");

  const Submitfn = () => {
    ans = [
      Months,
      PolDed,
      Umbli,
      Capga,
      Caplo,
      Inhr,
      Nvin,
      BodIn,
      Wit,
      Inj,
      ProC,
      VehC,
    ];

    let result = ans.concat(
      temp1,
      temp2,
      temp3,
      temp4,
      temp5,
      temp6,
      temp7,
      temp8,
      temp9,
      temp10,
      temp11
    );

    // {"features": [190, 2000, 0, 36900, -53700, 10, 1, 2, 1, 630, 630, 5040, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1]}

    console.log("here array is", result);

    try {
      if (result.length !== 53) {
        throw new Error("Please Fill all the sections");
      }

      axios
        .post("http://127.0.0.1:8000/predict", { features: result })
        .then((res) => {
          console.log(res.data);
          if (res.data.predicted_class === "N") setPred("Seems Not a Fraud");
          else {
            setPred("High chances of Fraud");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error.message);
      setPred(error.message);
    }
  };

  return (
    <div>
      {/* Card widget */}
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <div>
          <labe class="mb-2 block text-base">Months as Customer</labe>
          <input
            type="number"
            placeholder="Months as Customer"
            class="w-full rounded-md border border-gray-400 bg-white px-4 py-2 text-base outline-blue-500"
            value={Months}
            onChange={(e) => setMonths(e.target.value)}
          />
        </div>
        <div>
          <labe class="mb-2 block text-base">Policy Deductable</labe>
          <input
            type="number"
            placeholder="Policy Deductable"
            class="w-full rounded-md border border-gray-400 bg-white px-4 py-2 text-base outline-blue-500"
            value={PolDed}
            onChange={(e) => setPolDed(e.target.value)}
          />
        </div>
        <div>
          <labe class="mb-2 block text-base">Umbrella Limit</labe>
          <input
            type="number"
            placeholder="Umbrella Limit"
            class="w-full rounded-md border border-gray-400 bg-white px-4 py-2 text-base outline-blue-500"
            value={Umbli}
            onChange={(e) => setUmbli(e.target.value)}
          />
        </div>
        <div>
          <labe class="mb-2 block text-base">Capital Gains</labe>
          <input
            type="number"
            placeholder="Capital Gains"
            class="w-full rounded-md border border-gray-400 bg-white px-4 py-2 text-base outline-blue-500"
            value={Capga}
            onChange={(e) => setCapga(e.target.value)}
          />
        </div>
        {/*  */}
        <div>
          <labe class="mb-2 block text-base">Capital Loss</labe>
          <input
            type="number"
            placeholder="Capital Loss"
            class="w-full rounded-md border border-gray-400 bg-white px-4 py-2 text-base outline-blue-500"
            value={Caplo}
            onChange={(e) => setCaplo(e.target.value)}
          />
        </div>
        <div>
          <labe class="mb-2 block text-base">Incident Hour of The Day</labe>
          <input
            type="number"
            placeholder="Incident Hour of The Day"
            class="w-full rounded-md border border-gray-400 bg-white px-4 py-2 text-base outline-blue-500"
            value={Inhr}
            onChange={(e) => setInhr(e.target.value)}
          />
        </div>
        <div>
          <labe class="mb-2 block text-base">Number of Vehicles Involved</labe>
          <input
            type="number"
            placeholder="Eg: 4"
            class="w-full rounded-md border border-gray-400 bg-white px-4 py-2 text-base outline-blue-500"
            value={Nvin}
            onChange={(e) => setNvin(e.target.value)}
          />
        </div>
        <div>
          <labe class="mb-2 block text-base">Body Injuries</labe>
          <input
            type="number"
            placeholder="Eg: 2"
            class="w-full rounded-md border border-gray-400 bg-white px-4 py-2 text-base outline-blue-500"
            value={BodIn}
            onChange={(e) => setBodIn(e.target.value)}
          />
        </div>
        <div>
          <labe class="mb-2 block text-base">Witnesses</labe>
          <input
            type="number"
            placeholder="Eg: 2"
            class="w-full rounded-md border border-gray-400 bg-white px-4 py-2 text-base outline-blue-500"
            value={Wit}
            onChange={(e) => setWit(e.target.value)}
          />
        </div>
        <div>
          <labe class="mb-2 block text-base">Injury Claim</labe>
          <input
            type="number"
            placeholder="Eg: 65100rs"
            class="w-full rounded-md border border-gray-400 bg-white px-4 py-2 text-base outline-blue-500"
            value={Inj}
            onChange={(e) => setInj(e.target.value)}
          />
        </div>
        <div>
          <labe class="mb-2 block text-base">Property Claim</labe>
          <input
            type="number"
            placeholder="Eg: 130200rs"
            class="w-full rounded-md border border-gray-400 bg-white px-4 py-2 text-base outline-blue-500"
            value={ProC}
            onChange={(e) => setProC(e.target.value)}
          />
        </div>
        <div>
          <labe class="mb-2 block text-base">Vehicle Claim</labe>
          <input
            type="number"
            placeholder="Eg: 520800rs"
            class="w-full rounded-md border border-gray-400 bg-white px-4 py-2 text-base outline-blue-500"
            value={VehC}
            onChange={(e) => setVehC(e.target.value)}
          />
        </div>

        {/* Use Less  */}
        <div>
          <labe class="mb-2 block text-base">Age</labe>
          <input
            type="number"
            placeholder="Age"
            class="w-full rounded-md border border-gray-400 bg-white px-4 py-2 text-base outline-blue-500"
          />
        </div>
        <div>
          <labe class="mb-2 block text-base">Policy Annual Premium</labe>
          <input
            type="number"
            placeholder="Policy Annual Premium"
            class="w-full rounded-md border border-gray-400 bg-white px-4 py-2 text-base outline-blue-500"
          />
        </div>
        {/* Useless end */}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <div className="relative mx-auto w-full font-[sans-serif]">
          <h3 class="mb-2 block text-base">Policy CSL</h3>
          <select
            className="w-full rounded border-none bg-blue-600 px-5 py-2.5 text-[16px] font-normal text-white outline-none hover:bg-blue-700 active:bg-blue-600"
            onChange={Polcslhandle}
            value={selPolcsl}
          >
            <option
              className="text-black cursor-pointer px-5 py-2.5 text-sm hover:bg-blue-50"
              value=""
            >
              Select
            </option>
            {Polcsl.map((category, index) => (
              <option
                className="text-black cursor-pointer px-5 py-2.5 text-sm hover:bg-blue-50"
                key={index}
                value={category}
              >
                {category}
              </option>
            ))}
          </select>
          {selPolcsl && (
            <div>
              <h3>One-Hot Encoded Result:</h3>
              <p>{oneHotPolcsl(selPolcsl).join(", ")}</p>
            </div>
          )}
        </div>

        <div className="relative mx-auto w-full font-[sans-serif]">
          <h3 class="mb-2 block text-base">Select Sex:</h3>
          <select
            className="w-full rounded border-none bg-blue-600 px-5 py-2.5 text-[16px] font-normal text-white outline-none hover:bg-blue-700 active:bg-blue-600"
            onChange={sexhandle}
            value={selsex}
          >
            <option
              className="text-black cursor-pointer px-5 py-2.5 text-sm hover:bg-blue-50"
              value=""
            >
              Select
            </option>
            {sex.map((category, index) => (
              <option
                className="text-black cursor-pointer px-5 py-2.5 text-sm hover:bg-blue-50"
                key={index}
                value={category}
              >
                {category}
              </option>
            ))}
          </select>
          {selsex && (
            <div>
              <h3>One-Hot Encoded Result:</h3>
              <p>{oneHotSex(selsex).join(", ")}</p>
            </div>
          )}
        </div>

        <div className="relative mx-auto w-full font-[sans-serif]">
          <h3 class="mb-2 block text-base">Select Education Level:</h3>
          <select
            className="w-full rounded border-none bg-blue-600 px-5 py-2.5 text-[16px] font-normal text-white outline-none hover:bg-blue-700 active:bg-blue-600"
            onChange={eduhandle}
            value={seledu}
          >
            <option
              className="text-black cursor-pointer px-5 py-2.5 text-sm hover:bg-blue-50"
              value=""
            >
              Select
            </option>
            {categories.map((category, index) => (
              <option
                className="text-black cursor-pointer px-5 py-2.5 text-sm hover:bg-blue-50"
                key={index}
                value={category}
              >
                {category}
              </option>
            ))}
          </select>
          {seledu && (
            <div>
              <h3>One-Hot Encoded Result:</h3>
              <p>{oneHotEdu(seledu).join(", ")}</p>
            </div>
          )}
        </div>

        <div className="relative mx-auto w-full font-[sans-serif]">
          <h3 class="mb-2 block text-base">Insured Occupation:</h3>
          <select
            className="w-full rounded border-none bg-blue-600 px-5 py-2.5 text-[16px] font-normal text-white outline-none hover:bg-blue-700 active:bg-blue-600"
            onChange={Occuhandle}
            value={selOccu}
          >
            <option
              className="text-black cursor-pointer px-5 py-2.5 text-sm hover:bg-blue-50"
              value=""
            >
              Select
            </option>
            {Occu.map((category, index) => (
              <option
                className="text-black cursor-pointer px-5 py-2.5 text-sm hover:bg-blue-50"
                key={index}
                value={category}
              >
                {category}
              </option>
            ))}
          </select>
          {selOccu && (
            <div>
              <h3>One-Hot Encoded Result:</h3>
              <p>{oneHotOccu(selOccu).join(", ")}</p>
            </div>
          )}
        </div>

        <div className="relative mx-auto w-full font-[sans-serif]">
          <h3 class="mb-2 block text-base">Insured Relationship:</h3>
          <select
            className="w-full rounded border-none bg-blue-600 px-5 py-2.5 text-[16px] font-normal text-white outline-none hover:bg-blue-700 active:bg-blue-600"
            onChange={Relahandle}
            value={selRela}
          >
            <option
              className="text-black cursor-pointer px-5 py-2.5 text-sm hover:bg-blue-50"
              value=""
            >
              Select
            </option>
            {Rela.map((category, index) => (
              <option
                className="text-black cursor-pointer px-5 py-2.5 text-sm hover:bg-blue-50"
                key={index}
                value={category}
              >
                {category}
              </option>
            ))}
          </select>
          {selRela && (
            <div>
              <h3>One-Hot Encoded Result:</h3>
              <p>{oneHotRela(selRela).join(", ")}</p>
            </div>
          )}
        </div>

        <div className="relative mx-auto w-full font-[sans-serif]">
          <h3 class="mb-2 block text-base">Incident Type:</h3>
          <select
            className="w-full rounded border-none bg-blue-600 px-5 py-2.5 text-[16px] font-normal text-white outline-none hover:bg-blue-700 active:bg-blue-600"
            onChange={intypehandle}
            value={selintype}
          >
            <option
              className="text-black cursor-pointer px-5 py-2.5 text-sm hover:bg-blue-50"
              value=""
            >
              Select
            </option>
            {intype.map((category, index) => (
              <option
                className="text-black cursor-pointer px-5 py-2.5 text-sm hover:bg-blue-50"
                key={index}
                value={category}
              >
                {category}
              </option>
            ))}
          </select>
          {selintype && (
            <div>
              <h3>One-Hot Encoded Result:</h3>
              <p>{oneHotintype(selintype).join(", ")}</p>
            </div>
          )}
        </div>

        <div className="relative mx-auto w-full font-[sans-serif]">
          <h3 class="mb-2 block text-base">Collision Type:</h3>
          <select
            className="w-full rounded border-none bg-blue-600 px-5 py-2.5 text-[16px] font-normal text-white outline-none hover:bg-blue-700 active:bg-blue-600"
            onChange={Coltypehandle}
            value={selColtype}
          >
            <option
              className="text-black cursor-pointer px-5 py-2.5 text-sm hover:bg-blue-50"
              value=""
            >
              Select
            </option>
            {Coltype.map((category, index) => (
              <option
                className="text-black cursor-pointer px-5 py-2.5 text-sm hover:bg-blue-50"
                key={index}
                value={category}
              >
                {category}
              </option>
            ))}
          </select>
          {selColtype && (
            <div>
              <h3>One-Hot Encoded Result:</h3>
              <p>{oneHotColtype(selColtype).join(", ")}</p>
            </div>
          )}
        </div>

        <div className="relative mx-auto w-full font-[sans-serif]">
          <h3 class="mb-2 block text-base">Incident Severity:</h3>
          <select
            className="w-full rounded border-none bg-blue-600 px-5 py-2.5 text-[16px] font-normal text-white outline-none hover:bg-blue-700 active:bg-blue-600"
            onChange={Sevtypehandle}
            value={selSevtype}
          >
            <option
              className="text-black cursor-pointer px-5 py-2.5 text-sm hover:bg-blue-50"
              value=""
            >
              Select
            </option>
            {Sevtype.map((category, index) => (
              <option
                className="text-black cursor-pointer px-5 py-2.5 text-sm hover:bg-blue-50"
                key={index}
                value={category}
              >
                {category}
              </option>
            ))}
          </select>
          {selSevtype && (
            <div>
              <h3>One-Hot Encoded Result:</h3>
              <p>{oneHotSevtype(selSevtype).join(", ")}</p>
            </div>
          )}
        </div>

        <div className="relative mx-auto w-full font-[sans-serif]">
          <h3 class="mb-2 block text-base">Authorities Contacted:</h3>
          <select
            className="w-full rounded border-none bg-blue-600 px-5 py-2.5 text-[16px] font-normal text-white outline-none hover:bg-blue-700 active:bg-blue-600"
            onChange={Authohandle}
            value={selAutho}
          >
            <option
              className="text-black cursor-pointer px-5 py-2.5 text-sm hover:bg-blue-50"
              value=""
            >
              Select
            </option>
            {Autho.map((category, index) => (
              <option
                className="text-black cursor-pointer px-5 py-2.5 text-sm hover:bg-blue-50"
                key={index}
                value={category}
              >
                {category}
              </option>
            ))}
          </select>
          {selAutho && (
            <div>
              <h3>One-Hot Encoded Result:</h3>
              <p>{oneHotAutho(selAutho).join(", ")}</p>
            </div>
          )}
        </div>

        <div className="relative mx-auto w-full font-[sans-serif]">
          <h3 class="mb-2 block text-base">Property Damage</h3>
          <select
            className="w-full rounded border-none bg-blue-600 px-5 py-2.5 text-[16px] font-normal text-white outline-none hover:bg-blue-700 active:bg-blue-600"
            onChange={Prodamhandle}
            value={selProdam}
          >
            <option
              className="text-black cursor-pointer px-5 py-2.5 text-sm hover:bg-blue-50"
              value=""
            >
              Select
            </option>
            {Prodam.map((category, index) => (
              <option
                className="text-black cursor-pointer px-5 py-2.5 text-sm hover:bg-blue-50"
                key={index}
                value={category}
              >
                {category}
              </option>
            ))}
          </select>
          {selProdam && (
            <div>
              <h3>One-Hot Encoded Result:</h3>
              <p>{oneHotProdam(selProdam).join(", ")}</p>
            </div>
          )}
        </div>

        <div className="relative mx-auto w-full font-[sans-serif]">
          <h3 class="mb-2 block text-base">Police Report Available</h3>
          <select
            className="w-full rounded border-none bg-blue-600 px-5 py-2.5 text-[16px] font-normal text-white outline-none hover:bg-blue-700 active:bg-blue-600"
            onChange={Polrephandle}
            value={selPolrep}
          >
            <option
              className="text-black cursor-pointer px-5 py-2.5 text-sm hover:bg-blue-50"
              value=""
            >
              Select
            </option>
            {Polrep.map((category, index) => (
              <option
                className="text-black cursor-pointer px-5 py-2.5 text-sm hover:bg-blue-50"
                key={index}
                value={category}
              >
                {category}
              </option>
            ))}
          </select>
          {selPolrep && (
            <div>
              <h3>One-Hot Encoded Result:</h3>
              <p>{oneHotPolrep(selPolrep).join(", ")}</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-10 flex justify-center">{pred}</div>

      <div className="mt-10 flex justify-around ">
        <button
          type="button"
          class="border-current rounded-lg border bg-blue-700 px-5 py-2.5 text-sm font-medium tracking-wider text-white outline-none hover:bg-blue-800 active:bg-blue-700"
          onClick={Submitfn}
        >
          Submit
        </button>

        <button
          className="flex items-center"
          onClick={() => document.getElementById("fileInput").click()}
        >
          <div className="border-current rounded-lg border bg-blue-700 px-5 py-2.5 text-sm font-medium tracking-wider text-white outline-none hover:bg-blue-800 active:bg-blue-700">
            <BsArrowBarUp style={{ height: "30px", width: "30px" }} />
          </div>
          <div className="ml-2 flex h-full w-full flex-col justify-center rounded-lg px-1 text-sm">
            <p className="mb-1 text-left text-base font-bold text-gray-900 dark:text-white">
              Upload The Document
            </p>
          </div>
          <input
            id="fileInput"
            type="file"
            accept=".pdf"
            style={{ display: "none" }}
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {

                
                console.log(file.name); // Do something with the file
              }
            }}
          />
        </button>

      </div>
    </div>
  );
};

export default Dashboard;
