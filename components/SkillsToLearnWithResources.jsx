"use client"

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card"

export default function SkillsToLearn({ skills = [] }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">🚀 Skills to Learn</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-3">
        {skills.length === 0 ? (
          <p className="text-sm text-muted-foreground">No skills added yet.</p>
        ) : (
          skills.map((skill, idx) => {
            const name = skill?.skill ?? "Unknown Skill"
            const desc = skill?.description ?? ""

            return (
              <HoverCard key={name + idx}>
                <HoverCardTrigger asChild>
                  <Badge
                    variant="outline"
                    className="cursor-pointer px-3 py-1 text-sm hover:bg-primary/10 transition"
                  >
                    {name.trim()}
                  </Badge>
                </HoverCardTrigger>
                <HoverCardContent className="w-72 p-4 shadow-md border">
                  <h4 className="text-sm font-semibold mb-1">{name.trim()}</h4>
                  {desc && (
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {desc.trim()}
                    </p>
                  )}
                </HoverCardContent>
              </HoverCard>
            )
          })
        )}
      </CardContent>
    </Card>
  )
}
