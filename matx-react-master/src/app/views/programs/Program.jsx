import { Box, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import FormDialogProgram from "app/components/MatxDialog/FormDialogProgram";
import PaginationTableProgram from "app/components/MatxTable/PaginationTableProgram";

const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
      marginBottom: "30px",
      [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
  }));

  const programs = [
    {
      nom_jour: "Lundi",
      heure_debut: "12:00:00",
      heure_fin: "13:00:00",
      matiere: "Maths",
      theme: "MAO",
    },
    {
        nom_jour: "Mardi",
        heure_debut: "10:00:00",
        heure_fin: "14:00:00",
        matiere: "Web Dynamique",
        theme: "Servlet",
    },
    {
        nom_jour: "Mercredi",
        heure_debut: "10:00:00",
        heure_fin: "14:00:00",
        matiere: "Web Dynamique",
        theme: "Servlet",
    },
    {
        nom_jour: "Jeudi",
        heure_debut: "10:00:00",
        heure_fin: "14:00:00",
        matiere: "Web Dynamique",
        theme: "Servlet",
    },
    {
        nom_jour: "Vendredi",
        heure_debut: "10:00:00",
        heure_fin: "14:00:00",
        matiere: "Web Dynamique",
        theme: "Servlet",
    },
    {
        nom_jour: "Samedi",
        heure_debut: "10:00:00",
        heure_fin: "14:00:00",
        matiere: "Web Dynamique",
        theme: "Servlet",
    }
  ];

const Program=()=>{
    return(
        <div>
            <Container>
                <Box className="breadcrumb">
                    <Breadcrumb routeSegments={[{ name: "Programme", path: "/programme" }]} />       
                </Box>

                <SimpleCard title="Mon Emploi du temps">
                    <PaginationTableProgram programlist={programs}/>
                </SimpleCard>
            </Container>
        </div>
    )
}
 
export default Program