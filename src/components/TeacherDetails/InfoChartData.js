import React, { useEffect, useState, useCallback } from "react";
import StackedBarchart from "./StackedBarchart";
import * as d3 from "d3";

function InfoChart({ data }) {
  const [chartData, setChartData] = useState(null);
  const chartProps = {
    margin: { top: 10, left: 30, bottom: 110, right: 100 },
    width: 300,
    height: 150
  };
  const handleData = () => {
    const summary = data.summary;

    let activity = {};
    let vt = summary["HT Courses"].map(c => {
      return {
        [c["Course Code"]]: c["Work %"],
        type: "HT",
        subgroup: "workload"
      };
    });
    summary["HT Courses"].forEach(course => {
      activity[[course["Course Code"]]] = course["Work %"];
    });
    summary["VT Courses"].forEach(course => {
      let c = activity[[course["Course Code"]]];
      if (c in activity) {
        activity[`VT${c}`] = course["Work %"];
      } else {
        activity[[course["Course Code"]]] = course["Work %"];
      }
    });

    if (summary["Self-development &Friskvård (%)"]) {
      activity["Friskvård"] = summary["Self-development &Friskvård (%)"];
    }
    if (summary["Extra (%)"]) {
      activity["Extra"] = summary["Extra (%)"] || 1; // should be 0!
    }
    activity["group"] = "Workload";

    setChartData([activity]);
  };
  useEffect(() => {
    if (data) {
      handleData();
    }
  }, [data]);
  if (chartData) {
    return <StackedBarchart {...chartProps} data={chartData} />;
  } else {
    return <div>Loading InfoChart</div>;
  }
}

export default InfoChart;
