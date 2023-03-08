import { Box, styled } from "@mui/material";
import { getExamList } from "app/apis/examApi";
import { Breadcrumb, MatxLoading, SimpleCard } from "app/components";
import PaginationTableCommentaire from "app/components/MatxTable/PaginationTableCommentaire";
import PaginationTableExam from "app/components/MatxTable/PaginationTableExam";
import PaginationTablePublication from "app/components/MatxTable/PaginationTablePublication";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));


const Commentaires = () => {

    const location = useLocation();

    const pub = location.state.pub;

//   const [exams, setExams] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const initializeExamsList = () => {
//     setIsLoading(true);
//     getExamList()
//       .then((e) => {
//         if (e.exams) {
//           setExams(e.exams);
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       })
//       .finally(() => {
//         setIsLoading(false);
//       });
//     // setExams(examListMock);
//   };
//   useEffect(() => {
//     initializeExamsList();
//   }, []);


  return (
    <div>
      <Container>
        <Box className="breadcrumb">
          <Breadcrumb routeSegments={[{ name: "Commentaires", path: "/Commentaires" }]} />
        </Box>
        <SimpleCard title="Résultats">
            <PaginationTableCommentaire pub={pub} />
        </SimpleCard>
      </Container>
    </div>
  );
};

export default Commentaires;
