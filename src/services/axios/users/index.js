import { SortingOrder } from '../../../constants/sortingOrder';
import { request } from '../interceptor';

/**
 *
 * @param {number} page active page number
 * @returns array of users
 */
export const getUsers = async (page = 1) => {
  return request({
    url: `/users?page=${page}`,
  });
};

/**
 *
 * @param {object[]} users users
 * @param {string} sortBy column name
 * @param {string} sortOrder sorting order
 * @returns sorted users in given sorting order
 */
export const getSortedUsersByColumn = async (
  users,
  sortBy,
  sortOrder = SortingOrder.ASCENDING_ORDER
) => {
  return request({
    url: `/users?users=${users}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
  });
};

/**
 *
 * @param {string} searchColumn column name in which search
 * @param {string} searchText input text
 * @param {number} page active page number
 * @returns all matching users
 */
export const getSearchedUsersByColumn = async (
  searchColumn,
  searchText,
  page = 1
) => {
  return request({
    url: `/users?page=${page}&searchColumn=${searchColumn}&searchText=${searchText}`,
  });
};

/**
 *
 * @param {string} searchText global search input text
 * @param {number} page active page number
 * @returns all matching users
 */
export const getGlobalSearchedUsers = async (searchText, page = 1) => {
  return request({
    url: `/users?page=${page}&globalSearch=true&searchText=${searchText}`,
  });
};
