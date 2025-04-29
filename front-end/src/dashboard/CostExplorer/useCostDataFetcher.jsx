// src/hooks/useCostDataFetcher.jsx
import { useState, useEffect } from 'react';
import { getCostData } from '../../axios/api/snowflakeService';

const useCostDataFetcher = ({ groupBy, filters, startMonth, endMonth }) => {
  const [costData, setCostData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCostData = async () => {
      if (!groupBy || !startMonth || !endMonth) return;
      
      const requestBody = {
        groupBy,
        filters,
        startMonth,
        endMonth,
      };

      setLoading(true);
      try {
        const response = await getCostData(requestBody);
        setCostData(response.data || []);
      } catch (error) {
        console.error('Failed to fetch cost data:', error.message);
        setCostData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCostData();
  }, [groupBy, filters, startMonth, endMonth]);

  return { costData, loading };
};

export default useCostDataFetcher;
