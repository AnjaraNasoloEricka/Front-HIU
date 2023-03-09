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

export default function FormDialogAddTodo({ initializeTodo }) {
  const [open, setOpen] = useState(false);
  const task = useRef();
  const navigate = useNavigate();
  const [isLoadingAddTodo, setIsLoadingAddTodo] = useState(false);

  function finishTodo() {
    setOpen(false);
    if (initializeTodo) {
      initializeTodo();
    } else {
      navigate(0);
    }
  }
  function AddToDo() {
    setIsLoadingAddTodo(true);
    fetch("https://mini-hiu-2023-api.vercel.app/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": TOKEN,
      },
      body: JSON.stringify({
        tache: task.current.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => finishTodo())
      .catch((error) => console.error(error))
      .finally(() => {
        setIsLoadingAddTodo(false);
      });
  }

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <Box>
      <Button
        variant="contained"
        color="primary"
        aria-label="Edit"
        onClick={handleClickOpen}
      >
        Ajouter
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
            inputRef={task}
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          {isLoadingAddTodo ? (
            <MatxLoading />
          ) : (
            <>
              <Button variant="outlined" onClick={AddToDo} color="secondary">
                Sauvegarder
              </Button>
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
