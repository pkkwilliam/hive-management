import { BEDROCK_QUERY_LIST_SERVICE_REQUEST } from '@/services/hive/bedrockTemplateService';
import { COMPANY_PRINTER_SERVICE_CONFIG } from '@/services/printerService';
import { useState, useCallback, useEffect } from 'react';

export default () => {
  const [printers, setPrinters] = useState([]);
  const queryPrinters = () => {
    BEDROCK_QUERY_LIST_SERVICE_REQUEST(COMPANY_PRINTER_SERVICE_CONFIG).then((response) =>
      setPrinters(response.data),
    );
  };

  useEffect(() => {
    queryPrinters();
  }, []);

  const getPrinters = useCallback(queryPrinters, []);

  return { printers, getPrinters };
};
