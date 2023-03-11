import { Box, styled } from "@mui/material";
import { getProgramList } from "app/apis/programApi";
import { Breadcrumb, SimpleCard } from "app/components";
import PaginationTableProgram from "app/components/MatxTable/PaginationTableProgram";
import Loading from "../../components/MatxLoading";
// import MyTimeTable from 'app/components/MatxTimeTable/MyTimeTable';
// import { BASE_URL, TOKEN } from 'app/config';
// import axios from 'axios';
import { useEffect, useState } from "react";
// import TimeTable from 'react-timetable-events';
import illustrationEmploiDuTtemps from "../../../images/illustrations/photos/emploi_du_temps.png";
import { Image } from "@mui/icons-material";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const Program = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [programs, setPrograms] = useState({});

  const initializeProgramList = () => {
    setIsLoading(true);
    getProgramList()
      .then((e) => {
        const data = e;
        if (data) {
          setPrograms(data);
        }
      })
      .catch((err) => {
        // catch error here
        alert(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    initializeProgramList();
  }, []);

  return (
    <div>
      <Container>
        <Box className="breadcrumb">
          <Breadcrumb
            routeSegments={[{ name: "Programme", path: "/programme" }]}
          />
        </Box>
        <div
          style={
            {
              // height: 75,
              // backgroundImage:`url(${illustrationEmploiDuTtemps})`,
              // backgroundRepeat:"no-repeat",
              // backgroundPosition:"contained"
            }
          }
        >
          <center>
            <h1>Mon emploi du temps</h1>
          </center>
        </div>
        {isLoading ? (
          <>
            <Loading />
            <center>
              <Box
                component="img"
                sx={{
                  marginTop: 10,
                  height: 400,
                  width: 600,
                  maxHeight: { xs: 300, md: 167 },
                  maxWidth: { xs: 400, md: 250 },
                }}
                alt="Illustration"
                src={illustrationEmploiDuTtemps}
              />
            </center>
          </>
        ) : (
          <SimpleCard title="">
            <PaginationTableProgram
              initializeProgramList={initializeProgramList}
              programlist={programs}
            />
          </SimpleCard>
        )}
      </Container>
    </div>
  );
};

export default Program;
