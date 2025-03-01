"use client";
import { RefObject } from "react";
import { InstancedMesh } from "three";
import { DotManager } from "../app/classes/DotManager"; // Import the singleton manager

const AboutDebug = ({
  showMap,
  setShowMap,
  showTooltips,
  setShowTooltips,
}: {
  showMap: boolean;
  setShowMap: (value: boolean) => void;
  showTooltips: boolean;
  setShowTooltips: (value: boolean) => void;
}) => {
  const dotManager = DotManager.getInstance(); // Get the singleton instance
  const dotCount = dotManager.activeDots.length; // Get active dot count

  return (
    <div
      style={{
        position: "fixed",
        bottom: 10,
        right: 10,
        padding: "10px",
        background: "rgba(0, 0, 0, 0.7)",
        color: "white",
        borderRadius: "5px",
        fontSize: "12px",
      }}
    >
      <p>Dot Count: {dotCount}</p>{" "}
      {/* ✅ Now correctly displaying active dots */}
      <label>
        <input
          type="checkbox"
          checked={showMap}
          onChange={(e) => setShowMap(e.target.checked)}
        />
        Show Mercator Map
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          checked={showTooltips}
          onChange={(e) => setShowTooltips(e.target.checked)}
        />
        Show Dot Tooltips
      </label>
    </div>
  );
};

export default AboutDebug;
