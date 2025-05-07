import React from 'react';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFusioncharts from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

ReactFusioncharts.fcRoot(FusionCharts, Charts, FusionTheme);

const CostExplorerGraph = ({ costData = [], groupByKey = '' }) => {
  const hasData = costData?.length > 0;

  // Helper function to generate an array of months between two dates
  const getAllMonths = (start, end) => {
    const months = [];
    const startDate = new Date(start);
    const endDate = new Date(end);
    startDate.setDate(1); // Ensure we're at the start of the month
    while (startDate <= endDate) {
      const month = startDate.toISOString().substring(0, 7);
      months.push(month);
      startDate.setMonth(startDate.getMonth() + 1);
    }
    return months;
  };

  // Determine the range of months in your data
  const allMonths = hasData
    ? getAllMonths(
        costData.reduce((min, item) => {
          const date = new Date(item?.USAGE_DATE || item?.USAGE_MONTH);
          return date < min ? date : min;
        }, new Date()),
        costData.reduce((max, item) => {
          const date = new Date(item?.USAGE_DATE || item?.USAGE_MONTH);
          return date > max ? date : max;
        }, new Date(0))
      )
    : ["No Data"];

  // Build the series map with all months initialized to 0
  const seriesMap = {};
  if (hasData) {
    costData.forEach(item => {
      const group = item?.[groupByKey] ?? "Others";
      const month = (item?.USAGE_DATE || item?.USAGE_MONTH)?.substring(0, 7);
      if (!seriesMap[group]) {
        seriesMap[group] = {};
        allMonths.forEach(m => {
          seriesMap[group][m] = 0;
        });
      }
      seriesMap[group][month] += item?.TOTAL_USAGE_COST || 0;
    });
  }

  // Prepare the dataset for the chart
  const dataset = hasData
    ? Object.keys(seriesMap).map(group => ({
        seriesname: group,
        data: allMonths.map(month => ({
          value: seriesMap[group][month]?.toFixed(2) || "0",
        })),
      }))
    : [
        {
          seriesname: "No Data",
          data: [{ value: "0" }],
        },
      ];

  // Prepare the categories for the chart
  const categories = [
    {
      category: allMonths.map(month => ({ label: month })),
    },
  ];

  const chartDataSource = {
    chart: {
      caption: hasData ? "Cost Over Time" : "No Cost Data Available",
      xAxisName: "Month",
      yAxisName: "Total Usage Cost ($)",
      theme: "fusion",
      drawCrossLine: "1",
      formatNumberScale: "0",
    },
    categories: categories,
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
                Object.keys(seriesMap).map(group =>
                  allMonths.map(month => (
                    <tr key={`${group}-${month}`}>
                      <td>{month}</td>
                      <td>{group}</td>
                      <td>${seriesMap[group][month].toFixed(2)}</td>
                    </tr>
                  ))
                )
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
