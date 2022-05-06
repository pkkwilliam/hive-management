export const onModalFormVisibleChange = (parentPageVisibleChange, form, visible) => {
  if (!visible) {
    form.resetFields();
  }
  parentPageVisibleChange(visible);
};

export const setFormFields = (values, form) => {
  form.setFieldsValue({
    ...values,
    id: values?.id ? values.id : new Date().getMilliseconds(),
  });
};
