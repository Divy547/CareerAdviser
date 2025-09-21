"use client";

import { FaFileExcel, FaChartBar, FaRobot, FaCalculator } from "react-icons/fa";
import { 
  SiPython, SiPandas, SiMysql, SiTableau, SiHtml5, SiCss3, SiJavascript, 
  SiReact, SiVueDotJs, SiDocker, SiKubernetes, SiAmazonaws, SiLinux, 
  SiTerraform, SiAnsible 
} from "react-icons/si";

export const skillIcons = {
  python: <SiPython className="inline-block mr-2 text-yellow-500" />,
  pandas: <SiPandas className="inline-block mr-2 text-blue-500" />,
  sql: <SiMysql className="inline-block mr-2 text-blue-600" />,
  statistics: <FaCalculator className="inline-block mr-2 text-purple-500" />,
  "machine learning": <FaRobot className="inline-block mr-2 text-green-500" />,
  "deep learning": <FaRobot className="inline-block mr-2 text-red-500" />,
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
  linux: <SiLinux className="inline-block mr-2 text-gray-600" />,
  terraform: <SiTerraform className="inline-block mr-2 text-blue-600" />,
  ansible: <SiAnsible className="inline-block mr-2 text-red-600" />,
};
