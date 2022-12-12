import { ApiResStatus } from '../../../../../constants/apiResStatus';
import { sortArrayElementsByKey } from '../../../../../utils/sortArrayElementsByKey';

export const getSortedUsers = (config) => {
  const sortOrder = config.params.sortOrder;
  const sortBy = config.params.sortBy;
  const users = config.params.users;

  const sortedUsers = sortArrayElementsByKey(users, sortBy, sortOrder);

  const data = { users: sortedUsers };

  return [ApiResStatus.SUCCESS, data];
};
