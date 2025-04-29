// src/components/CostExplorerGraph.jsx
import React from 'react';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFusioncharts from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

// Initialize FusionCharts modules
ReactFusioncharts.fcRoot(FusionCharts, Charts, FusionTheme);

const CostExplorerGraph = ({ costData = [], groupByKey = '' }) => {
  // Handle empty state gracefully
  const hasData = costData.length > 0;

  // Group dates by Month-Year format (YYYY-MM)
  const categories = hasData ? [...new Set(costData.map(item => item.USAGE_DATE.substring(0, 7)))] : ["No Data"];

  const seriesMap = {};

  if (hasData) {
    costData.forEach(item => {
      const group = item[groupByKey] || "Unknown";
      const month = item.USAGE_DATE.substring(0, 7);

      if (!seriesMap[group]) {
        seriesMap[group] = {};
      }

      if (seriesMap[group][month]) {
        seriesMap[group][month] += item.TOTAL_USAGE_COST;
      } else {
        seriesMap[group][month] = item.TOTAL_USAGE_COST;
      }
    });
  }

  const dataset = hasData
    ? Object.keys(seriesMap).map(group => ({
        seriesname: group,
        data: categories.map(month => ({
          value: seriesMap[group][month] ? seriesMap[group][month].toFixed(2) : "0",
        })),
      }))
    : [{
        seriesname: "No Data",
        data: [{ value: "0" }]
      }];

  const chartDataSource = {
    chart: {
      caption: hasData ? "Cost Over Time" : "No Cost Data Available",
      xAxisName: "Month",
      yAxisName: "Total Usage Cost ($)",
      theme: "fusion",
      drawCrossLine: "1",
      formatNumberScale: "0",
    },
    categories: [
      {
        category: categories.map(month => ({
          label: month,
        })),
      },
    ],
    dataset: dataset,
  };

  return (
    <div className="cost-explorer-graph">
      <h3>Bar Chart 📊</h3>
      <ReactFusioncharts
        type="mscolumn2d"
        width="100%"
        height="400"
        dataFormat="JSON"
        dataSource={chartDataSource}
      />

      <h3 style={{ marginTop: "40px" }}>Line Chart 📈</h3>
      <ReactFusioncharts
        type="msline"
        width="100%"
        height="400"
        dataFormat="JSON"
        dataSource={chartDataSource}
      />

      <h3 style={{ marginTop: "40px" }}>Raw Table Data 🧾</h3>
      <div className="cost-table-wrapper">
        <table className="cost-table">
          <thead>
            <tr>
              <th>Month (YYYY-MM)</th>
              <th>{groupByKey || "Group By"}</th>
              <th>Total Usage Cost ($)</th>
            </tr>
          </thead>
          <tbody>
            {hasData ? (
              costData.map((row, idx) => (
                <tr key={idx}>
                  <td>{row.USAGE_DATE.substring(0, 7)}</td>
                  <td>{row[groupByKey]}</td>
                  <td>${parseFloat(row.TOTAL_USAGE_COST).toFixed(2)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" style={{ textAlign: "center", color: "#999" }}>
                  No Cost Data Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CostExplorerGraph;
