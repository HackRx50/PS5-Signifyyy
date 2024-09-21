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
  return (
    <div>
      {/* Card widget */}

      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
      <div>
        <labe class="mb-2 text-base block">Months as Customer</labe>
        <input type='number' placeholder='Months as Customer'
          class="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500" />
      </div>
      <div>
        <labe class="mb-2 text-base block">Age</labe>
        <input type='number' placeholder='Age'
          class="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500" />
      </div>
      <div>
        <labe class="mb-2 text-base block">Umbrella Limit</labe>
        <input type='number' placeholder='Umbrella Limit'
          class="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500" />
      </div>
      <div>
        <labe class="mb-2 text-base block">Capital Loss</labe>
        <input type='number' placeholder='Capital Loss'
          class="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500" />
      </div>
      <div>
        <labe class="mb-2 text-base block">Capital Gains</labe>
        <input type='number' placeholder='Capital Gains'
          class="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500" />
      </div>
      <div>
        <labe class="mb-2 text-base block">Policy Deductable</labe>
        <input type='number' placeholder='Policy Deductable'
          class="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500" />
      </div>
      <div>
        <labe class="mb-2 text-base block">Policy Annual Premium</labe>
        <input type='number' placeholder='Policy Annual Premium'
          class="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500" />
      </div>
      <div>
        <labe class="mb-2 text-base block">Incident Hour of The Day</labe>
        <input type='number' placeholder='Incident Hour of The Day'
          class="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500" />
      </div>
      <div>
        <labe class="mb-2 text-base block">Number of Vehicles Involved</labe>
        <input type='number' placeholder='Eg: 4'
          class="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500" />
      </div>
      <div>
        <labe class="mb-2 text-base block">Body Injuries</labe>
        <input type='number' placeholder='Eg: 2'
          class="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500" />
      </div>
      <div>
        <labe class="mb-2 text-base block">Witnesses</labe>
        <input type='number' placeholder='Eg: 2'
          class="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500" />
      </div>
      <div>
        <labe class="mb-2 text-base block">Injury Claim</labe>
        <input type='number' placeholder='Eg: 65100rs'
          class="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500" />
      </div>
      <div>
        <labe class="mb-2 text-base block">Property Claim</labe>
        <input type='number' placeholder='Eg: 130200rs'
          class="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500" />
      </div>
      <div>
        <labe class="mb-2 text-base block">Vehicle Claim</labe>
        <input type='number' placeholder='Eg: 520800rs'
          class="px-4 py-2 text-base rounded-md bg-white border border-gray-400 w-full outline-blue-500" />
      </div>
        {/* <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Earnings"}
          subtitle={"$340.5"}
        />
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={"Spend this month"}
          subtitle={"$642.39"}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"Sales"}
          subtitle={"$574.34"}
        />
        <Widget
          icon={<MdDashboard className="h-6 w-6" />}
          title={"Your Balance"}
          subtitle={"$1,000"}
        />
        <Widget
          icon={<MdBarChart className="h-7 w-7" />}
          title={"New Tasks"}
          subtitle={"145"}
        />
        <Widget
          icon={<IoMdHome className="h-6 w-6" />}
          title={"Total Projects"}
          subtitle={"$2433"}
        /> */}
      </div>

      {/* Charts */}

      {/* <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <TotalSpent />
        <WeeklyRevenue />
      </div> */}

      {/* Tables & Charts */}

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* Check Table */}
        {/* <div>
          <CheckTable
            columnsData={columnsDataCheck}
            tableData={tableDataCheck}
          />
        </div> */}

        {/* Traffic chart & Pie Chart */}

        {/* <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <DailyTraffic />
          <PieChartCard />
        </div> */}

        {/* Complex Table , Task & Calendar */}

        {/* <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        /> */}

        {/* Task chart & Calendar */}
{/* 
        <div className="grid grid-cols-1 gap-5 rounded-[20px] md:grid-cols-2">
          <TaskCard />
          <div className="grid grid-cols-1 rounded-[20px]">
            <MiniCalendar />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
