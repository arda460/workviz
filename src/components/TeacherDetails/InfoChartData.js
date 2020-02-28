import React, { useEffect, useState } from "react";
import StackedBarchart from "./StackedBarchart";
import * as d3 from "d3";

function InfoChart({ data }) {
  const [chartData, setChartData] = useState(null);
  const handleData = () => {
    const summary = data.summary;
    const kontering = summary["Kontering HCT (%)"];

    let grubalans = summary["Bemnnad HCT Gru (%)"];
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
    // let ht = summary["VT Courses"].map(c => {
    //   return {
    //     [c["Course Code"]]: c["Work %"],
    //     type: "VT",
    //     subgroup: "workload"
    //   };
    // });

    // let activity = vt.concat(ht);
    // let activity = vt;
    activity["Friskvård"] = summary["Self-development &Friskvård (%)"] || 1; // should be 0!
    activity["Extra"] = summary["Extra (%)"] || 1; // should be 0!
    activity["subgroup"] = "Workload";

    setChartData([activity]);
  };
  useEffect(() => {
    if (data) {
      handleData();
    }
  }, [data]);
  if (chartData) {
    return <StackedBarchart data={chartData} />;
  } else {
    return <div>Loading InfoChart</div>;
  }
}

export default InfoChart;
