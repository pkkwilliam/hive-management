const DEFAULT_PRICE = '$-';

export function getPrice(price) {
  if (!price) {
    return DEFAULT_PRICE;
  }
  return `$${price.toFixed(2)}`;
}

export function getItemPriceRange(item) {
  if (!item?.itemSpecificationPriceRangeResponse) {
    return DEFAULT_PRICE;
  }
  if (item.itemSpecificationPriceRangeResponse.count === 0) {
    return DEFAULT_PRICE;
  }
  const startFrom = getPrice(item.itemSpecificationPriceRangeResponse?.startFrom ?? 0);
  if (item.itemSpecificationPriceRangeResponse.count === 1) {
    return startFrom;
  }
  const to = getPrice(item.itemSpecificationPriceRangeResponse?.to ?? 0);
  if (startFrom === to) {
    return to;
  } else {
    return `${startFrom}-${to}`;
  }
}
