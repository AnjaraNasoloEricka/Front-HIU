import { Box, styled } from "@mui/material";
import { getProgramList } from "app/apis/programApi";
import { Breadcrumb, SimpleCard } from "app/components";
import PaginationTableProgram from "app/components/MatxTable/PaginationTableProgram";
import Loading from '../../components/MatxLoading';
// import MyTimeTable from 'app/components/MatxTimeTable/MyTimeTable';
// import { BASE_URL, TOKEN } from 'app/config';
// import axios from 'axios';
import { useEffect, useState } from "react";
// import TimeTable from 'react-timetable-events';

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
    setIsLoading(true)
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

        <SimpleCard title="Mon Emploi du temps">
          {isLoading ? (
            <Loading />
          ) : (
            <PaginationTableProgram initializeProgramList={initializeProgramList} programlist={programs} />
          )}
        </SimpleCard>
      </Container>
    </div>
  );
};

export default Program;
