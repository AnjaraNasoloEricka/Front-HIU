import { LoadingButton } from "@mui/lab";
import { Card, Alert, Grid, TextField } from "@mui/material";
import { Box, styled, useTheme } from "@mui/system";
import { loginApi } from "app/apis/authApi";
import { Paragraph } from "app/components/Typography";
import useAuth from "app/hooks/useAuth";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { BASE_URL, TOKEN } from "app/config";

const FlexBox = styled(Box)(() => ({ display: "flex", alignItems: "center" }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: "center" }));

const ContentBox = styled(Box)(() => ({
  height: "100%",
  padding: "32px",
  position: "relative",
  background: "rgba(0, 0, 0, 0.01)",
}));

const JWTRoot = styled(JustifyBox)(() => ({
  background: "#1A2038",
  minHeight: "100% !important",
  "& .card": {
    maxWidth: 800,
    minHeight: 400,
    margin: "1rem",
    display: "flex",
    borderRadius: 12,
    alignItems: "center",
  },
}));
// form field validation schema
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Le mot de passe doit être 6 caractères minimum")
    .required("Mot de passe requis"),
  email: Yup.string()
    .email("Invalide adresse email")
    .required("Adresse email requis"),
});

const JwtLogin = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [emailState, setEmailState] = useState("johndoe@example.com");
  const [passwordState, setPasswordState] = useState("Password@123");

  const login = async (email, password) => {
    setFeedback("");
    setLoading(true);
    const loginData = {
      email,
      password,
    };
    loginApi(loginData)
      .then((e) => {
        const data = e.data;
        const token = data.token;
        if (token) {
          localStorage.setItem("accessToken", token);
          axios
            .post(
              `${BASE_URL}/notification/saveTokenDevice`,
              {
                'token': localStorage.getItem("clientToken"),
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  "x-auth-token": TOKEN,
                },
              }
            )
            .then((resp) => {
              console.log(resp)
            })
            .catch((err) => {
              console.error(err);
            })
            .finally(() => {
              window.location = "/";
            });
        }
      })
      .catch((err) => {
        setFeedback("Email ou mot de passe invalide");
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    // if(feedback){
    //   setTimeout(()=>{
    //     setFeedback("")
    //   },2000)
    // }
  }, [feedback]);
  return (
    <JWTRoot>
      <Card className="card">
        <Grid container>
          <Grid item sm={6} xs={12}>
            <JustifyBox p={4} height="100%" sx={{ minWidth: 320 }}>
              <img
                src="/assets/images/illustrations/1.svg"
                width="100%"
                alt=""
              />
            </JustifyBox>
          </Grid>

          <Grid item sm={6} xs={12}>
            <ContentBox>
              {/* {feedback} */}
              {feedback && <Alert severity="error">{feedback}</Alert>}
              <br />
              <Formik>
                {() => (
                  <form>
                    <TextField
                      fullWidth
                      size="small"
                      type="email"
                      name="email"
                      label="Email"
                      variant="outlined"
                      value={emailState}
                      onChange={(e) => {
                        setEmailState(e.target.value);
                      }}
                      // onBlur={handleBlur}
                      // value={values.email}
                      // onChange={handleChange}
                      // helperText={touched.email && errors.email}
                      // error={Boolean(errors.email && touched.email)}
                      sx={{ mb: 3 }}
                    />

                    <TextField
                      fullWidth
                      size="small"
                      name="password"
                      type="password"
                      label="Mot De Passe"
                      variant="outlined"
                      value={passwordState}
                      onChange={(e) => {
                        setPasswordState(e.target.value);
                      }}
                      // onBlur={handleBlur}
                      // value={values.password}
                      // onChange={handleChange}
                      // helperText={touched.password && errors.password}
                      // error={Boolean(errors.password && touched.password)}
                      sx={{ mb: 1.5 }}
                    />

                    <LoadingButton
                      // type=""
                      color="primary"
                      loading={loading}
                      variant="contained"
                      sx={{ my: 2 }}
                      onClick={() => {
                        login(emailState, passwordState);
                      }}
                    >
                      Se connecter
                    </LoadingButton>

                    <Paragraph>
                      Vous n'avez pas de compte?
                      <NavLink
                        to="/session/signup"
                        style={{
                          color: theme.palette.primary.main,
                          marginLeft: 5,
                        }}
                      >
                        S'inscrire ici
                      </NavLink>
                    </Paragraph>
                  </form>
                )}
              </Formik>
            </ContentBox>
          </Grid>
        </Grid>
      </Card>
    </JWTRoot>
  );
};

export default JwtLogin;
