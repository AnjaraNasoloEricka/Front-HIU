import { Box, styled } from "@mui/material";
import { getExamList } from "app/apis/examApi";
import { Breadcrumb, MatxLoading, SimpleCard } from "app/components";
import PaginationTableExam from "app/components/MatxTable/PaginationTableExam";
import PaginationTablePublication from "app/components/MatxTable/PaginationTablePublication";
import { useEffect, useState } from "react";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const pubs = [
  {
    _id: "64083912c470860f411d7a26",
    question: "Question 1?",
    descriptions: "Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès qu'il est prêt ou que la mise en page est achevée. Généralement, on utilise un texte en faux latin, le Lorem ipsum ou Lipsum.",
    commentaires : [
        {
            user : {
              _idUser : "",
              nom : "User 1"
            },
            commentaire : "Commentaire 1"
        },
        {
            user : {
              _idUser : "",
              nom : "User 2"
            },
            commentaire : "Commentaire 2"
        }
    ]
  },
  {
    _id: "64083912c470860f411d7a26",
    question: "Question 2?",
    descriptions: "Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès qu'il est prêt ou que la mise en page est achevée. Généralement, on utilise un texte en faux latin, le Lorem ipsum ou Lipsum.",
    commentaires : [
      {
        user : {
          _idUser : "",
          nom : "User 1"
        },
        commentaire : "Commentaire 1"
      },
      {
          user : {
            _idUser : "",
            nom : "User 2"
          },
          commentaire : "Commentaire 2"
      }
    ]
  },
  {
    _id: "64083912c470860f411d7a26",
    question: "Question 3?",
    descriptions: "Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès qu'il est prêt ou que la mise en page est achevée. Généralement, on utilise un texte en faux latin, le Lorem ipsum ou Lipsum.",
    commentaires : [
      {
        user : {
          _idUser : "",
          nom : "User 1"
        },
        commentaire : "Commentaire 1"
      },
      {
          user : {
            _idUser : "",
            nom : "User 2"
          },
          commentaire : "Commentaire 2"
      }
    ]
  },
];

const Publications = () => {
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
          <Breadcrumb routeSegments={[{ name: "Publications", path: "/publications" }]} />
        </Box>
        <SimpleCard title="Liste des questions">
            <PaginationTablePublication publications={pubs} />
        </SimpleCard>
      </Container>
    </div>
  );
};

export default Publications;
