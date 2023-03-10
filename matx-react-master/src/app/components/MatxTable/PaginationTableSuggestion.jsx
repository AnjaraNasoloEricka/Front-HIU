import {
  Box,
  Card,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { deleteProgram } from "app/apis/programApi";
import { useEffect, useState } from "react";
import { MatxLoading } from "..";
import FormDialogAddAndModifyProgram from "../MatxDialog/FormDialogProgram/FormDialogAddAndModifyProgram";

const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
  },
}));

const PaginationTableSuggestion = ({ tabsuggestion }) => {
  return (
    <Box width="100%" overflow="auto">
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={{ minWidth: 275 }}>
              Lundi
            </TableCell>
            <TableCell align="center" sx={{ minWidth: 275 }}>
              Mardi
            </TableCell>
            <TableCell align="center" sx={{ minWidth: 275 }}>
              Mercredi
            </TableCell>
            <TableCell align="center" sx={{ minWidth: 275 }}>
              Jeudi
            </TableCell>
            <TableCell align="center" sx={{ minWidth: 275 }}>
              Vendredi
            </TableCell>
            <TableCell align="center" sx={{ minWidth: 275 }}>
              Samedi
            </TableCell>
            <TableCell align="center" sx={{ minWidth: 275 }}>
              Dimanche
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            {tabsuggestion?.map((mysugtab) => {
              return (
                <TableCell align="center" sx={{ minWidth: 275 }}>
                  {mysugtab.map((suggestion) => (
                    <>
                      <Card
                        sx={{
                          minHeight: 25,
                          backgroundColor: "darkblue",
                          color: "white",
                          borderRadius: 0,
                        }}
                      >
                        <small>
                          <strong>{suggestion.heure_debut}</strong>
                        </small>
                      </Card>
                      <Card
                        sx={{
                          maxHeight: 80,
                          borderRadius: 0,
                          color: suggestion?.isTodo ? "green" : "black",
                          backgroundColor: suggestion?.isTodo
                            ? "#abffab"
                            : "white",
                        }}
                      >
                        {suggestion?.isTodo ? (
                          <h5>{suggestion.matiere}</h5>
                        ) : (
                          <h4>{suggestion.matiere}</h4>
                        )}
                        <small>
                          <strong>{suggestion.theme}</strong>
                        </small>
                      </Card>
                      <Card
                        sx={{
                          minHeight: 25,
                          backgroundColor: "darkblue",
                          color: "white",
                          borderRadius: 0,
                        }}
                      >
                        <small>
                          <strong>{suggestion.heure_fin}</strong>
                        </small>
                      </Card>
                      <br />
                    </>
                  ))}
                </TableCell>
              );
            })}
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableBody>
      </StyledTable>
    </Box>
  );
};

export default PaginationTableSuggestion;
