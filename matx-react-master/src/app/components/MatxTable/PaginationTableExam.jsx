import {
  Alert,
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
import Moment from "react-moment";
import { useEffect, useState } from "react";
import FormDialogExam from "../MatxDialog/FormDialogExam/FormDialogExam";
import "moment/locale/fr";
import moment from "moment";
import { deleteExam } from "app/apis/examApi";
import { MatxLoading } from "..";
import { useNavigate } from "react-router-dom";

const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
  },
}));

const PaginationTableExam = ({ examlist, initializeExamsList }) => {
  const navigate = useNavigate();
  const dateNowFormated = moment(new Date())
    .utc(0)
    .format("YYYY-MM-DD HH:mm:ss");

  const defaultexam = {
    date_debut: dateNowFormated,
    date_fin: dateNowFormated,
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [examListState, setExamListState] = useState([]);

  const [isLoadingDeleteExam, setIsLoadingDeleteExam] = useState("");

  const defaultSuccessObject = {
    message: "",
    examId: null,
  };

  const [successDeleteExam, setSuccessDeleteExam] =
    useState(defaultSuccessObject);

  useState(() => {
    setExamListState([...examlist]);
  }, [examlist]);

  const handleDeleteExam = (examId) => {
    setIsLoadingDeleteExam(examId);
    deleteExam(examId)
      .then((e) => {
        setSuccessDeleteExam({
          message: `L'examen ${examId} a bien été supprimé`,
          examId: examId,
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadingDeleteExam("");
      });
  };
  useEffect(() => {
    if (successDeleteExam.message) {
      setTimeout(() => {
        initializeExamsList();
      }, 1500);
    }
  }, [successDeleteExam, initializeExamsList]);
  return (
    <Box width="100%" overflow="auto">
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell align="center">Matiere</TableCell>
            <TableCell align="center">Theme</TableCell>
            <TableCell align="center">Date Debut</TableCell>
            <TableCell align="center">Date Fin</TableCell>
            <TableCell align="center">Modifier</TableCell>
            <TableCell align="center">Leçons suggérées</TableCell>
            <TableCell align="center">Completer un quizz</TableCell>
            <TableCell align="center">Supprimer</TableCell>
            <TableCell
              align="center"
              style={{
                borderColor: "green",
                borderWidth: 2,
              }}
            >
              Créer un examen
              <FormDialogExam
                initializeExamsList={initializeExamsList}
                exam={defaultexam}
                color="success"
                icon="add_icon"
                label="Ajouter"
              />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {examListState
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((exam, index) => {
              const dateDebutFormated = moment(exam.date_debut)
                .utc(0)
                .format("YYYY-MM-DD HH:mm:ss");
              const dateFinFormated = moment(exam.date_fin)
                .utc(0)
                .format("YYYY-MM-DD HH:mm:ss");
              exam.date_debut = dateDebutFormated;
              exam.date_fin = dateFinFormated;
              return (
                <TableRow key={index}>
                  <TableCell align="center">{exam.matiere}</TableCell>
                  <TableCell align="center">{exam.theme}</TableCell>
                  <TableCell align="center">
                    <Moment locale="fr" utc="0" format="DD MMMM YYYY - HH\h:mm">
                      {exam.date_debut}
                    </Moment>
                  </TableCell>
                  <TableCell align="center">
                    <Moment locale="fr" utc="0" format="HH\h:mm - DD MMMM YYYY">
                      {exam.date_fin}
                    </Moment>
                  </TableCell>
                  <TableCell align="center">
                    <FormDialogExam
                      initializeExamsList={initializeExamsList}
                      exam={exam}
                      color="secondary"
                      icon="edit_icon"
                      label="Modifier"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={() => {
                        window.open(`/exams/${exam._id}/lessons/`, "_blank");
                      }}
                    >
                      <Icon color="info">preview</Icon>
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={() => {
                        window.open(`/exams/${exam._id}/quizz/`, "_blank");
                      }}
                    >
                      <Icon color="secondary">insights</Icon>
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">
                    {isLoadingDeleteExam === exam._id ? (
                      <MatxLoading />
                    ) : (
                      successDeleteExam.examId !== exam._id && (
                        <IconButton
                          onClick={() => {
                            handleDeleteExam(exam._id);
                          }}
                        >
                          <Icon color="error">deleteforever</Icon>
                        </IconButton>
                      )
                    )}
                    {successDeleteExam.message &&
                      successDeleteExam.examId === exam._id && (
                        <Alert severity="success">Supprimé avec succès</Alert>
                      )}
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </StyledTable>
    </Box>
  );
};

export default PaginationTableExam;
