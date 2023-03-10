import { Box, styled } from "@mui/material";
import { getExamList } from "app/apis/examApi";
import { Breadcrumb, MatxLoading, SimpleCard } from "app/components";
import PaginationTableExam from "app/components/MatxTable/PaginationTableExam";
import PaginationTablePublication from "app/components/MatxTable/PaginationTablePublication";
import { BASE_URL, TOKEN } from "app/config";
import axios from "axios";
import { useEffect, useState } from "react";

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
        <SimpleCard title="Forum de discussions">
          {isLoadingPublicationsList ? (
            <>
              <MatxLoading />
              <br />
              <center>Chargement des publications en cours ...</center>
            </>
          ) : (
            <PaginationTablePublication publications={publicationsList} />
          )}
        </SimpleCard>
      </Container>
    </div>
  );
};

export default Publications;
