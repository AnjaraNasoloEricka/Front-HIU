import { Box, Icon, MenuItem, Select } from "@mui/material";
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
import  AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


export default function FormDialogCloud({ alldossier }) {
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState("");

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <Box>
      <Button color="success" variant="contained" aria-label="Edit" onClick={handleClickOpen} style={{borderWidth: 2, borderColor: 'green'}}>
        <AddCircleOutlineIcon/>
         Fichier
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Nouveau Fichier</DialogTitle>
        <Select
            autoFocus
            margin="dense"
            label="Fichier"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
        fullWidth>
        {alldossier.map((dossier)=>(
            <MenuItem value={0}>{dossier.dossier}</MenuItem>
        ))}
        </Select>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="fichier"
            label="Fichier"
            type="file"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <>
            <Button variant="outlined"  color="secondary">
              Enregistrer
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


