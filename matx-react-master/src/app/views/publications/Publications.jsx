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
    question: "Courbe Mathématique",
    descriptions: "Comment tracer la courbe représentatrice de ln(x)?",
    commentaires : [
        {
            user : {
              _idUser : "",
              nom : "Rakoto Jean"
            },
            commentaire : "Il faut d'abord tracer un repère orthonormé. Ensuite, prendre plusieurs points grâce à l'équation de la droite. En reliant ces points, tu peux obtenir la courbe représentatrice de ln(x)."
        },
        {
            user : {
              _idUser : "",
              nom : "Rabe Andy"
            },
            commentaire : "Cela tombe bien. Moi aussi je cherche une solution à ce problème."
        }
    ]
  },
  {
    _id: "64083912c470860f411d7a26",
    question: "Troisième guerre mondiale",
    descriptions: "Est-ce-que la Russie et l'Ukraine peuvent-ils provoquer une troisième guerre mondiale?",
    commentaires : [
      {
        user : {
          _idUser : "",
          nom : "Rakoto Jean"
        },
        commentaire : "Non, ils ont juste besoin d'argent."
      },
      {
          user : {
            _idUser : "",
            nom : "Rabe Andy"
          },
          commentaire : "Peut-être que cela pourra se produire vis à vis de la situation actuelle du monde."
      }
    ]
  },
  {
    _id: "64083912c470860f411d7a26",
    question: "Tableau périodique",
    descriptions: "Il y a-t-il une façon plus facile de mémoriser les valeurs du tableau périodique?",
    commentaires : [
      {
        user : {
          _idUser : "",
          nom : "Rakoto Jean"
        },
        commentaire : "Oui, il y a la méthode traditionnelle. Cela consiste à par coeur chaque élément, mémoriser leurs symboles et leurs positions."
      },
      {
          user : {
            _idUser : "",
            nom : "Rabe Andy"
          },
          commentaire : "Oui, il faut tout simplement mémoriser les groupes et les périodes de chaque éléments."
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
