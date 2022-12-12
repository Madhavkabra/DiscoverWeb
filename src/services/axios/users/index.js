import { request } from '../interceptor';

export const getAllUsers = async () => {
  return request({
    url: '/users',
  });
};
