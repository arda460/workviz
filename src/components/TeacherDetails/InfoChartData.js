import React, { useEffect, useState } from "react";
import StackedBarchart from "./StackedBarchart";

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
      activity["Extra"] = { work: summary["Extra (%)"] || 0, type: "extra" };
    }
    activity["Kontering"] = {
      work: summary["Kontering HCT (%)"],
      type: "kontering"
    };

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
