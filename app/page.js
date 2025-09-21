"use client"

import { useState } from "react";
import CareerAdvisorDashboard from "@/components/CareerAdvisorDashboard";
import InputSection from "@/components/inputSection";
import RoadmapAccordion from "@/components/RoadmapAccordion";
import LearningResourcesCarousel from "@/components/LearningResourcesCarousel";
import { ModeToggle } from "@/components/ModeToggle";


export default function Home() {

  const [InputValue, setInputValue] = useState("")
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState(null);
  const [roles, setRoles] = useState([]);
  const [probabilities, setProbabilities] = useState([]);
  const [userSkills, setUserSkills] = useState([]);
  const [missingSkills, setMissingSkills] = useState([]);
  const [response, setResponse] = useState(false);
  const [resources, setResources] = useState([])

  const allSkills = [
    "python", "pandas", "sql", "statistics", "machine learning", "deep learning",
    "excel", "tableau", "data visualization",
    "html", "css", "javascript", "react", "vue",
    "docker", "kubernetes", "aws", "linux", "terraform", "ansible"
  ];

  function extractSkills(input) {
    const lowerInput = input.toLowerCase();
    return allSkills.filter(skill => lowerInput.includes(skill));
  }

  // Update advice, roles, and probabilities when response changes
  const handleClick = async () => {
    if (InputValue === "") return;
    setLoading(true);
    setRoles([]);
    setProbabilities([]);
    setAdvice(null);
    setResponse(false);
    setUserSkills([]);
    setMissingSkills([]);
    setResources([]);

    try {
      const res = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_input: InputValue }),
      });

      if (!res.ok) throw new Error("Failed to fetch response");

      const result = await res.json();
      console.log(result)
      setResponse(true)
      setRoles(result.roles);
      setProbabilities(result.probabilities);

      const parsedAdvice = cleanAndParseAdvice(result.gemini_advice);
      console.log("Parsed advice:", parsedAdvice);
      if (parsedAdvice) setAdvice(parsedAdvice);
      const skillsFound = extractSkills(InputValue);
      setResources(parsedAdvice.resources || []);
      setUserSkills(skillsFound);
      setMissingSkills(parsedAdvice?.missing_skill_gaps || []);

    } catch (err) {
      console.error(err || "Something went wrong");
    } finally {
      setLoading(false);
    }

  }

  function cleanAndParseAdvice(adviceStr) {
    try {
      // Remove ```json ... ```
      const cleaned = adviceStr.replace(/```json|```/g, "").trim();
      return JSON.parse(cleaned);
    } catch (err) {
      console.error("Failed to parse Gemini advice:", err);
      return null;
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r p-5">
      <div className="flex justify-end mb-5">
        <ModeToggle />
      </div>
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold">AI Career Advisor</h1>
        <p className=" mt-2">Enter your skills to discover top roles and personalized learning paths.</p>
      </div>

      <InputSection inputValue={InputValue} setInputValue={setInputValue} handleClick={handleClick} loading={loading} />
      {response ? <>

        {/* <TopRoles roles={roles} probabilities={probabilities} /> */}
        <CareerAdvisorDashboard rolesData={{ roles, probabilities }} userSkills={userSkills} missingSkills={missingSkills} resources={advice?.resources} />
        <RoadmapAccordion advice={advice} />
        <h1 className="text-2xl font-bold mt-10 text-center my-8">Recommended Learning Resources</h1>
        <LearningResourcesCarousel resources={resources} />
      </> : ""}

    </div>
  );
}
