import {
  Button,
  CircularProgress,
  Grid,
  Icon,
  Stack,
  styled,
  TextField,
} from "@mui/material";
import { BASE_URL, TOKEN } from "app/config";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { SimpleCard } from "..";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const PaginationTableCommentaire = ({ pub, initiatePublicationDetails }) => {
  const [pubState, setPubState] = useState({ ...pub });
  const [newComment, setNewComment] = useState("");
  const [isLoadingNewComment, setIsLoadingNewComment] = useState(false);
  const alert = useAlert();
  useEffect(() => {
    setPubState({ ...pub });
  }, [pub]);

  const handleSendComment = () => {
    setIsLoadingNewComment(true);
    console.log(newComment);
    axios
      .post(
        `${BASE_URL}/forum/${pub._id}/commentaires`,
        {
          texte: newComment,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": TOKEN,
          },
        }
      )
      .then((e) => {
        if (initiatePublicationDetails) {
          alert.show(
            <div style={{ color: "green" }}>
              <b>
                <small>Commentaire ajouté</small>
              </b>
            </div>
          );
          initiatePublicationDetails();
        }
      })
      .catch((err) => {
        console.error(err);
        alert.show(
          <div style={{ color: "green" }}>
            <b>
              <small>Erreur lors de l'ajout de commentaire</small>
            </b>
          </div>
        );
      })
      .finally(() => {
        setIsLoadingNewComment(false);
      });
  };
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item lg={8} md={8} sm={12} xs={12}>
          <Stack spacing={1}>
            <h2>Commentaires</h2>
            <div
              style={{
                borderWidth: 2,
                borderStyle: "solid",
                borderColor: "grey",
                borderRadius: 5,
              }}
            >
              <SimpleCard title={`Ajouter un commentaire`}>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TextField
                    style={{ width: "100%" }}
                    onChange={(e) => {
                      setNewComment(e.target.value);
                    }}
                  />
                  {isLoadingNewComment ? (
                    <Button>
                      <Icon>
                        <CircularProgress size={20} />
                      </Icon>
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        handleSendComment();
                      }}
                    >
                      <Icon>send</Icon>
                    </Button>
                  )}
                </div>
              </SimpleCard>
            </div>
            <br />
            {pubState.commentaire &&
              [...pubState.commentaire].reverse().map((commentaire, key) => {
                return (
                  <div key={key}>
                    <SimpleCard
                      title={`${commentaire?.nom} ${commentaire?.prenom}`}
                    >
                      {commentaire?.texte}
                    </SimpleCard>
                    <br />
                  </div>
                );
              })}
          </Stack>
        </Grid>
        {/* <Grid item lg={4} md={4} sm={12} xs={12}>
          <Stack spacing={3}>
            <SimpleCard title="Votre réponse">
              <p>
                <textarea name="" id="" cols="38" rows="8"></textarea>
              </p>
              <Link to="/publications">
                <Button color="primary" aria-label="Edit" variant="contained">
                  Commenter
                </Button>
              </Link>
            </SimpleCard>
          </Stack>
        </Grid> */}
      </Grid>
    </Container>
  );
};

export default PaginationTableCommentaire;
