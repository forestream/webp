import { createContext, useContext, useState } from "react";

const QualityContext = createContext<{
  value: number;
  setValue: (value: number) => void;
} | null>(null);

export function useQuality() {
  const context = useContext(QualityContext);
  if (!context) {
    throw new Error("useQuality must be used within a QualityProvider");
  }
  return context;
}

export function QualityProvider({ children }: { children: React.ReactNode }) {
  const [value, setValue] = useState(80);
  return (
    <QualityContext.Provider value={{ value, setValue }}>
      {children}
    </QualityContext.Provider>
  );
}
