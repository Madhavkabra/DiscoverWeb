/**
 *
 * @param {string} url API URL to extract path
 * @returns extracted path
 */
export const extractPathFromURL = (url) => url.replace(/.*\?/, '');
