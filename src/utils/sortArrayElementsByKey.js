import { checkAscendingOrder } from './checkAscendingOrder';

/**
 *
 * @param {object[]} arr An array, want to sort.
 * @param {string} sortBy A key, on which basis want to sort an array.
 * @param {string} sortOrder Sorting order Eg. Ascending, Descending.
 * @returns Sorted array.
 */
export const sortArrayElementsByKey = (arr, sortBy, sortOrder) => {
  const sortedArr = arr?.sort((firstEle, secondEle) => {
    const firstValue = firstEle[sortBy];
    const secondValue = secondEle[sortBy];

    if (firstValue > secondValue) return 1;

    if (firstValue < secondValue) return -1;

    return 0;
  });

  if (checkAscendingOrder(sortOrder)) {
    return sortedArr;
  }

  return sortedArr.reverse();
};
