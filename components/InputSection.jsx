import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function InputSection({ inputValue, setInputValue, handleClick, loading }) {
  return (
    <div className="flex justify-center mb-10">
      <div className="w-full max-w-[800px] flex gap-3">
        <Input
          type="text"
          placeholder="Enter your skills..."
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          className="flex-1"
        />
        <Button variant="outline" onClick={handleClick} disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {loading ? "Analyzing..." : "Send"}
        </Button>
      </div>
    </div>
  );
}
