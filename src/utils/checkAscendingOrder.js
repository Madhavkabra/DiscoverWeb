import { SortingOrder } from '../constants/sortingOrder';

/**
 *
 * @param {string} order Available sorting order [Ascending, Descending]
 * @returns boolean value
 */
export const checkAscendingOrder = (order) =>
  order === SortingOrder.ASCENDING_ORDER;
