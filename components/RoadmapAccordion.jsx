import React from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function RoadmapAccordion({ advice }) {
  if (!advice?.learning_roadmap) return null;

  return (
    <Card className="max-w-[800px] mx-auto mb-8 p-4 shadow-md">
      <CardHeader>
        <CardTitle>Learning Roadmap</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible>
          {Array.isArray(advice?.learning_roadmap) &&
            advice.learning_roadmap.map((step) => (
              <AccordionItem value={`step-${step.step}`} key={step.step}>
                <AccordionTrigger>{step.step}. {step.title}</AccordionTrigger>
                <AccordionContent>
                  {step.description}
                </AccordionContent>
              </AccordionItem>
            ))
          }
        </Accordion>

      </CardContent>
    </Card>
  );
}
