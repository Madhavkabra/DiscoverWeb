import mockUserData from '../../../../../__mocks__/users.json';

export const FETCH_USERS = 10;

export const getPaginatedUsers = (page) => {
  const paginatedUsers = mockUserData.slice(0, page * FETCH_USERS);

  return paginatedUsers;
};
