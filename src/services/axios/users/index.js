import { SortingOrder } from '../../../constants/sortingOrder';
import { request } from '../interceptor';

/**
 *
 * @param {number} page active page number
 * @returns array of users
 */
export const getUsers = async (page = 1) => {
  return request({
    url: `/users`,
    params: {
      page,
    },
  });
};

export const getSortedUsersByColumn = async (
  users,
  sortBy,
  sortOrder = SortingOrder.ASCENDING_ORDER
) => {
  return request({
    url: '/sorted-users',
    params: {
      users,
      sortBy,
      sortOrder,
    },
  });
};
