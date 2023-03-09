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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FormDialogUpdateTodo=({todo , updateTodo}) =>{
  const [open, setOpen] = React.useState(false);
  const [task, setTask] = useState(todo)

  useEffect(()=>{
    setTask(todo)
  },[todo])

  const handleUpdateTodo = () => {
    setOpen(false)
    // console.log(task)
    if(updateTodo){
      updateTodo(task)
    }
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
            value={task.tache}
            // defaultValue={todo?.tache}
            onChange={(e)=>setTask({
              ...task,
              tache: e.target.value
            })}
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
            <Button variant="outlined" onClick={()=> handleUpdateTodo()} color="secondary">
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