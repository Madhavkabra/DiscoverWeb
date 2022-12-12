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
