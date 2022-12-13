import React, { useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import PushPinIcon from '@mui/icons-material/PushPin';
import CancelIcon from '@mui/icons-material/Cancel';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import {
  createColumnHelper,
  flexRender,
  useReactTable,
  getCoreRowModel,
} from '@tanstack/react-table';
import { useInfiniteQuery } from '@tanstack/react-query';
import {
  getGlobalSearchedUsers,
  getUsers,
  getSearchedUsersByColumn,
  getSortedUsersByColumn,
} from '../../services/axios/users';
import './CustomTable.css';

const columnHelper = createColumnHelper();

const CustomTable = () => {
  const [users, setUsers] = React.useState({ users: [], totalUsers: 0 });
  const [columnPinning, setColumnPinning] = React.useState({});
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');
  const [searchText, setSearchText] = useState('');
  const [searchColumnName, setSearchColumnName] = useState('');
  const [isGlobalSearch, setIsGlobalSearch] = useState(false);
  const tableContainerRef = React.useRef(null);

  const columns = useMemo(
    () => [
      {
        header: 'Name',
        footer: (props) => props.column.id,
        columns: [
          columnHelper.accessor('firstName', {
            id: 'firstName',
            header: 'First Name',
            cell: (info) => info.getValue(),
            footer: (info) => info.column.id,
          }),
          columnHelper.accessor((row) => row.lastName, {
            id: 'lastName',
            header: 'Last Name',
            cell: (info) => <i>{info.getValue()}</i>,
            footer: (info) => info.column.id,
          }),
        ],
      },
      {
        header: 'Info',
        footer: (props) => props.column.id,
        columns: [
          columnHelper.accessor('address', {
            id: 'address',
            header: 'Address',
            cell: (info) => info.renderValue(),
            footer: (info) => info.column.id,
          }),
          columnHelper.accessor('state', {
            id: 'state',
            header: 'State',
            footer: (info) => info.column.id,
          }),
          columnHelper.accessor('phone', {
            id: 'phone',
            header: 'Phone Number',
            footer: (info) => info.column.id,
          }),
          columnHelper.accessor('email', {
            id: 'email',
            header: 'Email',
            footer: (info) => info.column.id,
          }),
        ],
      },
    ],
    []
  );

  const { fetchNextPage, isFetching } = useInfiniteQuery(
    ['table-data', 'ASCE'],
    async ({ pageParam }) => {
      const fetchedData = await getUsers(
        pageParam,
        isGlobalSearch,
        searchColumnName,
        searchText
      );
      setUsers(fetchedData);
    },
    {
      getNextPageParam: (_lastGroup, groups) => groups.length,
      refetchOnWindowFocus: false,
    }
  );

  const fetchMoreOnBottomReached = React.useCallback(
    (containerRefElement) => {
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
        //once the user has scrolled within 10px of the bottom of the table, fetch more data if there is any
        if (
          scrollHeight - scrollTop - clientHeight < 10 &&
          !isFetching &&
          users.users.length < users.totalUsers
        ) {
          fetchNextPage();
        }
      }
    },
    [fetchNextPage, isFetching, users]
  );

  useEffect(() => {
    fetchMoreOnBottomReached(tableContainerRef.current);
  }, [fetchMoreOnBottomReached]);

  const table = useReactTable({
    data: users.users,
    columns,
    state: {
      columnPinning,
    },
    getCoreRowModel: getCoreRowModel(),
    onColumnPinningChange: setColumnPinning,
    debugTable: true,
  });

  const handleColumnFilterChange = async (name, value) => {
    setSearchText(value);
    setSearchColumnName(name);
    if (name === 'globalSearch') {
      setIsGlobalSearch(true);
      const globalSearch = await getGlobalSearchedUsers(value, 2);
      setUsers(globalSearch);
    } else {
      setIsGlobalSearch(false);
      const searchData = await getSearchedUsersByColumn(name, value);
      setUsers(searchData);
    }
  };

  const handleSort = async (columnName) => {
    setOrder(order === 'asc' ? 'desc' : 'asc');
    const sortedColumn = await getSortedUsersByColumn(
      JSON.stringify(users.users),
      columnName,
      order.toUpperCase()
    );
    setOrderBy(columnName);
    setUsers(sortedColumn);
  };

  const handleClearFilter = async () => {
    const fetchedData = await getUsers(1, isGlobalSearch, '', '');
    setUsers(fetchedData);
    setSearchText('');
  };

  return (
    <Paper style={{ width: '100%', textAlign: 'end' }}>
      <Input
        placeholder='Search'
        name='globalSearch'
        onChange={(e) =>
          handleColumnFilterChange(e.target.name, e.target.value)
        }
        startAdornment={
          <InputAdornment position='end'>
            <IconButton size='small'>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
      />

      <TableContainer
        ref={tableContainerRef}
        onScroll={(e) => fetchMoreOnBottomReached(e.target)}
        component={Paper}
        sx={{ height: '650px', overflowX: 'scroll', overflowY: 'scroll' }}
      >
        <Box>
          <Table
            sx={{ minWidth: 650, overflow: 'scroll' }}
            aria-label='simple table'
          >
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableCell
                        key={header.id}
                        sortDirection={orderBy === header.id ? order : false}
                        colSpan={header.colSpan}
                        sx={{ textAlign: 'left' }}
                      >
                        <div style={{ position: 'sticky' }}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                          {header.column.parent && (
                            <>
                              {!header.isPlaceholder &&
                                header.column.getCanPin() && (
                                  <div style={{ display: 'inline' }}>
                                    {!header.column.getIsPinned() ? (
                                      <IconButton
                                        onClick={() => {
                                          header.column.pin('left');
                                        }}
                                      >
                                        <PushPinIcon sx={{ width: '20px' }} />
                                      </IconButton>
                                    ) : (
                                      <IconButton
                                        onClick={() => {
                                          header.column.pin(false);
                                        }}
                                      >
                                        <CancelIcon sx={{ width: '20px' }} />
                                      </IconButton>
                                    )}
                                  </div>
                                )}
                              <TableSortLabel
                                active={orderBy === header.id}
                                direction={order}
                                onClick={() => handleSort(header.id)}
                              />
                              {header.id !== 'id' && (
                                <Input
                                  placeholder={`Filter by ${header.column.columnDef.header}`}
                                  name={`${header.id}`}
                                  value={
                                    searchColumnName === header.id && searchText
                                      ? searchText
                                      : ''
                                  }
                                  onChange={(e) =>
                                    handleColumnFilterChange(
                                      e.target.name,
                                      e.target.value
                                    )
                                  }
                                  endAdornment={
                                    <InputAdornment position='end'>
                                      <IconButton
                                        size='small'
                                        onClick={() => handleClearFilter()}
                                      >
                                        <CloseIcon />
                                      </IconButton>
                                    </InputAdornment>
                                  }
                                />
                              )}
                            </>
                          )}
                        </div>
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {table.getRowModel().rows.map((row) => {
                return (
                  <TableRow key={row.id}>
                    {row
                      .getVisibleCells()
                      .map(
                        (cell) =>
                          cell.column.id !== 'id' && (
                            <TableCell key={cell.id}>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </TableCell>
                          )
                      )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </TableContainer>
      <div style={{ textAlign: 'initial' }}>
        Fetched {users.users.length} of {users.totalUsers} total rows
      </div>
    </Paper>
  );
};

export default CustomTable;
