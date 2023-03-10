import { Alert, Box, Icon, MenuItem, Select } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { addProgram, updateProgram } from "app/apis/programApi";
import { MatxLoading } from "app/components";
import React, { useEffect, useState } from "react";

export default function FormDialogAddAndModifyProgram({
  program,
  color,
  icon,
  label,
  initializeProgramList,
}) {
  const [open, setOpen] = React.useState(false);
  const [programState, setProgramState] = useState({
    _id: program?._id || "",
    heure_debut: program?.heure_debut,
    heure_fin: program?.heure_fin,
    matiere: program?.matiere || "",
    theme: program?.theme || "",
    numJour: program?.numJour || 0,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setProgramState({
      _id: program?._id || "",
      heure_debut: program?.heure_debut,
      heure_fin: program?.heure_fin,
      matiere: program?.matiere || "",
      theme: program?.theme || "",
      numJour: program?.numJour || 0,
    });
  }, [program]);

  const handleAddProgram = () => {
    setIsLoading(true);
    const programToAdd = {
      heure_debut: programState?.heure_debut,
      heure_fin: programState?.heure_fin,
      matiere: programState?.matiere,
      theme: programState?.theme,
      numJour: programState?.numJour,
    };
    addProgram(programToAdd)
      .then((e) => {
        setSuccess("Emploi du temps ajouté avec succès");
      })
      .catch((err) => {
        if (err.request.response) {
          const response = err.request.response;
          const message = JSON.parse(response).message;
          setError(message);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleModifyProgram = () => {
    if (!programState?._id) return alert('no id')
    setIsLoading(true);
    const programToAdd = {
      heure_debut: programState?.heure_debut,
      heure_fin: programState?.heure_fin,
      matiere: programState?.matiere,
      theme: programState?.theme,
      numJour: programState?.numJour,
    };
    updateProgram(programState?._id,programToAdd)
      .then((e) => {
        setSuccess("Emploie du temps modifié avec succès");
      })
      .catch((err) => {
        if (err.request.response) {
          const response = err.request.response;
          const message = JSON.parse(response).message;
          setError(message);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (success !== "") {
      setTimeout(() => {
        initializeProgramList();
      }, 2000);
    }
  }, [success, initializeProgramList]);

  // UseEffect error and success
  useEffect(() => {
    if (success) {
      setError("");
    }
    if (error) {
      setSuccess("");
    }
  }, [success, error]);

  const handleChangeProgram = (newValue, field) => {
    const newProgram = { ...programState, [field]: newValue };
    setProgramState(newProgram);
  };

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const BtnAddOrEdit = ({ label }) => {
    if (label === "Modifier") {
      return (
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => {
            handleModifyProgram();
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
            handleAddProgram();
          }}
        >
          Ajouter
        </Button>
      );
    }
  };

  const days = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche",
  ];

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
        <DialogTitle id="form-dialog-title">
          {label} un emploi du temps
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Accèder à ce formulaire afin d'ajouter les informations de la
            séance.
          </DialogContentText>
          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}
          <br />
          <br />
          <DialogContentText>Jour</DialogContentText>
          <Select
            defaultValue={programState?.numJour || 0}
            label={"Jour"}
            onChange={(e) => handleChangeProgram(e.target.value, "numJour")}
          >
            {days &&
              days.map((day, key) => {
                return <MenuItem value={key}>{day}</MenuItem>;
              })}
          </Select>
          <TextField
            autoFocus
            margin="dense"
            id="heure_debut"
            label="Heure debut"
            value={programState?.heure_debut}
            onChange={(e) => {
              handleChangeProgram(e.target.value, "heure_debut");
            }}
            type="time"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="heure_fin"
            label="Heure fin"
            type="time"
            value={programState?.heure_fin}
            onChange={(e) => {
              handleChangeProgram(e.target.value, "heure_fin");
            }}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="matiere"
            label="Matiere"
            type="text"
            value={programState?.matiere}
            onChange={(e) => {
              handleChangeProgram(e.target.value, "matiere");
            }}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="theme"
            label="Theme"
            type="text"
            value={programState?.theme}
            onChange={(e) => {
              handleChangeProgram(e.target.value, "theme");
            }}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          {isLoading ? (
            <MatxLoading />
          ) : (
            <>
              <BtnAddOrEdit label={label} />
              <Button onClick={handleClose} color="primary">
                Quitter
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
}
