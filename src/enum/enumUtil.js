export function convertEnumsToProTableValueEnum(enums) {
  let result = {};
  enums.forEach((object) => {
    let value = { text: object.label };
    if (object.status) {
      value = { ...value, status: object.status };
    }
    result[object.key] = value;
  });
  return result;
}

export function getEnumLabelByKey(enums, key, undefinedLabel = 'UNKNOWN') {
  return getEnumObjectByKey(enums, key, undefinedLabel).label;
}

export function getEnumObjectByKey(enums, key, undefinedLabel = 'UNKNOWN') {
  for (let index = 0; index < enums.length; index++) {
    if (enums[index].key === key) {
      return enums[index];
    }
  }
  return { label: undefinedLabel };
}

/**
 * This is for ProForm Select
 * @param {*} enums
 * @returns
 */
export function getEnumOjbectsWithValueAsKey(enums) {
  return enums.map((object) => ({ ...object, value: object.key }));
}

/**
 * this is for ProTable Columns
 * @param {*} enums
 * @returns
 */
export function getValueEnum(enums) {
  return enums.reduce(
    (previousValue, currentValue) => ({
      ...previousValue,
      [currentValue.key]: { ...currentValue, text: currentValue.label },
    }),
    {},
  );
}
