import React from "react";
import { useChart } from "../../hooks/useChart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const Chart: React.FC = () => {
  const { months } = useChart();

  if (months.length <= 0) return <></>;

  return (
    <BarChart
      width={1000}
      height={600}
      data={months}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid />
      <XAxis name="data" dataKey="dataReferencia" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="valor" fill="#8884d8" />
      <Bar
        name="quantidade beneficiados"
        dataKey="quantidadeBeneficiados"
        fill="#82ca9d"
      />
    </BarChart>
  );
};

export default Chart;
