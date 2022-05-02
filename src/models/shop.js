import { useState, useCallback, useEffect } from 'react';
import { BEDROCK_QUERY_LIST_SERVICE_REQUEST } from '@/services/hive/bedrockTemplateService';
import { COMPANY_SHOP_SERVICE_CONFIG } from '@/services/hive/shopService';
import { useModel } from 'umi';

export default () => {
  const { initialState } = useModel('@@initialState');
  const [shops, setShops] = useState([]);

  const queryShops = () => {
    BEDROCK_QUERY_LIST_SERVICE_REQUEST(COMPANY_SHOP_SERVICE_CONFIG).then((response) =>
      setShops(response.data),
    );
  };

  useEffect(() => {
    if (!initialState?.currentUser) {
      return;
    }
    queryShops();
  }, [initialState?.currentUser]);

  const getShops = useCallback(queryShops, []);

  return { shops, getShops };
};
