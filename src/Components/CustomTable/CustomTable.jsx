import React, { useEffect, useMemo } from 'react';
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
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useTheme } from '@mui/material/styles';
import {
  createColumnHelper,
  flexRender,
  useReactTable,
  getCoreRowModel,
} from '@tanstack/react-table';
import { ColorModeContext } from '../../App';
import {
  getGlobalSearchedUsers,
  getUsers,
  getSearchedUsersByColumn,
  getSortedUsersByColumn,
} from '../../services/axios/users';

const columnHelper = createColumnHelper();

const CustomTable = () => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const [data, setData] = React.useState([]);
  const [columnPinning, setColumnPinning] = React.useState({});
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');

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
        ],
      },
    ],
    []
  );

  const getData = async () => {
    const user = await getUsers(1);
    setData(user.users);
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      columnPinning,
    },
    getCoreRowModel: getCoreRowModel(),
    onColumnPinningChange: setColumnPinning,
    debugTable: true,
  });

  const handleColumnFilterChange = async (name, value) => {
    if (value) {
      if (name === 'globalSearch') {
        const globalSearch = await getGlobalSearchedUsers(value, 2);
        setData(globalSearch.users);
      } else {
        const searchData = await getSearchedUsersByColumn(name, value);
        setData(searchData.users);
      }
    }
  };

  const handleSort = async (columnName) => {
    setOrder(order === 'asc' ? 'desc' : 'asc');
    const sortedColumn = await getSortedUsersByColumn(
      JSON.stringify(data),
      columnName,
      order.toUpperCase()
    );
    setOrderBy(columnName);
    setData(sortedColumn.users);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box style={{ width: '100%', textAlign: 'end' }}>
      <TableContainer component={Paper}>
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
        <IconButton
          sx={{ margin: '20px' }}
          onClick={colorMode.toggleColorMode}
          variant='contained'
        >
          {theme.palette.mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
        <Box>
          <Table
            sx={{ minWidth: 650, overflow: 'scroll' }}
            aria-label='simple table'
          >
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    console.log('header', header);
                    return (
                      <TableCell
                        key={header.id}
                        sortDirection={orderBy === header.id ? order : false}
                        colSpan={header.colSpan}
                        sx={{ textAlign: 'center' }}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        {header.column.parent && (
                          <>
                            <IconButton size='small'>
                              <MoreVertIcon />
                            </IconButton>
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
                            {header.id !== 'id' && (
                              <Input
                                placeholder={`Filter by ${header.column.columnDef.header}`}
                                name={`${header.id}`}
                                onChange={(e) =>
                                  handleColumnFilterChange(
                                    e.target.name,
                                    e.target.value
                                  )
                                }
                                endAdornment={
                                  <InputAdornment position='end'>
                                    <IconButton size='small'>
                                      <CloseIcon />
                                    </IconButton>
                                  </InputAdornment>
                                }
                              />
                            )}
                            <TableSortLabel
                              active={orderBy === header.id}
                              direction={order}
                              onClick={() => handleSort(header.id)}
                            ></TableSortLabel>
                          </>
                        )}
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
        <div style={{ textAlign: 'initial' }}>Fetched 25 of 200 total rows</div>
      </TableContainer>
    </Box>
  );
};

export default CustomTable;
