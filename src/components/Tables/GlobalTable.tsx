import { IUser } from "@/models/user";
import theme from "@/theme";
import { Clear, DriveFileRenameOutline } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#f5f5f5",
    color: theme.colorConstants.mediumGray,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)<{ isDeactive?: boolean }>(
  ({ theme, isDeactive }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: isDeactive
        ? "rgb(1255, 0, 0, 0.4)"
        : theme.palette.action.hover,
    },
    backgroundColor: isDeactive ? "rgb(1255, 0, 0, 0.4)" : "white",

    "&:last-child td, &:last-child th": {
      border: 0,
    },
  })
);

interface IProps {
  tableHeaders: { label: string; align: string; width?: string }[];
  tableItems: { [key: string]: string }[];
  deleteHandler?: (username: string) => void;
  updateHandler?: (username: string) => void;
  loginUser?: IUser;
  isNavigate?: boolean;
}
const GlobalTable: React.FC<IProps> = ({
  tableHeaders,
  tableItems,
  deleteHandler,
  updateHandler,
  loginUser,
  isNavigate,
}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const router = useRouter();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  const navigateHandler = (id: string) => {
    if (isNavigate) {
      router.push(`clients/${id}`);
    }
  };

  return tableItems?.length > 0 ? (
    <>
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.1)",
          border: "1px solid #e0e0e0",
        }}
      >
        <Table size="small" aria-label="Top 10 items table">
          <TableHead>
            <StyledTableRow>
              {tableHeaders?.map((item, i) => {
                return (
                  <TableCell
                    sx={{
                      bgcolor: theme.colorConstants.black,
                      color: theme.colorConstants.whitishGray,
                      fontSize: { xs: "12px", md: "14px" },
                      fontWeight: 600,
                      minWidth: item?.width,
                    }}
                    align={
                      item?.align === "center"
                        ? "center"
                        : item?.align === "left"
                        ? "left"
                        : "right"
                    }
                    key={i}
                  >
                    {item?.label}
                  </TableCell>
                );
              })}
            </StyledTableRow>
          </TableHead>

          <TableBody>
            {(tableItems || [])
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((item, index) => (
                <StyledTableRow
                  isDeactive={item?.status === "Deactive"}
                  key={index}
                >
                  {Object.keys(item).map((key, index) => {
                    return (
                      key !== "_id" && (
                        <StyledTableCell
                          onClick={() => navigateHandler(item?._id)}
                          key={index}
                          sx={{
                            cursor: "pointer",
                          }}
                        >
                          {item[key as keyof typeof item]}
                        </StyledTableCell>
                      )
                    );
                  })}

                  {(updateHandler || deleteHandler) && (
                    <StyledTableCell align="center">
                      <Stack
                        direction="row"
                        spacing={1}
                        justifyContent="center"
                      >
                        {updateHandler && (
                          <IconButton
                            disabled={
                              loginUser?.role !== "super_admin" &&
                              loginUser?.role !== "admin" &&
                              loginUser?._id !== item?._id
                            }
                            onClick={() => updateHandler(item?._id as string)}
                            color="primary"
                          >
                            <DriveFileRenameOutline />
                          </IconButton>
                        )}
                        {deleteHandler && (
                          <IconButton
                            disabled={
                              loginUser?.role !== "super_admin" &&
                              loginUser?.role !== "admin"
                            }
                            onClick={() => deleteHandler(item?._id as string)}
                            color="error"
                          >
                            <Clear />
                          </IconButton>
                        )}
                      </Stack>
                    </StyledTableCell>
                  )}
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {tableItems?.length > 5 && (
        <TablePagination
          sx={{
            "& .MuiTablePagination-selectLabel, & .MuiTablePagination-input, & .MuiTablePagination-selectIcon":
              {
                fontSize: "14px",
                color: theme.colorConstants.darkGray,
                textTransform: "capitalize",
              },
            "& .css-1gtbbyw-MuiTablePagination-displayedRows": {
              fontSize: "14px",
              color: theme.colorConstants.darkGray,
              textTransform: "capitalize",
            },
            "& .css-qbnitn": {
              fontSize: "14px",
              color: theme.colorConstants.darkGray,
              textTransform: "capitalize",
            },
          }}
          size="small"
          rowsPerPageOptions={[5, 10, 20, 50, 100]}
          component="div"
          count={(tableItems || []).length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </>
  ) : (
    <Box
      sx={{
        height: "200px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontSize: { xs: "18px", md: "24px" },
        }}
      >
        No data found!
      </Typography>
    </Box>
  );
};

export default GlobalTable;
