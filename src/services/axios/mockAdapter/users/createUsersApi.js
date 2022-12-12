import { axiosMockAdapter } from '../axiosMockAdapter';
import { getPaginatedUsers } from './utils/getPaginatedUsers';

// To get all users
axiosMockAdapter.onGet('/users').reply(getPaginatedUsers);
