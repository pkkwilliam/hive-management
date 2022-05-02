import React, { useEffect, useState } from 'react';
import { COMPANY_MANAGER_GET_MEDIA_UPLOAD_TOKEN } from '@/services/hive/imageService';
import { ProFormUploadButton } from '@ant-design/pro-form';

const ProFormMediaUpload = (props) => {
  const { isArray = false } = props;
  const [currentFileList, setCurrentFileList] = useState([]);
  const [token, setToken] = useState();

  useEffect(() => {
    // clear the list once the id has changed
    setCurrentFileList([]);

    // get form imageUrls by name
    let currentValues = props.form.getFieldValue(props.name);

    console.log(props?.form?.getFieldValue('id'), currentFileList);
    if (!isArray) {
      currentValues = [currentValues];
    }
    // something in the array
    if (currentValues[0]) {
      setCurrentFileList(
        currentValues.map((value, index) => ({ uid: index, status: 'done', url: value, index })),
      );
    }
  }, [props?.form?.getFieldValue('id')]);

  const beforeUpload = async () => {
    const response = await COMPANY_MANAGER_GET_MEDIA_UPLOAD_TOKEN();
    setToken(response.token);
  };

  const onChange = ({ file, fileList, event }) => {
    console.log(fileList);

    let someNotDone = false;
    fileList.forEach((subFile) => {
      if (subFile.status !== 'done') {
        someNotDone = true;
      }
    });

    console.log('someNotDone', someNotDone);
    if (!someNotDone) {
      let result = fileList.map((file) =>
        file.url ? file.url : file.response.accessUrl + '/' + file.response.key,
      );
      setForm(result);
    }
    setCurrentFileList(fileList);
  };

  const onRemove = (file) => {
    const { index } = file;
    console.log(file, index);
    let updateFileList = currentFileList;
    updateFileList.splice(index, 1);
    console.log(updateFileList);
    props.form.setFieldsValue({
      ...props.form.getFieldsValue,
      [props.name]: transformFormFieldType(updateFileList),
    });
    setCurrentFileList(updateFileList);
  };

  const setForm = (result) => {
    const transformedFormFieldValue = transformFormFieldType(result);
    console.log(transformedFormFieldValue);
    const updateFieldsValue = {
      ...props.form.getFieldsValue(),
      [props.name]: transformedFormFieldValue,
    };
    console.log(updateFieldsValue);
    const response = props.form.setFieldsValue(updateFieldsValue);
    console.log(response, props.form.setFieldsValue);
    console.log(props.form.getFieldsValue());
  };

  const transformFormFieldType = (currentList) => {
    if (isArray) {
      return currentList;
    } else {
      return currentList[0] ? currentList[0] : undefined;
    }
  };

  return (
    <ProFormUploadButton
      action="https://up-z2.qiniup.com"
      fileList={currentFileList}
      fieldProps={{
        beforeUpload: beforeUpload,
        data: { token },
        listType: 'picture-card',
        //	发到后台的文件参数名
        name: 'file',
        onChange: onChange,
        onRemove: onRemove,
      }}
      title="單擊上傳"
      {...props}
    />
  );
};

export default ProFormMediaUpload;
