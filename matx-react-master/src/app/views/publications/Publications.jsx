import { Box, styled, TextField } from "@mui/material";
import { Breadcrumb, MatxLoading, SimpleCard } from "app/components";
import PaginationTablePublication from "app/components/MatxTable/PaginationTablePublication";
import { BASE_URL, TOKEN } from "app/config";
import axios from "axios";
import { useEffect, useState } from "react";
import illustration from "../../../images/illustrations/photos/forum.jpg";
import ForumIcon from "@mui/icons-material/Forum";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const pubs = [];

const Publications = () => {
  const [publicationsList, setPulicationsList] = useState([]);
  const [isLoadingPublicationsList, setIsLoadingPublicationsList] =
    useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoadingNewPublication, setIsLoadingNewPublication] = useState(false);

  const initializePublicationsList = () => {
    setIsLoadingPublicationsList(true);
    axios
      .get(`${BASE_URL}/forum`, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": TOKEN,
        },
      })
      .then((e) => {
        const data = e.data;
        if (data) {
          setPulicationsList([...data]);
        }
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        setIsLoadingPublicationsList(false);
      });
  };
  useEffect(() => {
    initializePublicationsList();
  }, []);
  return (
    <div>
      <Container>
        <Box className="breadcrumb">
          <Breadcrumb
            routeSegments={[{ name: "Publications", path: "/publications" }]}
          />
        </Box>
        <SimpleCard
          title={
            <>
              <p
                style={{
                  marginLeft: 5,
                  color: "grey",
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: 30,
                }}
              >
                <ForumIcon style={{ marginRight: 10 }} />
                Forum de discussions
              </p>
            </>
          }
        >
          {isLoadingPublicationsList ? (
            <>
              <MatxLoading text={`Chargement des publications ...`} />
            </>
          ) : (
            <>
              <Box
                component="img"
                sx={{
                  maxWidth: 400,
                }}
                alt="Illustration"
                src={illustration}
                marginLeft={5}
              />
              <SimpleCard>
                <h2>Nouvelle publication</h2>
                <TextField
                  style={{
                    width: "100%",
                  }}
                  variant="standard"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </SimpleCard>
              <PaginationTablePublication publications={publicationsList} />
            </>
          )}
        </SimpleCard>
      </Container>
    </div>
  );
};

export default Publications;
