import { Alert, Box, Icon } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { addExam, updateExam } from "app/apis/examApi";
import { MatxLoading } from "app/components";
import React, { useEffect, useState } from "react";

export default function FormDialogExam({
  exam,
  color,
  icon,
  label,
  initializeExamsList,
}) {
  const [open, setOpen] = React.useState(false);
  const [examState, setExamState] = useState(exam);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setExamState({
      _id: exam._id || "",
      date_debut: exam.date_debut,
      date_fin: exam.date_fin,
      matiere: exam.matiere || "",
      theme: exam.theme || "",
    });
  }, [exam]);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const handleChangeFieldExam = (fieldKeyString, newFieldValue) => {
    const newExamState = {
      ...examState,
      [fieldKeyString]: newFieldValue,
    };
    setExamState({
      ...newExamState,
    });
  };

  const handleAddExam = () => {
    setIsLoading(true);
    addExam(examState)
      .then((e) => {
        setSuccess("Un examen a été ajouté avec succès");
      })
      .catch((err) => {
        setError("Une erreur est survenue lors de l'ajout de l'examen");
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleUpdateExam = () => {
    setIsLoading(true);
    console.log(examState);

    updateExam(examState._id, examState)
      .then((e) => {
        setSuccess("L'examen a été modifié avec succès.");
      })
      .catch((err) => {
        setError("Une erreur est survenue lors de la modification de l'examen");
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (success) {
      setError("");
    }
    if (error) {
      setSuccess("");
    }
  }, [success, error]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        initializeExamsList();
      }, 1000);
    }
  }, [success, initializeExamsList]);

  const BtnAddOrEdit = ({ label }) => {
    if (label === "Modifier") {
      return (
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => {
            handleUpdateExam();
          }}
        >
          Sauvegarder
        </Button>
      );
    } else {
      return (
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => {
            handleAddExam();
          }}
        >
          Ajouter
        </Button>
      );
    }
  };

  return (
    <Box>
      <Button color={color} aria-label="Edit" onClick={handleClickOpen}>
        <Icon>{icon}</Icon>
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">{label} un examen</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Accèder à ce formulaire afin de modifier ou ajouter les informations
            sur l'examen.
          </DialogContentText>
          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}
          <TextField
            autoFocus
            margin="dense"
            id="date_debut"
            label="Date debut"
            value={examState?.date_debut}
            onChange={(e) =>
              handleChangeFieldExam("date_debut", e.target.value)
            }
            type="datetime-local"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="date_fin"
            label="Date fin"
            type="datetime-local"
            value={examState?.date_fin}
            onChange={(e) => handleChangeFieldExam("date_fin", e.target.value)}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="matiere"
            label="Matiere"
            type="text"
            value={examState?.matiere}
            onChange={(e) => handleChangeFieldExam("matiere", e.target.value)}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="theme"
            label="Theme"
            type="text"
            value={examState?.theme}
            onChange={(e) => handleChangeFieldExam("theme", e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          {isLoading ? <MatxLoading /> : <BtnAddOrEdit label={label} />}
          <Button onClick={handleClose} color="primary">
            Quitter
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
