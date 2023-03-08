import { Box, Breadcrumbs, Button, Grid, Icon, IconButton, Stack, styled } from "@mui/material";
import PlacingRadioLabel from "app/views/material-kit/radio/PlacingRadioLabel";
import SimpleRadio from "app/views/material-kit/radio/SimpleRadio";
import { Link } from "react-router-dom";
import { SimpleCard } from "..";

const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
      marginBottom: "30px",
      [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
  }));
  
  const PaginationTableCommentaire = ({ pub }) => {
    
    
    return (
        <Container>
            <Grid container spacing={3}>
                <Grid item lg={8} md={8} sm={12} xs={12}>

                    <Stack spacing={3}>
                        <SimpleCard title={pub.question}>
                            <p>{pub.descriptions}</p>
                        </SimpleCard>
                        <br />
                    </Stack>

                    <Stack spacing={3}>
                        {pub.commentaires.map((commentaire) => (
                            <>
                                <SimpleCard title={commentaire.user.nom}>
                                    <p>{commentaire.commentaire}</p>
                                </SimpleCard>
                            </>
                        ))}
                    </Stack>

                </Grid>

                <Grid item lg={4} md={4} sm={12} xs={12}>

                    <Stack spacing={3}>
                        <SimpleCard title="Votre réponse">
                            <p>
                                <textarea name="" id="" cols="38" rows="8"></textarea>
                            </p>
                            <Link to="/publications" >
                                <Button color="primary" aria-label="Edit" variant="contained">Commenter</Button>
                            </Link>
                        </SimpleCard>
                    </Stack>
                </Grid>
            </Grid>
        </Container>
    );
  };
  
  export default PaginationTableCommentaire;
  