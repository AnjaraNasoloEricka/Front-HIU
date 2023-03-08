import { useTheme } from '@emotion/react';
import { LoadingButton } from '@mui/lab';
import { Card, Autocomplete, Grid, TextField, Alert } from '@mui/material';
import { Box, styled } from '@mui/system';
import { Paragraph } from 'app/components/Typography';
import useAuth from 'app/hooks/useAuth';
import { Formik } from 'formik';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const FlexBox = styled(Box)(() => ({ display: 'flex', alignItems: 'center' }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: 'center' }));

const ContentBox = styled(JustifyBox)(() => ({
  height: '100%',
  padding: '32px',
  background: 'rgba(0, 0, 0, 0.01)',
}));

const AutoComplete = styled(Autocomplete)(() => ({
  width: 300,
  marginBottom: '16px',
}));



const suggestions = [
  { label: 'Universitaire: Master 2', value:  12},
  { label: 'Universitaire: Master 1', value:  11},
  { label: 'Universitaire: L3', value:  10},
  { label: 'Universitaire: L2', value:  9},
  { label: 'Universitaire: L1', value:  8},
  { label: 'Lycéen: Terminale', value:  7},
  { label: 'Lycéen: 1ère', value:  6},
  { label: 'Lycéen: 2nd', value:  5},
  { label: 'Collégien: 3ème', value:  4},
  { label: 'Collégien: 4ème', value:  3},
  { label: 'Collégien: 5ème', value:  2},
  { label: 'Collégien: 6ème', value:  1},
];

const JWTRegister = styled(JustifyBox)(() => ({
  background: '#1A2038',
  minHeight: '100vh !important',
  '& .card': {
    maxWidth: 800,
    minHeight: 400,
    margin: '1rem',
    display: 'flex',
    borderRadius: 12,
    alignItems: 'center',
  },
}));

// inital register credentials
const initialValues = {
  nom: '',
  prenom: '',
  email: '',
  password: '',
  passwordConf: '',
  tel: '',
  profil: ''
};

// form field validation schema
const validationSchema = Yup.object().shape({
  nom: Yup.string().required('Nom requis'),
  prenom: Yup.string().required('Prénom(s) requis'),
  email: Yup.string().email('Invalide Adresse Email').required('Adresse email requis'),
  password: Yup.string().min(6, 'Mot de passe doit avoir plus de 6 caractères!').required('Mot de passe requis'),
  passwordConf: Yup.string().required('Confirmez votre Mot de passe'),
  tel: Yup.string().required('Numéro téléphone requis'),
  profil: Yup.string().required('Ajoutez un photo de profil'),
});

const JwtRegister = () => {
  const theme = useTheme();
  const { register } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [classe, setClasse] = useState("");
  const [feedback, setFeedback] = useState(null);

  const handleAutocompleteChange = (event, value) => {
    setClasse(value.value);
  }

  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      var responseLogin = await register(values.nom, values.prenom, values.email, values.password, values.passwordConf, values.tel, values.profil, classe);
      if( responseLogin.token === undefined ){
        setFeedback( <Alert sx={{ m: 1 }} severity="warning" variant="filled">
                {responseLogin.message}
            </Alert>);
        setLoading(false);
      } 
      else if( responseLogin.token !== undefined ){
         navigate('/');
      }

    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  return (
    <JWTRegister>
      <Card className="card">
        <Grid container>
          <Grid item sm={6} xs={12}>
            <ContentBox>
              <img
                width="100%"
                alt="Register"
                src="/assets/images/illustrations/2.svg"
              />
            </ContentBox>
          </Grid>

          <Grid item sm={6} xs={12}>
            <Box p={4} height="100%">
              <h2>Inscription</h2>
              {feedback}
              <br />
              <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={validationSchema}
              >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <TextField
                      fullWidth
                      size="small"
                      type="text"
                      name="nom"
                      label="Votre nom"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.nom}
                      onChange={handleChange}
                      helperText={touched.nom && errors.nom}
                      error={Boolean(errors.nom && touched.nom)}
                      sx={{ mb: 3 }}
                    />

                    <TextField
                      fullWidth
                      size="small"
                      type="text"
                      name="prenom"
                      label="Vos prénom(s)"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.prenom}
                      onChange={handleChange}
                      helperText={touched.prenom && errors.prenom}
                      error={Boolean(errors.prenom && touched.prenom)}
                      sx={{ mb: 3 }}
                    />

                    <TextField
                      fullWidth
                      size="small"
                      type="email"
                      name="email"
                      label="Votre Adresse Email"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.email}
                      onChange={handleChange}
                      helperText={touched.email && errors.email}
                      error={Boolean(errors.email && touched.email)}
                      sx={{ mb: 3 }}
                    />

                    <TextField
                      fullWidth
                      size="small"
                      type="password"
                      name="password"
                      label="Votre Mot De Passe"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.password}
                      onChange={handleChange}
                      helperText={touched.password && errors.password}
                      error={Boolean(errors.password && touched.password)}
                      sx={{ mb: 3 }}
                    />

                    <TextField
                      fullWidth
                      size="small"
                      type="password"
                      name="passwordConf"
                      label="Confirmez votre Mot De Passe"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.passwordConf}
                      onChange={handleChange}
                      helperText={touched.passwordConf && errors.passwordConf}
                      error={Boolean(errors.passwordConf && touched.passwordConf)}
                      sx={{ mb: 3 }}
                    />

                    <TextField
                      fullWidth
                      size="small"
                      type="text"
                      name="tel"
                      label="Vote numéro téléphone"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.tel}
                      onChange={handleChange}
                      helperText={touched.tel && errors.tel}
                      error={Boolean(errors.tel && touched.tel)}
                      sx={{ mb: 3 }}
                    />

                    <TextField
                      fullWidth
                      size="small"
                      type="text"
                      name="profil"
                      label="Photo de profil"
                      variant="outlined"
                      onBlur={handleBlur}
                      value={values.profil}
                      onChange={handleChange}
                      helperText={touched.profil && errors.profil}
                      error={Boolean(errors.profil && touched.profil)}
                      sx={{ mb: 3 }}
                    />

                    <AutoComplete
                      options={suggestions}
                      getOptionLabel={(option) => option.label}
                      onChange={handleAutocompleteChange}
                      renderInput={(params) => (
                        <TextField {...params} label="Votre classe d'étude" variant="outlined" fullWidth />
                      )}
                    />

                  
                    <LoadingButton
                      type="submit"
                      color="primary"
                      loading={loading}
                      variant="contained"
                      sx={{ mb: 2, mt: 3 }}
                    >
                      S'inscrire
                    </LoadingButton>

                    <Paragraph>
                      Avez-vous déja un compte?
                      <NavLink
                        to="/session/signin"
                        style={{ color: theme.palette.primary.main, marginLeft: 5 }}
                      >
                        Connexion
                      </NavLink>
                    </Paragraph>
                  </form>
                )}
              </Formik>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </JWTRegister>
  );
};

export default JwtRegister;
