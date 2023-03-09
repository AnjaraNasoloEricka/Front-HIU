import {
  Box,
  Card,
  CircularProgress,
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
import { deleteProgram } from "app/apis/programApi";
import { useEffect, useState } from "react";
import { MatxLoading } from "..";
import FormDialogAddAndModifyProgram from "../MatxDialog/FormDialogProgram/FormDialogAddAndModifyProgram";

const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
  },
}));

const PaginationTableProgram = ({ programlist, initializeProgramList }) => {
  const defaultprogram = { heure_debut: "08:00", heure_fin: "09:00" };
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [programListState, setProgramListState] = useState({ ...programlist });
  // const [openDeleteProgram, setOpenDeleteProgram] = useState(false)
  const [isLoadingDeleteProgram, setIsLoadingDeleteProgram] = useState(false);

  useEffect(() => {
    setProgramListState({ ...programlist });
  }, [programlist]);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDeleteProgram = (programId) => {
    setIsLoadingDeleteProgram(programId);
    deleteProgram(programId)
      .then((e) => {})
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        initializeProgramList();
        setIsLoadingDeleteProgram("");
      });
  };

  return (
    <Box width="100%" overflow="auto">
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{ minWidth: 275 }}>
              Lundi
            </TableCell>
            <TableCell align="center" sx={{ minWidth: 275 }}>
              Mardi
            </TableCell>
            <TableCell align="center" sx={{ minWidth: 275 }}>
              Mercredi
            </TableCell>
            <TableCell align="center" sx={{ minWidth: 275 }}>
              Jeudi
            </TableCell>
            <TableCell align="center" sx={{ minWidth: 275 }}>
              Vendredi
            </TableCell>
            <TableCell align="center" sx={{ minWidth: 275 }}>
              Samedi
            </TableCell>
            <TableCell align="center" sx={{ minWidth: 275 }}>
              Dimanche
            </TableCell>
            <TableCell align="center">
              <FormDialogAddAndModifyProgram
                initializeProgramList={initializeProgramList}
                program={defaultprogram}
                color="success"
                icon="add_icon"
                label="Ajouter"
              />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            {programListState &&
              Object.keys(programListState).map((programKey, key0) => {
                const dayProgram = programListState[programKey];
                return (
                  <TableCell align="center" sx={{ minWidth: 275 }} key={key0}>
                    {dayProgram.map((program) => (
                      <>
                        <Card>
                          <FormDialogAddAndModifyProgram
                            initializeProgramList={initializeProgramList}
                            program={program}
                            color="secondary"
                            icon="edit_icon"
                            label="Modifier"
                          />
                        </Card>
                        <Card
                          sx={{
                            minHeight: 25,
                            backgroundColor: "darkblue",
                            color: "white",
                            borderRadius: 0,
                          }}
                        >
                          <small>
                            <strong>{program.heure_debut}</strong>
                          </small>
                        </Card>
                        <Card sx={{ maxHeight: 80 }}>
                          <h4>{program.matiere}</h4>
                          <small>
                            <strong>{program.theme}</strong>
                          </small>
                        </Card>
                        <Card
                          sx={{
                            minHeight: 25,
                            backgroundColor: "darkblue",
                            color: "white",
                            borderRadius: 0,
                          }}
                        >
                          <small>
                            <strong>{program.heure_fin}</strong>
                          </small>
                        </Card>
                        <Card>
                          {isLoadingDeleteProgram === program._id ? (
                            <CircularProgress className="cirle-progress" />
                          ) : (
                            <IconButton
                              onClick={() => {
                                handleDeleteProgram(program?._id);
                              }}
                            >
                              <Icon color="error">close</Icon>
                            </IconButton>
                          )}
                        </Card>
                        <br />
                      </>
                    ))}
                  </TableCell>
                );
              })}
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableBody>
      </StyledTable>
{/* 
      <TablePagination
        sx={{ px: 2 }}
        page={page}
        component="div"
        rowsPerPage={rowsPerPage}
        count={programListState.length}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 15]}
        onRowsPerPageChange={handleChangeRowsPerPage}
        nextIconButtonProps={{ "aria-label": "Suivante" }}
        backIconButtonProps={{ "aria-label": "Précédente" }}
      /> */}
    </Box>
  );
};

export default PaginationTableProgram;
