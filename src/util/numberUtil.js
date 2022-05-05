export function money(value, showSign = true, defaultValue = '-') {
  let result;
  if (!value || value === 0) {
    result = defaultValue;
  } else {
    result = value.toFixed(2);
  }
  return showSign ? `$${result}` : result;
}
