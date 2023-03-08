import { Box, Breadcrumbs, Button, Icon, IconButton, Stack, styled } from "@mui/material";
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
  
  const PaginationTablePublication = ({ publications }) => {
    
    
    return (
        <Container>
            <Box className="breadcrumb">
                <Breadcrumbs routeSegments={[{ name: "Material", path: "/material" }, { name: "Radio" }]} />
            </Box>
    
            <Stack spacing={3}>
                {publications.map((publication) => (
                    <>
                        <SimpleCard title={publication.question}>
                            <p>{publication.descriptions}</p>
                            <Link to="/commentaires" state={{pub:publication}}>
                                <Button color="primary" aria-label="Edit" variant="outlined">
                                    Voir détail
                                </Button>
                            </Link>
                        </SimpleCard>
                    </>
                ))}
            </Stack>
        </Container>
    );
  };
  
  export default PaginationTablePublication;
  