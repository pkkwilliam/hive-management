export const proTableOnChangeModalVisible = (visible, setVisible, setCurrentRow = () => {}) => {
  if (!visible) {
    setCurrentRow(undefined);
  }
  setVisible(visible);
};
