import { IUser } from "@/models/user";
import theme from "@/theme";
import { Clear, DriveFileRenameOutline } from "@mui/icons-material";
import {
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
  tableCellClasses,
} from "@mui/material";
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

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface IProps {
  tableHeaders: { label: string; align: string; width?: string }[];
  tableItems: { [key: string]: string }[];
  deleteHandler?: (username: string) => void;
  updateHandler?: (username: string) => void;
  loginUser?: IUser;
}
const GlobalTable: React.FC<IProps> = ({
  tableHeaders,
  tableItems,
  deleteHandler,
  updateHandler,
  loginUser,
}) => {
  return (
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
          {tableItems?.map((item, index) => (
            <StyledTableRow
              key={index}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              {Object.keys(item).map((key, index) => {
                return (
                  key !== "_id" && (
                    <StyledTableCell key={index}>
                      {item[key as keyof typeof item]}
                    </StyledTableCell>
                  )
                );
              })}

              {(updateHandler || deleteHandler) && (
                <StyledTableCell align="center">
                  <Stack direction="row" spacing={1} justifyContent="center">
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
  );
};

export default GlobalTable;
