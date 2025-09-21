"use client";

import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { PieChart, Pie, Cell, Sector, ResponsiveContainer } from "recharts";
import { TrendingUp } from "lucide-react";
import { useTheme } from "next-themes";

const COLORS = ["#d6d3d1", "#292524", "#44403b"]; // light shades

const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
  return (
    <Sector
      cx={cx}
      cy={cy}
      innerRadius={innerRadius}
      outerRadius={outerRadius + 10} // expand active slice
      startAngle={startAngle}
      endAngle={endAngle}
      fill={fill}
    />
  );
};

const TopRolesDonut = ({ roles = [], probabilities = [] }) => {
  const { theme } = useTheme(); // access theme
  const labelColor = theme === "dark" ? "#f5f5f5" : "#111"; // dynamic color

  const data = roles.map((role, idx) => ({
    name: role,
    value: probabilities[idx] * 100,
  }));

  const activeIndex = data.reduce(
    (maxIdx, curr, idx, arr) => (curr.value > arr[maxIdx].value ? idx : maxIdx),
    0
  );

  // Move label function here so it can access labelColor
  const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent, name }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 20;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill={labelColor}
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={12}
      >
        {`${name}: ${Math.round(percent * 100)}%`}
      </text>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Roles</CardTitle>
        <CardDescription>Predicted Role Probabilities</CardDescription>
      </CardHeader>

      <CardContent className="h-44 sm:h-56 md:h-80 flex justify-center items-center">
        <ResponsiveContainer width="100%" height="100%">
          {console.log("Data for Donut Chart:", data[0])}
          {data[0].name === "Not predicted" ? (<p className="text-sm text-muted-foreground">No roles to display.</p>) :
            (

              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={120}
                  paddingAngle={0}
                  label={renderCustomizedLabel}
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
              
            )}
        </ResponsiveContainer>
      </CardContent>

      <CardFooter className="flex items-center gap-2 text-sm">
        <TrendingUp className="h-4 w-4" />
      </CardFooter>
    </Card>
  );
};

export default TopRolesDonut;
