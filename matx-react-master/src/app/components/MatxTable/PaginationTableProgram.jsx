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
import FormDialogProgram from "../MatxDialog/FormDialogProgram";

const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
  },
}));


const PaginationTableProgram = ({programlist}) => {
  const defaultprogram = {heure_debut:"00:00",heure_fin:"00:00"};
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
            <TableCell align="left">Nom Jour</TableCell>
            <TableCell align="center">Heure Debut</TableCell>
            <TableCell align="center">Heure Fin</TableCell>
            <TableCell align="center">Matiere</TableCell>
            <TableCell align="center">Theme</TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"><FormDialogProgram program={defaultprogram} color="success" icon="add_icon" label="Ajouter"/></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {programlist
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((program, index) => (
              <TableRow key={index}>
                <TableCell align="left">{program.nom_jour}</TableCell>
                <TableCell align="center">{program.heure_debut}</TableCell>
                <TableCell align="center">{program.heure_fin}</TableCell>
                <TableCell align="center">{program.matiere}</TableCell>
                <TableCell align="center">{program.theme}</TableCell>
                <TableCell align="right">
                  <FormDialogProgram program={program} color="secondary" icon="edit_icon" label="Modifier"/>
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
        count={programlist.length}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 15]}
        onRowsPerPageChange={handleChangeRowsPerPage}
        nextIconButtonProps={{ "aria-label": "Suivante" }}
        backIconButtonProps={{ "aria-label": "Précédente" }}
      />
    </Box>
  );
};

export default PaginationTableProgram;
