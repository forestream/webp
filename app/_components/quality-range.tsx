"use client";

import { Input } from "@devup-ui/react";
import { useQuality } from "./quality-provider";
import { ComponentProps } from "react";

export function QualityRange(
  props: Omit<ComponentProps<typeof Input<"input">>, "type">,
) {
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
      {...props}
    />
  );
}
