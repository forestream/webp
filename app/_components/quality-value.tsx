"use client";

import { useQuality } from "./quality-provider";

export function QualityValue() {
  const { value } = useQuality();
  return value;
}
