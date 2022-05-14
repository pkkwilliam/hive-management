import {
  BEDROCK_ACTIVATE_SERVICE_REQEUST,
  BEDROCK_CREATE_SERVICE_REQEUST,
  BEDROCK_DEACTIVATE_SERVICE_REQUEST,
  BEDROCK_QUERY_FIRST_SERVICE_REQUEST,
  BEDROCK_QUERY_LIST_SERVICE_REQUEST,
  BEDROCK_QUERY_PAGINATION_SERVICE_REQUEST,
  BEDROCK_UPDATE_SERVICE_REQUEST,
} from '@/services/hive/bedrockTemplateService';

export const proTableOnChangeModalVisible = (visible, setVisible, setCurrentRow = () => {}) => {
  if (!visible) {
    setCurrentRow(undefined);
  }
  setVisible(visible);
};

export const proTableCrudServiceGenerator = (serviceConfig, tableActionRef) => {
  return {
    activate: async (request, { onSuccess = () => {} } = {}) => {
      await BEDROCK_ACTIVATE_SERVICE_REQEUST(serviceConfig, request.id);
      tableActionRef.current.reload();
      onSuccess();
      return true;
    },
    create: async (request, { onSuccess = () => {} } = {}) => {
      await BEDROCK_CREATE_SERVICE_REQEUST(serviceConfig, request);
      tableActionRef.current.reload();
      onSuccess();
      return true;
    },
    deactivate: async (request, { onSuccess = () => {} } = {}) => {
      await BEDROCK_DEACTIVATE_SERVICE_REQUEST(serviceConfig, request.id);
      tableActionRef.current.reload();
      onSuccess();
      return true;
    },
    queryList: async (params, { onSuccess = () => {} } = {}) => {
      const response = await BEDROCK_QUERY_FIRST_SERVICE_REQUEST(serviceConfig, params);
      onSuccess();
      return response;
    },
    queryList: async (params, { onSuccess = () => {} } = {}) => {
      const response = await BEDROCK_QUERY_LIST_SERVICE_REQUEST(serviceConfig, params);
      onSuccess();
      return response;
    },
    queryPagination: async (params, sort, filter, { onSuccess = () => {} } = {}) => {
      const response = await BEDROCK_QUERY_PAGINATION_SERVICE_REQUEST(
        serviceConfig,
        params,
        sort,
        filter,
      );
      onSuccess();
      return response;
    },
    update: async (request, { onSuccess = () => {} } = {}) => {
      await BEDROCK_UPDATE_SERVICE_REQUEST(serviceConfig, request);
      tableActionRef.current.reload();
      onSuccess();
      return true;
    },
  };
};
