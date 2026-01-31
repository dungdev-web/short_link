"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// Dữ liệu biểu đồ
const data = [
  { name: "LinkedIn", value: 40 },
  { name: "Facebook", value: 10 },
  { name: "Google", value: 20 },
  { name: "Twitter", value: 8 },
  { name: "Bitly", value: 18 },
  { name: "Direct", value: 12 },
  { name: "Other", value: 5 },
];

// Custom Tooltip
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0].payload; // Lấy từ payload gốc
    return (
      <div className="bg-white p-2 rounded shadow text-sm border border-gray-200">
        <p className="text-gray-700 font-medium">
          {name}: Click + Scan = <strong>{value}</strong>
        </p>
      </div>
    );
  }

  return null;
};


export default function ReferrerBarChart() {
  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barSize={50}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="value" fill="#00bcd4" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
