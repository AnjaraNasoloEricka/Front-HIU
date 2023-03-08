import { Box, styled } from "@mui/material";
import { getExamList } from "app/apis/examApi";
import { Breadcrumb, MatxLoading, SimpleCard } from "app/components";
import PaginationTableExam from "app/components/MatxTable/PaginationTableExam";
import { useEffect, useState } from "react";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));
// const examListMock = [
//   {
//     _id: "64083912c470860f411d7a26",
//     etudiantId: "64063960c2f732da57d49878",
//     date_debut: "2023-03-08T10:00:00.000Z",
//     date_fin: "2023-03-08T11:00:00.000Z",
//     matiere: "Web Dynamique 1",
//     theme: "theme",
//   },
//   {
//     _id: "64083912c470860f411d7a26",
//     etudiantId: "64063960c2f732da57d49878",
//     date_debut: "2023-01-01 12:00:00",
//     date_fin: "2023-01-01 13:00:00",
//     matiere: "Web Dynamique 2",
//     theme: "Servlet",
//   },
//   {
//     _id: "64083912c470860f411d7a26",
//     etudiantId: "64063960c2f732da57d49878",
//     date_debut: "2023-01-01 12:00:00",
//     date_fin: "2023-01-01 13:00:00",
//     matiere: "Web Dynamique 3",
//     theme: "Servlet",
//   },
//   {
//     _id: "64083912c470860f411d7a26",
//     etudiantId: "64063960c2f732da57d49878",
//     date_debut: "2023-01-01 12:00:00",
//     date_fin: "2023-01-01 13:00:00",
//     matiere: "Web Dynamique 4",
//     theme: "Servlet",
//   },
// ];
const Exams = () => {
  const [exams, setExams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const initializeExamsList = () => {
    setIsLoading(true);
    getExamList()
      .then((e) => {
        if (e.exams) {
          setExams(e.exams);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
    // setExams(examListMock);
  };
  useEffect(() => {
    initializeExamsList();
  }, []);

  return (
    <div>
      <Container>
        <Box className="breadcrumb">
          <Breadcrumb routeSegments={[{ name: "Examen", path: "/Examen" }]} />
        </Box>
        <SimpleCard title="Liste de mes examens à venir / en cours">
          {isLoading ? (
            <MatxLoading />
          ) : (
            <PaginationTableExam examlist={exams} />
          )}
        </SimpleCard>
      </Container>
    </div>
  );
};

export default Exams;
