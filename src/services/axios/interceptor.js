import axios from 'axios';

const baseURL = '/';

const client = axios.create({
  baseURL,
});

client.interceptors.request.use((config) => {
  // Configure request options before request is sent.

  return config;
});

export const request = async function (options) {
  const onSuccess = function (response) {
    return response.data;
  };

  const onError = function (error) {
    throw new Error(error.message);
  };

  try {
    const response = await client(options);
    return onSuccess(response);
  } catch (error) {
    return onError(error);
  }
};
