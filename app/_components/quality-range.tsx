"use client";

import { Input } from "@devup-ui/react";
import { useQuality } from "./quality-provider";

export function QualityRange() {
  const { value, setValue } = useQuality();
  return (
    <Input
      type="range"
      w="100%"
      value={value}
      onChange={(e) => setValue(Number(e.target.value))}
      min={0}
      max={100}
      step={1}
    />
  );
}
