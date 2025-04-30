// src/components/CostExplorerGraph.jsx
import React from 'react';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFusioncharts from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

ReactFusioncharts.fcRoot(FusionCharts, Charts, FusionTheme);

const CostExplorerGraph = ({ costData = [], groupByKey = '' }) => {
  const hasData = costData?.length > 0;

  const categories = hasData 
    ? [...new Set(costData.map(item => (item?.USAGE_DATE || item?.USAGE_MONTH)?.substring(0, 7)))]
    : ["No Data"];

  const seriesMap = {};

  if (hasData) {
    costData.forEach(item => {
      const group = item?.[groupByKey] ?? "Others"; //for betterment of result use '??'
      const month = (item?.USAGE_DATE || item?.USAGE_MONTH)?.substring(0, 7);

      if (!seriesMap[group]) {
        seriesMap[group] = {};
      }

      seriesMap[group][month] = (seriesMap[group][month] || 0) + item?.TOTAL_USAGE_COST;
    });
  }

  const dataset = hasData
    ? Object.keys(seriesMap).map(group => ({
        seriesname: group,
        data: categories.map(month => ({
          value: seriesMap[group]?.[month]?.toFixed(2) || "0",
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
    <div className="cost-explorer-container">
      <div className="chart-section">
        <h3>Bar Chart 📊</h3>
        <ReactFusioncharts
          type="mscolumn2d"
          width="100%"
          height="400"
          dataFormat="JSON"
          dataSource={chartDataSource}
        />
      </div>

      <div className="chart-section">
        <h3>Line Chart 📈</h3>
        <ReactFusioncharts
          type="msline"
          width="100%"
          height="400"
          dataFormat="JSON"
          dataSource={chartDataSource}
        />
      </div>

      <div className="table-section">
        <h3>Raw Table Data 🧾</h3>
        <div className="table-wrapper">
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
                    <td>{(row?.USAGE_DATE || row?.USAGE_MONTH)?.substring(0, 7)}</td>
                    <td>{row?.[groupByKey]}</td>
                    <td>${parseFloat(row?.TOTAL_USAGE_COST || 0).toFixed(2)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="no-data-cell">No Cost Data Available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CostExplorerGraph;
