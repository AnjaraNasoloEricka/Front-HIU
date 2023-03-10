import { Box, Breadcrumbs, Button, Grid, Icon, IconButton, Stack, styled } from "@mui/material";
import PlacingRadioLabel from "app/views/material-kit/radio/PlacingRadioLabel";
import SimpleRadio from "app/views/material-kit/radio/SimpleRadio";
import { Link } from "react-router-dom";
import FolderIcon from '@mui/icons-material/Folder';
import { SimpleCard } from "..";

const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
      marginBottom: "30px",
      [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
  }));
  
  const PaginationTableCloud = ({ alldirectory }) => {

    return (
        <Container>
            <Stack spacing={3}>
                {alldirectory.map((directory) => (
                    <>
                        <SimpleCard>
                        <Grid container spacing={3}>
                            <Grid item lg={1} md={1} sm={1} xs={1}>
                                <h3><FolderIcon/></h3>
                            </Grid>
                            <Grid item lg={8} md={8} sm={8} xs={8}>
                                <h3>{directory.dossier}</h3>
                            </Grid>
                            <Grid item lg={3} md={3} sm={3} xs={3}>
                                <h3>
                                    <Link to="/cloud/file" state={{allfile:directory.fichier}}>
                                        <Button color="primary" aria-label="Edit" variant="outlined">
                                            Voir fichiers
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
  
  export default PaginationTableCloud;
  