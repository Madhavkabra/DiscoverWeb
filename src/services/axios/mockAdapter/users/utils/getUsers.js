import { getPaginatedUsers } from './getPaginatedUsers';
import { getSortedUsers } from './getSortedUsers';
import { getSearchedUsers } from './getSearchedUsers';

import { ApiResStatus } from '../../../../../constants/apiResStatus';
import mockUserData from '../../../../../__mocks__/users.json';
import { getParamsFromUserURL } from './getParamsFromUserURL';

export const getUsers = (config) => {
  const {
    page,
    sortBy,
    sortOrder,
    users,
    searchColumn,
    searchText,
    globalSearch,
  } = getParamsFromUserURL(config.url);

  const data = {
    users: [],
    totalUsers: mockUserData.length,
  };

  if (!users?.length && !sortBy && !searchColumn && !searchText) {
    // Execute When request to get users without any action
    const paginatedUsers = getPaginatedUsers(page);
    data.users = getSortedUsers(paginatedUsers, sortBy, sortOrder);
  } else if (users?.length && sortBy) {
    // Execute When request for sort columns
    data.users = getSortedUsers(users, sortBy, sortOrder);
  } else if (searchColumn && searchText) {
    // Execute when request for global/column search
    const searchedUsers = getSearchedUsers(
      page,
      searchColumn,
      searchText,
      globalSearch
    );

    data.users = searchedUsers.users;
    data.totalUsers = searchedUsers.totalUsers;
  }

  return [ApiResStatus.SUCCESS, data];
};
