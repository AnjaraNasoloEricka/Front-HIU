import {
    Box,
    Icon,
  } from "@mui/material";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import React from 'react';

function addProgram(program){
    console.log(program);
}

function editProgram(program){
    console.log(program);
}

const BtnAddOrEdit = ({label}) => {
    if(label=="Modifier"){
        return (
          <Button variant="outlined" color="secondary">
            Sauvegarder
          </Button>
        )
    }
    else{
      return (
        <Button variant="outlined" color="secondary">
            Ajouter
          </Button>
      )
    }
}

export default function FormDialogProgram({program,color,icon,label}) {
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <Box>
      <Button color={color} aria-label="Edit" onClick={handleClickOpen}>
            <Icon>{icon}</Icon>
      </Button>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{label}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Accèder à ce formulaire afin de modifier ou ajouter les informations de la séance.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="heure_debut"
            label="Heure debut"
            value={program?.heure_debut}
            type="time"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="heure_fin"
            label="Heure fin"
            type="time"
            value={program?.heure_fin}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="matiere"
            label="Matiere"
            type="text"
            value={program?.matiere}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="theme"
            label="Theme"
            type="text"
            value={program?.theme}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <BtnAddOrEdit label={label}/>
          <Button onClick={handleClose} color="primary">
            Quitter
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
