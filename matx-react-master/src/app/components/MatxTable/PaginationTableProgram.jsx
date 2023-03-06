import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Icon,
  IconButton,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import FormDialogProgram from "../MatxDialog/FormDialogProgram";


import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import HotelIcon from '@mui/icons-material/Hotel';
import RepeatIcon from '@mui/icons-material/Repeat';
import Typography from '@mui/material/Typography';


const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
  },
}));


const PaginationTableProgram = ({programlist}) => {
  const defaultprogram = {heure_debut:"00:00",heure_fin:"00:00"};
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box width="100%" overflow="auto">
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{ minWidth: 275 }}>Lundi</TableCell>
            <TableCell align="center" sx={{ minWidth: 275 }}>Mardi</TableCell>
            <TableCell align="center"sx={{ minWidth: 275 }}>Mercredi</TableCell>
            <TableCell align="center"sx={{ minWidth: 275 }}>Jeudi</TableCell>
            <TableCell align="center"sx={{ minWidth: 275 }}>Vendredi</TableCell>
            <TableCell align="center"sx={{ minWidth: 275 }}>Samedi</TableCell>
            <TableCell align="center"sx={{ minWidth: 275 }}>Dimanche</TableCell>
            <TableCell align="center"><FormDialogProgram program={defaultprogram} color="success" icon="add_icon" label="Ajouter"/></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        <TableRow>
          {programlist
            .map((program, index) => (       
                <TableCell align="center" sx={{ minWidth: 275 }}>
                  {program.map((jour) => (
                    <>
                     <Card sx={{backgroundColor:"black" }}>    
                     <FormDialogProgram program={jour} color="secondary" icon="edit_icon" label="Modifier"/>
                    </Card> 
                    <Card sx={{minHeight: 25 ,backgroundColor:"darkblue",color:"white"}}>    
                      <small>
                        <strong>{jour.heure_debut}</strong>
                        </small>
                    </Card>                
                    <Card sx={{maxHeight: 80 }}>    
                      <h4>{jour.matiere}</h4> 
                      <small>
                        <strong>{jour.theme}</strong>
                        </small>
                    </Card>
                    <Card  sx={{minHeight: 25 ,backgroundColor:"darkblue",color:"white"}}>    
                      <small>
                        <strong>{jour.heure_fin}</strong>
                        </small>
                    </Card>
                    <Card  sx={{backgroundColor:"black" }}>    
                    <IconButton>
                    <Icon color="error">close</Icon>
                  </IconButton>
                    </Card> 
                    <br/> 
                    </>
                  ))}
                </TableCell>
    
            ))}
            <TableCell align="right"></TableCell>
            </TableRow>
        </TableBody>
      </StyledTable>

      <TablePagination
        sx={{ px: 2 }}
        page={page}
        component="div"
        rowsPerPage={rowsPerPage}
        count={programlist.length}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 15]}
        onRowsPerPageChange={handleChangeRowsPerPage}
        nextIconButtonProps={{ "aria-label": "Suivante" }}
        backIconButtonProps={{ "aria-label": "Précédente" }}
      />
    </Box>
  );
};

export default PaginationTableProgram;
