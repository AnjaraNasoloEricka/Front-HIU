import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import React from "react";
import { SimpleCard } from "app/components";

const RadioRoot = styled("div")(({ theme }) => ({
  display: "flex",
  "& .formControl": {
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(3),
  },
  "& .group": { margin: theme.spacing(1, 0) },
}));

export default function ResultQuiz({ question }) {
  return (
    <SimpleCard title={question?.question}>
      <Typography>
        {"               "}
        {question?.choix[question?.idReponse]}
      </Typography>
    </SimpleCard>
  );
}
