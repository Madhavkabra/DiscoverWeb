import { ApiResStatus } from '../../../../../constants/apiResStatus';
import mockUserData from '../../../../../__mocks__/users.json';

const FETCH_USERS = 10;

export const getPaginatedUsers = (config) => {
  const page = config.params.page;
  const paginatedUsers = mockUserData.slice(0, page * FETCH_USERS);

  const data = {
    users: paginatedUsers,
    totalUsers: mockUserData.length,
  };

  return [ApiResStatus.SUCCESS, data];
};
