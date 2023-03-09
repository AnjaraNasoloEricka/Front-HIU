import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { styled } from '@mui/system';
import React from 'react';
import { SimpleCard } from 'app/components';

const RadioRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  '& .formControl': {
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(3),
  },
  '& .group': { margin: theme.spacing(1, 0) },
}));

export default function QuizCard({ question, handleChange, index }) {
  return (
    <SimpleCard title={question?.question}>
      <RadioRoot>
        <FormControl component="fieldset" className="formControl">
          <FormLabel component="legend"></FormLabel>
          <RadioGroup onChange={(e) => handleChange(e, index)}>
            {question?.choix.map((choix, index) => (
              <FormControlLabel key={index} value={index} control={<Radio />} label={choix} />
            ))}
          </RadioGroup>
        </FormControl>
      </RadioRoot>
    </SimpleCard>
  );
}
