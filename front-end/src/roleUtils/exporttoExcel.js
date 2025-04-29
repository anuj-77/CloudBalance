import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export const exportToExcel = (data, groupByKey) => {
  // Prepare data for Excel
  const excelData = [];

  // Group data by month
  const monthSet = new Set();
  data.forEach(item => {
    monthSet.add(item.USAGE_DATE.substring(0, 7));
  });

  const months = Array.from(monthSet).sort(); // sort months properly

  const groupMap = {};

  data.forEach(item => {
    const month = item.USAGE_DATE.substring(0, 7);
    const group = item[groupByKey];

    if (!groupMap[group]) {
      groupMap[group] = {};
    }

    groupMap[group][month] = (groupMap[group][month] || 0) + item.TOTAL_USAGE_COST;
  });

  // Build structured rows
  for (const [groupName, monthCosts] of Object.entries(groupMap)) {
    const row = { [groupByKey]: groupName };
    months.forEach(month => {
      row[month] = monthCosts[month] ? monthCosts[month].toFixed(2) : "0";
    });
    excelData.push(row);
  }

  // Create sheet
  const worksheet = XLSX.utils.json_to_sheet(excelData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Cost Data");

  // Download Excel
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(blob, 'cost-data.xlsx');
};
