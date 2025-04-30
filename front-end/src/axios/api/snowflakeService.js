import api from './appClient'; 

export const getGroupByOptions = async () => {
  return api.get('/api/snowflake/group-by-options');
};

export const getFilterOptions = async (groupByKey) => {
  return api.get(`/api/snowflake/filters?groupBy=${groupByKey}`);
};

export const getCostData = async (requestBody) => {
  return api.post('/api/snowflake/cost', requestBody);
};

export const getAllCostData = async (requestBody) => {
  return api.post('/api/snowflake/complete-cost', requestBody)};