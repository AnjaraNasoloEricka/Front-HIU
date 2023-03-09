import React from 'react'
import PropTypes from 'prop-types'

import './HallOfFame.css'
import { Alert, Dialog, DialogContent, DialogContentText, DialogTitle, Snackbar } from '@mui/material'


const HallOfFame = ({ entries }) => (
    <Snackbar open={true} autoHideDuration={6000} >
    <Alert severity="success" sx={{ width: "100%" }} variant="filled">
      Bravo vous avez gagné!
    </Alert>
  </Snackbar>
)

HallOfFame.propTypes = {
    entries: PropTypes.arrayOf(
        PropTypes.shape({
            date: PropTypes.string.isRequired,
            guesses: PropTypes.number.isRequired,
            id: PropTypes.number.isRequired,
            player: PropTypes.string.isRequired,
        }).isRequired,
    )
}

export default HallOfFame

// == Internal helpers ==============================================

export const FAKE_HOF = [
    { id: 3, guesses: 18, date: '10/10/2017', player: 'Jane' },
    { id: 2, guesses: 23, date: '11/10/2017', player: 'Kevin' },
    { id: 1, guesses: 31, date: '06/10/2017', player: 'Louisa' },
    { id: 0, guesses: 48, date: '14/10/2017', player: 'Marc' },
]