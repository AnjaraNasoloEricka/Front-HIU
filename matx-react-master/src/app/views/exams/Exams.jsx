import { Box, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import PaginationTableExam from "app/components/MatxTable/PaginationTableExam";

const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
      marginBottom: "30px",
      [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
  }));

  const exam = [
    { 
      date_debut: "2023-01-01 12:00:00",
      date_fin: "2023-01-01 13:00:00",
      matiere: "Maths",
      type: "Theorie",
      theme: "MAO",
    },
    {
        date_debut: "2023-01-01 12:00:00",
        date_fin: "2023-01-01 13:00:00",
        matiere: "Web Dynamique",
        type: "Theorie",
        theme: "Servlet",
    },
    {
        date_debut: "2023-01-01 12:00:00",
        date_fin: "2023-01-01 13:00:00",
        matiere: "Web Dynamique",
        type: "Theorie",
        theme: "Servlet",
    },
    {
        date_debut: "2023-01-01 12:00:00",
        date_fin: "2023-01-01 13:00:00",
        matiere: "Maths",
        type: "Theorie",
        theme: "MAO",
    },
    {
        date_debut: "2023-01-01 12:00:00",
        date_fin: "2023-01-01 13:00:00",
        matiere: "Web Dynamique",
        type: "Theorie",
        theme: "Servlet",
    },
    {
        date_debut: "2023-01-01 12:00:00",
        date_fin: "2023-01-01 13:00:00",
        matiere: "Web Dynamique",
        type: "Theorie",
        theme: "Servlet",
    }
  ];

const Exams=()=>{
    return(
        <div>
            <Container>
                <Box className="breadcrumb">
                    <Breadcrumb routeSegments={[{ name: "Examen", path: "/Examen" }]} />       
                </Box>

                <SimpleCard title="Liste de mes examens">
                    <PaginationTableExam examlist={exam}/>
                </SimpleCard>
            </Container>
        </div>
    )
}
 
export default Exams