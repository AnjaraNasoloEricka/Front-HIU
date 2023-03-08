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

const PaginationTableExam = ({ examlist }) => {
  const defaultexam = {
    date_debut: "2023-01-01 00:00",
    date_fin: "2023-01-01 00:00",
  };
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const formatDateTime = (dateTimeString) => {
    try {
      const monthsList = [
        "Janvier",
        "Fevrier",
        "Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juillet",
        "Aout",
        "Septembre",
        "Octobre",
        "Novembre",
        "Decembre",
      ];
      const dateObj = new Date(dateTimeString);
      const jour = dateObj.getDate();
      const mois = dateObj.getMonth();
      const monthString = monthsList[mois];
      const annee = dateObj.getFullYear();
      const heure = dateObj.getHours();
      let minutes = `${dateObj.getMinutes()}`;
      if (minutes.length === 1) {
        minutes = `0${minutes}`;
      }
      const secondes = "00";

      return `${jour} ${monthString} ${annee} ${heure}:${minutes}:${secondes}`;
    } catch {
      return dateTimeString;
    }
  };
  return (
    <Box width="100%" overflow="auto">
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell align="center">Matiere</TableCell>
            <TableCell align="center">Date Debut</TableCell>
            <TableCell align="center">Date Fin</TableCell>
            <TableCell align="center">Theme</TableCell>
            <TableCell align="center">Modifier</TableCell>
            <TableCell align="center">Leçons suggérées</TableCell>
            <TableCell align="center">Completer un quizz</TableCell>
            <TableCell align="center">Supprimer</TableCell>
            <TableCell align="center">
              Créer un examen
              <FormDialogExam
                exam={defaultexam}
                color="success"
                icon="add_icon"
                label="Ajouter"
              />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {examlist
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((exam, index) => (
              <TableRow key={index}>
                <TableCell align="center">{exam.matiere}</TableCell>
                <TableCell align="center">
                  {formatDateTime(exam.date_debut)}
                </TableCell>
                <TableCell align="center">
                  {formatDateTime(exam.date_fin)}
                </TableCell>
                <TableCell align="center">{exam.theme}</TableCell>
                <TableCell align="center">
                  <FormDialogExam
                    exam={exam}
                    color="secondary"
                    icon="edit_icon"
                    label="Modifier"
                  />
                </TableCell>
                <TableCell align="center">
                  <IconButton>
                    <Icon color="info">preview</Icon>
                  </IconButton>
                </TableCell>
                <TableCell align="center">
                  <IconButton>
                    <Icon color="secondary">insights</Icon>
                  </IconButton>
                </TableCell>
                <TableCell align="center">
                  <IconButton>
                    <Icon color="error">deleteforever</Icon>
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
