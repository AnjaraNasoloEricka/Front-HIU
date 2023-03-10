import {
  Box,
  Breadcrumbs,
  Button,
  Stack,
  styled,
} from "@mui/material";
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
        <Breadcrumbs
          routeSegments={[
            { name: "Material", path: "/material" },
            { name: "Radio" },
          ]}
        />
      </Box>
      <Stack spacing={3}>
        {publications.map((publication) => (
          <>
            <SimpleCard title={publication.publication}>
              <p>
                <small style={{ color: "gray" }}>
                  Auteur : {publication.nom} {publication.prenom}
                </small>
              </p>  
              <Link
                to={`/forum/${publication?._id}/commentaires`}
                state={{ pub: publication }}
              >
                <Button color="primary" aria-label="Edit" variant="outlined">
                  Voir la discussion
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
