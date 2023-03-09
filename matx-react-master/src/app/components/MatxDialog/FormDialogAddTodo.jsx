import { Box, Icon } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { TOKEN } from "app/config";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MatxLoading } from "..";

export default function FormDialogAddTodo({ addNewTodo }) {
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState("");

  function AddToDo() {
    setOpen(false);
    if (addNewTodo) {
      console.log(task);
      addNewTodo(task);
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
      <Button color="success" aria-label="Edit" onClick={handleClickOpen}>
        <Icon>add_icon</Icon>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Ajout To do</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="tache"
            label="Tâche"
            value={task}
            onChange={(e) => {
              setTask(e.target.value);
            }}
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <>
            <Button variant="outlined" onClick={AddToDo} color="secondary">
              Sauvegarder
            </Button>
            <Button onClick={handleClose} color="primary">
              Quitter
            </Button>
          </>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
