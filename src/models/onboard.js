import { useState, useCallback, useEffect } from 'react';
import { GET_COMPANY_ONBOARD } from '@/services/hive/companyOnboardService';

export default () => {
  const [onboard, setOnboard] = useState([]);

  const queryOnboard = () => {
    GET_COMPANY_ONBOARD().then((response) => setOnboard(response));
  };

  useEffect(() => {
    queryOnboard();
  }, []);

  const getOnboard = useCallback(queryOnboard, []);

  return { onboard, getOnboard };
};
