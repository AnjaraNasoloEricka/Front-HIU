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


function addExam(exam){
    console.log(exam);
}

function editExam(exam){
    console.log(exam);
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

export default function FormDialogExam({exam,color,icon,label}) {
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
            Accèder à ce formulaire afin de modifier ou ajouter les informations sur l'examen.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="date_debut"
            label="Date debut"
            defaultValue={exam?.date_debut}
            type="datetime-local"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="date_fin"
            label="Date fin"
            type="datetime-local"
            defaultValue={exam?.date_fin}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="type"
            label="type"
            type="text"
            defaultValue={exam?.type}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="matiere"
            label="Matiere"
            type="text"
            defaultValue={exam?.matiere}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="theme"
            label="Theme"
            type="text"
            defaultValue={exam?.theme}
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