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
import { TOKEN } from "app/config";
import React, { useRef } from 'react';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FormDialogUpdateTodo=({todo}) =>{
  const [open, setOpen] = React.useState(false);
  const task=useRef(todo?.tache);
  const navigate=useNavigate();

  useEffect(()=>{
        console.log("huhu"+todo?.tache);
  },[])

  function finishTodo(){
      setOpen(false);
      navigate(0);
  }
  
  function updateTodo(){
    fetch('https://mini-hiu-2023-api.vercel.app/todo/'+todo._id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': TOKEN
        },
        body: JSON.stringify({
        tache: task.current.value
       })
      })
      .then(response => response.json())
      .then(data => finishTodo())
      .catch(error => console.error(error))
  }

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <Box>
      <Button variant="outlined" color="secondary" aria-label="Edit" onClick={handleClickOpen}>
            Modifier
      </Button>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Modifier</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="tache"
            label="Tâche"
            inputRef={task}
            defaultValue={todo?.tache}
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
            <Button variant="outlined" onClick={updateTodo} color="secondary">
                Sauvegarder
            </Button>
          <Button onClick={handleClose} color="primary">
            Quitter
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default FormDialogUpdateTodo;