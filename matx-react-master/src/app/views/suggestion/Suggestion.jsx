import { Box, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import Loading from '../../components/MatxLoading';
import { useEffect, useState } from "react";
import PaginationTableSuggestion from "app/components/MatxTable/PaginationTableSuggestion";

const Suggestiondata=[
    [
        {
            "heure_debut":"08:00:00",
            "heure_fin":"10:00:00",
            "matiere":"Matiere1",
            "numJour":1,
            "is_todo":"no"
        }
    ],
    [
        {
            "heure_debut":"08:00:00",
            "heure_fin":"10:00:00",
            "matiere":"Matiere2",
            "numJour":2,
            "is_todo":"no"
        },
        {
            "heure_debut":"12:00:00",
            "heure_fin":"13:00:00",
            "matiere":"Matiere2",
            "numJour":2,
            "is_todo":"no"
        }
    ],
    [
        {
            "heure_debut":"08:00:00",
            "heure_fin":"10:00:00",
            "matiere":"Matiere3",
            "numJour":3,
            "is_todo":"no"
        }
    ]
]
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));



const Suggestion = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] = useState([]);


  useEffect(() => {
    setSuggestion(Suggestiondata);
  }, []);


  return (
    <div>
      <Container>
        <Box className="breadcrumb">
          <Breadcrumb
            routeSegments={[{ name: "Suggestions", path: "/suggestion" }]}
          />
        </Box>

        <SimpleCard title="Suggestion horaire">
          {isLoading ? (
            <Loading />
          ) : (
            <PaginationTableSuggestion tabsuggestion={suggestion}/>
          )}
        </SimpleCard>
      </Container>
    </div>
  );
};

export default Suggestion;
