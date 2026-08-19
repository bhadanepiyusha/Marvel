import { useState } from "react";
import { Outlet, useLocation } from "react-router";
import Navigation from "./Navigation";
import { universeThemes, Universe } from "../data/marvelData";

export default function RootLayout() {
  const [currentUniverse, setCurrentUniverse] = useState<Universe>("earth-616");
  const location = useLocation();
  
  const theme = universeThemes.find(t => t.id === currentUniverse) || universeThemes[0];

  // Props to pass to child routes
  const childProps = {
    accentColor: theme.accentColor,
    gradientFrom: theme.gradientFrom,
    currentUniverse,
    setCurrentUniverse,
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0A0A0F" }}>
      <Navigation accentColor={theme.accentColor} />
      <Outlet context={childProps} />
    </div>
  );
}
