import React from "react";
import { FaStar } from "react-icons/fa";
import {
  PieChart,
  pieArcLabelClasses,
  LineChart as MuiLineChart,
  lineElementClasses,
  axisClasses,
} from "@mui/x-charts";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Dashboard = () => {
  const expenseBreakdown = [
    { category: "Rent", amount: 2000 },
    { category: "Groceries", amount: 500 },
  ];

  const incomeVsExpenses = [
    { label: "Income", amount: 7000 },
    { label: "Expenses", amount: 2500 },
  ];

  const shortTermData = [
    { date: "Jan", actual: 4000, recommended: 4500 },
    { date: "Feb", actual: 3000, recommended: 4000 },
    { date: "Mar", actual: 2000, recommended: 3500 },
    { date: "Apr", actual: 2780, recommended: 3000 },
    { date: "May", actual: 1890, recommended: 2500 },
    { date: "Jun", actual: 2390, recommended: 2000 },
    { date: "Jul", actual: 3490, recommended: 1500 },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <FaStar className="text-2xl text-blue-600" />
          <h1 className="text-2xl font-bold ml-3">Financial Dashboard</h1>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-transform transform hover:scale-105 active:scale-95 cursor-pointer">
          New Simulation
        </button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
            <h3 className="text-gray-400 mb-2">Total Revenue</h3>
            <p className="text-2xl font-bold mb-4 text-white">
              $
              {(
                incomeVsExpenses[0].amount - incomeVsExpenses[1].amount
              ).toLocaleString()} 
            </p>
            <div className="h-24">
              <MuiLineChart
                xAxis={[
                  {
                    data: shortTermData.map((d) => d.date),
                    scaleType: "point",
                    tickLabelStyle: { fill: "#ffffff" },
                  },
                ]}
                series={[
                  {
                    data: shortTermData.map((d) => d.actual),
                    color: "#4ade80", 
                    showMark: false,
                  },
                ]}
                height={100}
                grid={{ horizontal: false }}
                margin={{ top: 10, bottom: 20, left: 30, right: 10 }}
                sx={{
                  backgroundColor: "#1f2937", 
                  "& .MuiChartsAxis-root .MuiChartsAxis-tickLabel": {
                    fill: "#ffffff",
                  },
                  "& .MuiChartsAxis-line": {
                    stroke: "#ffffff",
                  },
                  "& .MuiChartsLine-root path": {
                    stroke: "#4ade80", 
                  },
                }}
              />
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
            <h3 className="text-gray-400 mb-2">Income</h3>
            <p className="text-2xl font-bold text-green-400">
              ${incomeVsExpenses[0].amount.toLocaleString()}
            </p>
            <div className="mt-4 text-sm text-gray-400">
              +12% from last month
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
            <h3 className="text-gray-400 mb-2">Expenses</h3>
            <p className="text-2xl font-bold text-white">+2350</p>
            <div className="mt-1 text-sm text-gray-400">
              +180.1% from last month
            </div>
            <div className="mt-4 flex justify-center">
              <div className="flex items-end gap-2 h-24">
                {[60, 80, 55, 70, 85, 90, 60].map((value, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-md w-6"
                    style={{ height: `${value}%` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
          <h2 className="text-xl font-bold mb-6">Fear & Greed Index</h2>
          <div className="w-48 h-48 mx-auto">
            <CircularProgressbar
              value={65}
              text="Greed"
              styles={buildStyles({
                pathColor: `rgba(74, 222, 128, ${65 / 100})`,
                textColor: "#fff",
                trailColor: "rgba(255,255,255,0.1)",
              })}
            />
          </div>
        </div>

        <div className="col-span-12 lg:col-span-8 bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
          <h2 className="text-xl font-bold mb-6 text-white">
            Expense Breakdown
          </h2>
          <div className="flex justify-center items-center h-72">
            <PieChart
              series={[
                {
                  data: expenseBreakdown.map((item) => ({
                    id: item.category,
                    value: item.amount,
                    label: item.category,
                  })),
                  innerRadius: 50,
                  outerRadius: 100,
                  arcLabel: (item) => `$${item.value}`,
                },
              ]}
              width={500}
              height={300}
              slotProps={{
                legend: {
                  direction: "column",
                  position: { vertical: "right", horizontal: "right" },
                  padding: 5,
                },
              }}
              sx={{
                backgroundColor: "#1f2937",
                [`& .${pieArcLabelClasses.root}`]: {
                  fill: "#fff",
                  fontSize: 14,
                },
                "& .MuiChartsLegend-label": {
                  fill: "#fff",
                },
              }}
            />
          </div>
          <div className="pt-4 text-sm text-gray-400">
            <p>Expenses increased by 5.2% compared to last month.</p>
            <p className="mt-1">Tracking over the past 6 months.</p>
          </div>
        </div>

        <div className="col-span-12 bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
          <h2 className="text-xl font-bold mb-4 text-white">
            Financial Projections
          </h2>
          <div className="h-80">
            <MuiLineChart
              xAxis={[
                {
                  data: shortTermData.map((d) => d.date),
                  scaleType: "band",
                  tickLabelStyle: { fill: "#fff" },
                },
              ]}
              series={[
                {
                  data: shortTermData.map((d) => d.actual),
                  label: "Actual",
                  color: "#4ade80",
                },
                {
                  data: shortTermData.map((d) => d.recommended),
                  label: "Recommended",
                  color: "#60a5fa",
                },
              ]}
              height={300}
              grid={{ horizontal: true }}
              sx={{
                backgroundColor: "#1f2937",
                [`& .${axisClasses.root}`]: {
                  stroke: "white",
                },
                [`& .${axisClasses.tickLabel}`]: {
                  fill: "#fff",
                },
                [`& .${lineElementClasses.root}`]: {
                  strokeWidth: 3,
                },
                "& .MuiChartsLegend-root": {
                  color: "#fff",
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
