import { Box, Icon, MenuItem, Select } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";

export default function FormDialogUpdateProgram({ program, color, icon, label,initializeProgramList }) {
  const [open, setOpen] = React.useState(false);
  const [programState, setProgramState] = useState({
    heure_debut: program?.heure_debut,
    heure_fin: program?.heure_fin,
    matiere: program?.matiere || "",
    theme: program?.theme || "",
    numJour: program?.numJour || 0,

  });

  useEffect(() => {
    setProgramState({
      heure_debut: program?.heure_debut,
      heure_fin: program?.heure_fin,
      matiere: program?.matiere || "",
      theme: program?.theme || "",
      numJour: program?.numJour || 0,
    });
  }, [program]);
  const handleAddProgram = () => {
    const programToAdd = {
      heure_debut: programState?.heure_debut,
      heure_fin: programState?.heure_fin,
      matiere: programState?.matiere,
      theme: programState?.theme,
    };
    console.log(programToAdd);
  };

  const BtnAddOrEdit = ({ label }) => {
    if (label === "Modifier") {
      return (
        <Button variant="outlined" color="secondary">
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
        <DialogTitle id="form-dialog-title">{label}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Accèder à ce formulaire afin de modifier les informations
            de la séance.
          </DialogContentText>
          <br />
          <br />
          <DialogContentText>
            Jour
          </DialogContentText>
          <Select
            defaultValue={programState?.numJour}
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
          <BtnAddOrEdit label={label} />
          <Button onClick={handleClose} color="primary">
            Quitter
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
