import React, { useEffect, useState, useCallback } from "react";
import StackedBarchart from "./StackedBarchart";
import * as d3 from "d3";

function InfoChart({ data }) {
  const [chartData, setChartData] = useState(null);
  const chartProps = {
    margin: { top: 40, left: 30, bottom: 30, right: 200 },
    width: 400,
    height: 150,
    barWidth: 15
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
      activity[[course["Course Code"]]] = {
        work: course["Work %"],
        type: "ht"
      };
    });
    summary["VT Courses"].forEach(course => {
      let c = activity[[course["Course Code"]]];
      if (c in activity) {
        activity[`VT${c}`] = { work: course["Work %"], type: "vt" };
      } else {
        activity[[course["Course Code"]]] = {
          work: course["Work %"],
          type: "vt"
        };
      }
    });

    if (summary["Self-development &Friskvård (%)"]) {
      activity["Friskvård"] = {
        work: summary["Self-development &Friskvård (%)"],
        type: "other"
      };
    }
    if (summary["Extra (%)"]) {
      activity["Extra"] = { work: summary["Extra (%)"] || 0, type: "other" };
    }
    activity["Kontering"] = {
      work: summary["Kontering HCT (%)"],
      type: "kontering"
    };
    // activity["Employed HCT"] = {
    //   work: summary["Bemnnad HCT Gru (%)"],
    //   type: "kontering"
    // };
    activity["group"] = "Workload";

    setChartData([activity]);
  };

  //DH2650: {work:0.9,type:'VT'}, DM2350: 3.3, DH2323: 6.5, group: "Workload"}

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
