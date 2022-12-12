import React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PushPinIcon from "@mui/icons-material/PushPin";
import CancelIcon from "@mui/icons-material/Cancel";
import { useTheme } from "@mui/material/styles";
import {
  createColumnHelper,
  flexRender,
  useReactTable,
  getCoreRowModel,
} from "@tanstack/react-table";
import { ColorModeContext } from "../../App";

const defaultData = [
  {
    id: "1",
    firstName: "tanner",
    lastName: "linsley",
    address: "India",
    state: "India",
    phoneNumber: "9999999999",
  },
  {
    id: "2",
    firstName: "tandy",
    lastName: "miller",
    address: "India",
    state: "India",
    phoneNumber: "9999999999",
  },
  {
    id: "3",
    firstName: "joe",
    lastName: "dirte",
    address: "India",
    state: "India",
    phoneNumber: "9999999999",
  },
];

const columnHelper = createColumnHelper();
const columns = [
  columnHelper.accessor("id", {
    header: () => "#",
    id: "id",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("firstName", {
    id: "firstName",
    header: () => "First Name",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.lastName, {
    id: "lastName",
    header: () => "Last Name",
    cell: (info) => <i>{info.getValue()}</i>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("address", {
    id: "address",
    header: () => "Address",
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("state", {
    id: "state",
    header: () => "State",
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("phoneNumber", {
    id: "phoneNumber",
    header: "Phone Number",
    footer: (info) => info.column.id,
  }),
];

const CustomTable = () => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const [data, setData] = React.useState(() => [...defaultData]);
  const [columnPinning, setColumnPinning] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    state: {
      columnPinning,
    },
    getCoreRowModel: getCoreRowModel(),
    onColumnPinningChange: setColumnPinning,
  });

  return (
    <Box sx={{ width: "100%", textAlign: "end" }}>
      <Button
        sx={{ margin: "10px" }}
        onClick={colorMode.toggleColorMode}
        variant="contained"
      >
        {theme.palette.mode === "dark" ? "light" : "dark"}
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableCell key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      {!header.isPlaceholder && header.column.getCanPin() && (
                        <div style={{ display: "inline" }}>
                          {!header.column.getIsPinned() ? (
                            <IconButton
                              onClick={() => {
                                header.column.pin("left");
                              }}
                            >
                              <PushPinIcon sx={{ width: "20px" }} />
                            </IconButton>
                          ) : (
                            <IconButton
                              onClick={() => {
                                header.column.pin(false);
                              }}
                            >
                              <CancelIcon sx={{ width: "20px" }} />
                            </IconButton>
                          )}
                        </div>
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
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CustomTable;
