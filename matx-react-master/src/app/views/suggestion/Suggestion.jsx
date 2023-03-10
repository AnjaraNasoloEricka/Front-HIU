import { Box, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import Loading from "../../components/MatxLoading";
import { useEffect, useState } from "react";
import PaginationTableSuggestion from "app/components/MatxTable/PaginationTableSuggestion";

const Suggestiondata = [
  [
  ],
  [
    
  ],
  [
    // {
    //   _id: "6409a8467ac7430d2ebfe01a",
    //   etudiantId: "64063960c2f732da57d49878",
    //   heure_debut: "08:00",
    //   heure_fin: "10:00",
    //   matiere: "Mathematique",
    //   theme: "Algebre",
    //   numJour: 2,
    // },
  ],
  [
    {
      etudiantId: "64063960c2f732da57d49878",
      heure_debut: "08:00",
      heure_fin: "08:10",
      matiere: "Acheter du savon",
      theme: "",
      isTodo: true,
      numJour: 0,
    },
    {
      etudiantId: "64063960c2f732da57d49878",
      heure_debut: "08:10",
      heure_fin: "08:12",
      matiere: "Boire de l'eau",
      theme: "",
      isTodo: true,
      numJour: 0,
    },
    {
      _id: "64084e6988df53ac2959341a",
      etudiantId: "64063960c2f732da57d49878",
      heure_debut: "09:00",
      heure_fin: "12:00",
      matiere: "Anglais",
      theme: "Business English",
      numJour: 3,
    },
    {
      _id: "6409a8aa7ac7430d2ebfe01c",
      etudiantId: "64063960c2f732da57d49878",
      heure_debut: "14:00",
      heure_fin: "16:00",
      matiere: "Francais",
      theme: "Bien parler le français",
      numJour: 3,
    },
    {
      etudiantId: "64063960c2f732da57d49878",
      heure_debut: "16:00",
      heure_fin: "16:04",
      matiere: "Manger du pain",
      theme: "",
      isTodo: true,
      numJour: 0,
    },
  ],
  [
  ],
];
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
            <PaginationTableSuggestion tabsuggestion={suggestion} />
          )}
        </SimpleCard>
      </Container>
    </div>
  );
};

export default Suggestion;
