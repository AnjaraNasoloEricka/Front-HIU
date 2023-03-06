import { Box, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import PaginationTableProgram from "app/components/MatxTable/PaginationTableProgram";
import MyTimeTable from "app/components/MatxTimeTable/MyTimeTable";
import TimeTable from "react-timetable-events";

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


  const events=
  {
      monday: [
        {
          id: 1,
          name: "Custom Event 1",
          type: "custom",
          startTime: new Date("2018-02-23T11:30:00"),
          endTime: new Date("2018-02-23T13:30:00"),
        },
      ],
      tuesday: [
        {
          id: 2,
          name: "Custom Event 2",
          type: "custom",
          startTime: new Date("2018-02-22T12:30:00"),
          endTime: new Date("2018-02-22T14:30:00"),
        },
        {
          id: 3,
          name: "Custom Event 3",
          type: "custom",
          startTime: new Date("2018-02-22T16:30:00"),
          endTime: new Date("2018-02-22T18:45:00"),
        },
      ],
      wednesday: [],
      thursday: [],
      friday: [],
    };

const Program=()=>{
    return(
        <div>
            <Container>
                 <Box className="breadcrumb">
                    <Breadcrumb routeSegments={[{ name: "Programme", path: "/programme" }]} />       
                </Box>

                <TimeTable events={events} />
                <SimpleCard title="Mon Emploi du temps">
                    <PaginationTableProgram programlist={programs}/> 
                   
                </SimpleCard> 
            </Container>
        </div>
    )
}

 
export default Program