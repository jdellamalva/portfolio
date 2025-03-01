import React from "react";

interface AboutDebugProps {
  showMap: boolean;
  setShowMap: React.Dispatch<React.SetStateAction<boolean>>;
  showTooltips: boolean;
  setShowTooltips: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AboutDebug({
  showMap,
  setShowMap,
  showTooltips,
  setShowTooltips,
}: AboutDebugProps) {
  return (
    <div>
      <label>
        Show Map:
        <input
          type="checkbox"
          checked={showMap}
          onChange={(e) => setShowMap(e.target.checked)}
        />
      </label>
      <label>
        Show Tooltips:
        <input
          type="checkbox"
          checked={showTooltips}
          onChange={(e) => setShowTooltips(e.target.checked)}
        />
      </label>
    </div>
  );
}