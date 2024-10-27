// components/SameDataComposed.js
import React, { useEffect, useState } from "react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { BACKEND_URL } from "../ui/Login";

const SameDataComposed = () => {
  const [data, setData] = useState([
    { name: "Daily", data: 0 },
    { name: "Weekly", data: 0 },
    { name: "Monthly", data: 0 },
    { name: "Yearly", data: 0 },
  ]);

  async function fetchDailyStats() {
    const response = await fetch(`${BACKEND_URL}/daily_localwork`);
    const result = await response.json();

    return result.data;
  }

  async function fetchWeeklyStats() {
    const response = await fetch(`${BACKEND_URL}/weekly_localwork`);
    const result = await response.json();

    return result.data;
  }

  async function fetchMonthlyStats() {
    const response = await fetch(`${BACKEND_URL}/monthly_localwork`);
    const result = await response.json();

    return result.data;
  }

  async function fetchYearlyStats() {
    const response = await fetch(`${BACKEND_URL}/yearly_localwork`);
    const result = await response.json();

    return result.data;
  }

  useEffect(() => {
    async function fetchData() {
      const dailyData = await fetchDailyStats();
      const weeklyData = await fetchWeeklyStats();
      const monthlyData = await fetchMonthlyStats();
      const yearlyData = await fetchYearlyStats();

      setData([
        { name: "Daily", data: dailyData },
        { name: "Weekly", data: weeklyData },
        { name: "Monthly", data: monthlyData },
        { name: "Yearly", data: yearlyData },
      ]);
    }

    fetchData();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart
        data={data}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="name" scale="band" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="data" barSize={20} fill="#2e3940" />
        <Line type="monotone" dataKey="data" stroke="#ff7300" />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default SameDataComposed;
