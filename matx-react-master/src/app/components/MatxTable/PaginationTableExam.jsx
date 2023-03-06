import {
    Box,
    Icon,
    IconButton,
    styled,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
  } from "@mui/material";
  import { useState } from "react";
import FormDialogExam from "../MatxDialog/FormDialogExam";
  
  const StyledTable = styled(Table)(() => ({
    whiteSpace: "pre",
    "& thead": {
      "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
    },
    "& tbody": {
      "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
    },
  }));
  
  
  const PaginationTableExam = ({examlist}) => {
    const defaultexam = {date_debut:"2023-01-01 00:00",date_fin:"2023-01-01 00:00"};
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
  
    const handleChangePage = (_, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  
    return (
      <Box width="100%" overflow="auto">
        <StyledTable>
          <TableHead>
            <TableRow>
              <TableCell align="left">Matiere</TableCell>
              <TableCell align="center">Date Debut</TableCell>
              <TableCell align="center">Date Fin</TableCell>
              <TableCell align="center">Type</TableCell>
              <TableCell align="center">Theme</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"><FormDialogExam exam={defaultexam} color="success" icon="add_icon" label="Ajouter"/></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {examlist
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((exam, index) => (
                <TableRow key={index}>
                  <TableCell align="left">{exam.matiere}</TableCell>
                  <TableCell align="center">{exam.date_debut}</TableCell>
                  <TableCell align="center">{exam.date_fin}</TableCell>
                  <TableCell align="center">{exam.type}</TableCell>
                  <TableCell align="center">{exam.theme}</TableCell>
                  <TableCell align="right">
                   
                    <FormDialogExam exam={exam} color="secondary" icon="edit_icon" label="Modifier"/>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton>
                      <Icon color="error">close</Icon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </StyledTable>
  
        <TablePagination
          sx={{ px: 2 }}
          page={page}
          component="div"
          rowsPerPage={rowsPerPage}
          count={examlist.length}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 15]}
          onRowsPerPageChange={handleChangeRowsPerPage}
          nextIconButtonProps={{ "aria-label": "Suivante" }}
          backIconButtonProps={{ "aria-label": "Précédente" }}
        />
      </Box>
    );
  };
  
  export default PaginationTableExam;