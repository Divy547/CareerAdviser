"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SkillsToLearnWithResources from "./SkillsToLearnWithResources";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import dynamic from "next/dynamic";
const TopRolesDonut = dynamic(() => import("./TopRolesDonut"), { ssr: false });
import {
  FaFileExcel, FaChartBar, FaRobot, FaCalculator
} from "react-icons/fa";
import {
  SiPython, SiPandas, SiMysql, SiTableau, SiHtml5, SiCss3, SiJavascript,
  SiReact, SiVueDotJs, SiDocker, SiKubernetes, SiAmazonaws, SiLinux,
  SiTerraform, SiAnsible
} from "react-icons/si";

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

// Skill Icons Mapping
const skillIcons = {
  python: <SiPython className="inline-block mr-2 text-primary" />,
  pandas: <SiPandas className="inline-block mr-2 text-secondary" />,
  sql: <SiMysql className="inline-block mr-2 text-accent" />,
  statistics: <FaCalculator className="inline-block mr-2 text-muted-foreground" />,
  "machine learning": <FaRobot className="inline-block mr-2 text-destructive" />,
  "deep learning": <FaRobot className="inline-block mr-2 text-warning" />,
  excel: <FaFileExcel className="inline-block mr-2 text-green-600" />,
  tableau: <SiTableau className="inline-block mr-2 text-blue-700" />,
  "data visualization": <FaChartBar className="inline-block mr-2 text-indigo-500" />,
  html: <SiHtml5 className="inline-block mr-2 text-orange-500" />,
  css: <SiCss3 className="inline-block mr-2 text-blue-500" />,
  javascript: <SiJavascript className="inline-block mr-2 text-yellow-400" />,
  react: <SiReact className="inline-block mr-2 text-cyan-400" />,
  vue: <SiVueDotJs className="inline-block mr-2 text-green-400" />,
  docker: <SiDocker className="inline-block mr-2 text-blue-600" />,
  kubernetes: <SiKubernetes className="inline-block mr-2 text-blue-700" />,
  aws: <SiAmazonaws className="inline-block mr-2 text-orange-500" />,
  linux: <SiLinux className="inline-block mr-2 text-muted-foreground" />,
  terraform: <SiTerraform className="inline-block mr-2 text-blue-600" />,
  ansible: <SiAnsible className="inline-block mr-2 text-red-600" />,
};





// Skills Cards Component
const SkillsCards = ({ title, skills }) => (
  <Card className="p-4 rounded-xl shadow-md bg-card text-card-foreground min-h-[200px] min-w-[280px]">
    <CardHeader>
      <CardTitle className="text-lg font-semibold mt-4 px-1">{title}</CardTitle>
    </CardHeader>
    <CardContent className="flex flex-wrap gap-2 mt-2">
      {skills.length === 0 && <p className="text-sm text-muted-foreground">No skills to display.</p>}
      {skills?.map((skill, idx) => (
        <Badge
          key={idx}
          variant="outline"
          className="flex items-center gap-2 border-border text-foreground p-3 rounded-2xl cursor-pointer"
        >
          {skillIcons[skill.toLowerCase()] || null} <span className="font-medium px-1 text-sm">{skill}</span>
        </Badge>
      ))}
    </CardContent>
  </Card>
);

// Resources Component


// Main Dashboard
const CareerAdvisorDashboard = ({ rolesData, userSkills, missingSkills, resources }) => (
  <div className="w-full min-h-screen p-8 space-y-6 bg-background flex flex-col justify-center items-center">
    <div className="grid md:grid-cols-2 gap-6">
      <TopRolesDonut roles={rolesData.roles} probabilities={rolesData.probabilities} />
      <SkillsCards title="Skills You Have" skills={userSkills} />
    </div>

    <div className="w-2/3 md:grid-cols-2 gap-6">
      <SkillsToLearnWithResources skills={missingSkills} />
    </div>
  </div>
);

export default CareerAdvisorDashboard;
