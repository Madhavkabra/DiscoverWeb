import { sortArrayElementsByKey } from '../../../../../utils/sortArrayElementsByKey';

export const getSortedUsers = (users, sortBy, sortOrder) => {
  const sortedUsers = sortArrayElementsByKey(users, sortBy, sortOrder);

  return sortedUsers;
};
