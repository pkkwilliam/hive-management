import { useState, useCallback, useEffect } from 'react';
import { GET_COMPANY_ONBOARD } from '@/services/hive/companyOnboardService';
import { useModel } from 'umi';

export default () => {
  const { initialState } = useModel('@@initialState');
  const [onboard, setOnboard] = useState([]);

  const queryOnboard = () => {
    // GET_COMPANY_ONBOARD().then((response) => setOnboard(response));
  };

  useEffect(() => {
    if (!initialState?.currentUser) {
      return;
    }
    queryOnboard();
  }, [initialState?.currentUser]);

  const getOnboard = useCallback(queryOnboard, []);

  return { onboard, getOnboard };
};
