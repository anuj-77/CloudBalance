import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export const exportToExcel = (data, groupByKey) => {
  try {
    if (!data || data.length === 0) {
      alert("No data available to export.");
      return;
    }

    const excelData = [];
    const monthSet = new Set();

    data.forEach(item => {
      if (item.USAGE_MONTH) {
        monthSet.add(item.USAGE_MONTH);
      }
    });

    const months = Array.from(monthSet).sort();
    const groupMap = {};

    data.forEach(item => {
      const month = item.USAGE_MONTH;
      const group = item[groupByKey] || "Unknown";

      if (!groupMap[group]) {
        groupMap[group] = {};
      }

      groupMap[group][month] = (groupMap[group][month] || 0) + item.TOTAL_USAGE_COST;
    });

    for (const [groupName, monthCosts] of Object.entries(groupMap)) {
      const row = { [groupByKey]: groupName };
      months.forEach(month => {
        row[month] = monthCosts[month] ? monthCosts[month].toFixed(2) : "0";
      });
      excelData.push(row);
    }

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Cost Data");

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'cost-data.xlsx');
  } catch (error) {
    console.error("Export failed:", error);
    alert("Failed to export. Try again later.");
  }
};
