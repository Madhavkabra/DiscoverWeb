import mockUserData from '../../../../../__mocks__/users.json';
import { convertStringToLowercase } from '../../../../../utils/convertStringToLowercase';
import { FETCH_USERS } from './getPaginatedUsers';

export const getSearchedUsers = (
  page,
  searchColumn,
  searchText,
  globalSearch
) => {
  const searchTextInLowercase = convertStringToLowercase(searchText);
  let filteredUsers = [];

  if (globalSearch) {
    const userKeys = Object.keys(mockUserData[0]);
    filteredUsers = mockUserData?.filter((user) =>
      userKeys.some((userKey) =>
        convertStringToLowercase(user[userKey]).includes(searchTextInLowercase)
      )
    );
  } else {
    filteredUsers = mockUserData?.filter((user) =>
      convertStringToLowercase(user[searchColumn]).includes(
        searchTextInLowercase
      )
    );
  }

  const paginatedUsers = filteredUsers.slice(0, FETCH_USERS * page);

  return {
    users: paginatedUsers,
    totalUsers: filteredUsers.length,
  };
};
