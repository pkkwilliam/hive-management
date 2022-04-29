export const onChangeModalVisible = (visible, setVisible, setCurrentRow = () => {}) => {
  if (!visible) {
    setCurrentRow(undefined);
  }
  setVisible(visible);
};
