import { Box, styled, Icon } from "@mui/material";
import { Breadcrumb, MatxLoading, SimpleCard } from "app/components";
import PaginationTableCommentaire from "app/components/MatxTable/PaginationTableCommentaire";
import { BASE_URL, TOKEN } from "app/config";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const Commentaires = () => {
  const [publication, setPublication] = useState({});
  const { forumId } = useParams();
  const [isLoadingPublication, setIsLoadingPublication] = useState(true);

  const initiatePublicationDetails = () => {
    setIsLoadingPublication(true);
    axios
      .get(`${BASE_URL}/forum/${forumId}`, {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": TOKEN,
        },
      })
      .then((e) => {
        console.log(e);
        const data = e.data;
        setPublication({ ...data });
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoadingPublication(false);
      });
  };

  useEffect(() => {
    initiatePublicationDetails();
  }, [forumId]);
  return (
    <div>
      <Container>
        <Box className="breadcrumb">
          <Breadcrumb
            routeSegments={[
              { name: "Commentaires", path: "/Commentaires" },
              { name: publication.publication },
            ]}
          />
        </Box>
        {isLoadingPublication ? (
          <>
            <MatxLoading />
            <b>
              <center>Chargement de la publication ...</center>
            </b>
          </>
        ) : (
          <SimpleCard
            title={
              <>
                <small style={{ color: "grey" }}>
                  Author : {`${publication?.nom} ${publication?.prenom}`}
                </small>
                <br />
                <br />
                <h1>
                  <Icon size={30}>forum</Icon> {`${publication?.publication}`}
                </h1>
                <p
                  style={{ color: "grey", fontSize: 15, fontWeight: "normal" }}
                >{`${publication?.description}`}</p>
              </>
            }
          >
            <PaginationTableCommentaire
              initiatePublicationDetails={initiatePublicationDetails}
              pub={publication}
            />
          </SimpleCard>
        )}
      </Container>
    </div>
  );
};

export default Commentaires;
