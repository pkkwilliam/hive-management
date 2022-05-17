export function getItemPriceRange(item) {
  const defaultResponse = '$-';
  if (!item?.itemSpecificationPriceRangeResponse) {
    return defaultResponse;
  }
  if (item.itemSpecificationPriceRangeResponse.count === 0) {
    return defaultResponse;
  }
  const startFrom = (item.itemSpecificationPriceRangeResponse?.startFrom ?? 0).toFixed(2);
  if (item.itemSpecificationPriceRangeResponse.count === 1) {
    return `$${startFrom}`;
  } else {
    return `$${startFrom}-$${(item.itemSpecificationPriceRangeResponse?.to ?? 0).toFixed(2)}`;
  }
}
