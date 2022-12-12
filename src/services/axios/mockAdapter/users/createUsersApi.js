import { getUsers } from './utils/getUsers';
import { axiosMockAdapter } from '../axiosMockAdapter';

// To get all users
axiosMockAdapter.onGet(/users\/?.*/).reply(getUsers);
