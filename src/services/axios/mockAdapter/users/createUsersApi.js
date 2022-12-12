import { axiosMockAdapter } from '../axiosMockAdapter';
import { getPaginatedUsers } from './utils/getPaginatedUsers';
import { getSortedUsers } from './utils/getSortedUsers';

// To get all users
axiosMockAdapter.onGet('/users').reply(getPaginatedUsers);

axiosMockAdapter.onGet('/sorted-users').reply(getSortedUsers);
