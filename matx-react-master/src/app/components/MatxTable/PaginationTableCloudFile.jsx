import { Box, Breadcrumbs, Button, Grid, Icon, IconButton, Stack, styled } from "@mui/material";
import PlacingRadioLabel from "app/views/material-kit/radio/PlacingRadioLabel";
import SimpleRadio from "app/views/material-kit/radio/SimpleRadio";
import { Link } from "react-router-dom";
import ArticleIcon from '@mui/icons-material/Article';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { SimpleCard } from "..";

const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
      marginBottom: "30px",
      [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
  }));
  
const PaginationTableCloudFile = ({ allfile }) => {
    return (
        <Container>
            <Stack spacing={3}>
                {allfile.map((file) => (
                    <>
                        <SimpleCard>
                        <Grid container spacing={3}>
                            <Grid item lg={1} md={1} sm={1} xs={1}>
                                <h3><ArticleIcon/></h3>
                            </Grid>
                            <Grid item lg={8} md={8} sm={8} xs={8}>
                                <h3>{file.nom}</h3>
                                <p>Par {file.utilisateur.nom} {file.utilisateur.prenom}</p>
                            </Grid>
                            <Grid item lg={3} md={3} sm={3} xs={3}>
                                <h3>
                                    <Link to="">
                                        <Button color="success" aria-label="Edit" variant="contained">
                                            <CloudDownloadIcon/>
                                            Télécharger
                                        </Button>
                                    </Link>
                                </h3>
                            </Grid>
                        </Grid>
                        </SimpleCard>
                    </>
                ))}
            </Stack>
        </Container>
    );
  };
  
  export default PaginationTableCloudFile;
  