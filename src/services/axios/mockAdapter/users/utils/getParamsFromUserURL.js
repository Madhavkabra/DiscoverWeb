import { SortingOrder } from '../../../../../constants/sortingOrder';
import { extractPathFromURL } from '../../../../../utils/extractPathFromURL';

export const getParamsFromUserURL = (url) => {
  const path = extractPathFromURL(url);
  const params = new URLSearchParams(path);
  const page = params.get('page') || 1;
  const sortOrder = params.get('sortOrder') || SortingOrder.ASCENDING_ORDER;
  const sortBy = params.get('sortBy') || '';
  const searchColumn = params.get('searchColumn');
  const searchText = params.get('searchText');
  const globalSearch = params.get('globalSearch');
  const users =
    typeof params.get('users') === 'string'
      ? JSON.parse(params.get('users'))
      : [];

  return {
    page,
    sortOrder,
    sortBy,
    users,
    searchColumn,
    searchText,
    globalSearch,
  };
};
