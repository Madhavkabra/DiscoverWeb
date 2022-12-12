import { axiosMockAdapter } from '../axiosMockAdapter';

import { ApiResStatus } from '../../../../constants/apiResStatus';
import mockUserData from '../../../../__mocks__/users.json';

// To get all users
axiosMockAdapter.onGet('/users').reply(ApiResStatus.SUCCESS, {
  users: mockUserData,
});
