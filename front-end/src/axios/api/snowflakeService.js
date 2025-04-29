// src/services/snowflakeService.js
import api from './appClient'; // ✅ your centralized axios instance

export const getGroupByOptions = async () => {
  return api.get('/api/snowflake/group-by-options');
};

export const getFilterOptions = async (groupByKey) => {
  return api.get(`/api/snowflake/filters?groupBy=${groupByKey}`);
};

export const getCostData = async (requestBody) => {
  return api.post('/api/snowflake/cost', requestBody);
};
