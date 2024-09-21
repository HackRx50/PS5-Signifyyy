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

const Dashboard = () => {

  const categories = [
    "MD",
    "PhD",
    "Associate",
    "Masters",
    "High School",
    "College",
    "JD",
  ];
  const categoriesOne = [
    "MD",
    "PhD",
    "Masters",
    "High School",
    "College",
    "JD",
  ];
  const [seledu, setedu] = useState("");
  const eduhandle = (event) => {
    setedu(event.target.value);
  };
  const oneHotEdu = (selected) => {
    const temp = categoriesOne.map((category) => (category === selected ? 1 : 0));
    console.log(typeof(temp), temp);
    return temp;
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
          />
        </div>
        <div>
          <labe class="mb-2 block text-base">Age</labe>
          <input
            type="number"
            placeholder="Age"
            class="w-full rounded-md border border-gray-400 bg-white px-4 py-2 text-base outline-blue-500"
          />
        </div>
        <div>
          <labe class="mb-2 block text-base">Umbrella Limit</labe>
          <input
            type="number"
            placeholder="Umbrella Limit"
            class="w-full rounded-md border border-gray-400 bg-white px-4 py-2 text-base outline-blue-500"
          />
        </div>
        <div>
          <labe class="mb-2 block text-base">Capital Loss</labe>
          <input
            type="number"
            placeholder="Capital Loss"
            class="w-full rounded-md border border-gray-400 bg-white px-4 py-2 text-base outline-blue-500"
          />
        </div>
        <div>
          <labe class="mb-2 block text-base">Capital Gains</labe>
          <input
            type="number"
            placeholder="Capital Gains"
            class="w-full rounded-md border border-gray-400 bg-white px-4 py-2 text-base outline-blue-500"
          />
        </div>
        <div>
          <labe class="mb-2 block text-base">Policy Deductable</labe>
          <input
            type="number"
            placeholder="Policy Deductable"
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
        <div>
          <labe class="mb-2 block text-base">Incident Hour of The Day</labe>
          <input
            type="number"
            placeholder="Incident Hour of The Day"
            class="w-full rounded-md border border-gray-400 bg-white px-4 py-2 text-base outline-blue-500"
          />
        </div>
        <div>
          <labe class="mb-2 block text-base">Number of Vehicles Involved</labe>
          <input
            type="number"
            placeholder="Eg: 4"
            class="w-full rounded-md border border-gray-400 bg-white px-4 py-2 text-base outline-blue-500"
          />
        </div>
        <div>
          <labe class="mb-2 block text-base">Body Injuries</labe>
          <input
            type="number"
            placeholder="Eg: 2"
            class="w-full rounded-md border border-gray-400 bg-white px-4 py-2 text-base outline-blue-500"
          />
        </div>
        <div>
          <labe class="mb-2 block text-base">Witnesses</labe>
          <input
            type="number"
            placeholder="Eg: 2"
            class="w-full rounded-md border border-gray-400 bg-white px-4 py-2 text-base outline-blue-500"
          />
        </div>
        <div>
          <labe class="mb-2 block text-base">Injury Claim</labe>
          <input
            type="number"
            placeholder="Eg: 65100rs"
            class="w-full rounded-md border border-gray-400 bg-white px-4 py-2 text-base outline-blue-500"
          />
        </div>
        <div>
          <labe class="mb-2 block text-base">Property Claim</labe>
          <input
            type="number"
            placeholder="Eg: 130200rs"
            class="w-full rounded-md border border-gray-400 bg-white px-4 py-2 text-base outline-blue-500"
          />
        </div>
        <div>
          <labe class="mb-2 block text-base">Vehicle Claim</labe>
          <input
            type="number"
            placeholder="Eg: 520800rs"
            class="w-full rounded-md border border-gray-400 bg-white px-4 py-2 text-base outline-blue-500"
          />
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
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
        </div>
        {seledu && (
          <div>
            <h3>One-Hot Encoded Result:</h3>
            <p>{oneHotEdu(seledu).join(", ")}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
