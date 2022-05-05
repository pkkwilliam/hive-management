import { CURRENCIES } from '@/enum/currency';

export const calculateTotalCost = (itemSpecifications) => {
  return itemSpecifications.reduce((previous, current) => {
    return previous + current.itemSpecification.price * current.quantity;
  }, 0);
};

export const calculateTotalCostByCurrency = (orders) => {
  // create current object = {MOP: 0, HKD: 0...}
  let result = CURRENCIES.reduce((previous, current) => {
    let key = current.key;
    previous[key] = 0;
    return previous;
  }, {});
  orders.forEach((order) => {
    result[order.currency] += order.cost;
  });
  return result;
};

export const calculateTotalCount = (itemSpecifications) => {
  return itemSpecifications.reduce((previous, current) => previous + current.quantity, 0);
};
