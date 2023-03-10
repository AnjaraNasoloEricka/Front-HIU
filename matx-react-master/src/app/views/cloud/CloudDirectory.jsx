import { Breadcrumb } from "react-bootstrap";
import { Box, Grid,styled } from "@mui/material";
import React from "react";
import { SimpleCard } from "app/components";
import PaginationTableCloud from "app/components/MatxTable/PaginationTableCloud";
import FormDialogCloud from "app/components/MatxDialog/FormDialogCloud";
import { storage } from '../../../firebase'
import { ref } from 'firebase/storage'

const clouddata=[
    {
        dossier:"etudiant informatique",
        fichier:[
            {   
                lien:"lien1",
                nom:"info104.pdf",
                utilisateur:{
                    nom:"Lucas",
                    prenom:"Rakoto",
                    idetudiant:"ETU1"
                }
            },
            {
                lien:"lien2",
                nom:"info105.jpg",
                utilisateur:{
                    nom:"Lucas",
                    prenom:"Rakoto",
                    idetudiant:"ETU1"
                }
            }
        ]
    },
    {
        dossier:"Science",
        fichier:[
            {
                lien:"lien1",
                nom:"criquet.jpg",
                utilisateur:{
                    nom:"Ross",
                    prenom:"Monica",
                    idetudiant:"ETU2"
                }
            },
            {
                lien:"lien2",
                nom:"appareil_dentaire.jpg",
                utilisateur:{
                    nom:"Ross",
                    prenom:"Lynch",
                    idetudiant:"ETU3"
                }
            },
        ]
    },
    {
        dossier:"Physique et Chimie",
        fichier:[
            {
                lien:"lien4",
                nom:"tableau_periodique.pdf",
                utilisateur:{
                    nom:"Ross",
                    prenom:"Phoebe",
                    idetudiant:"ETU6"
                }
            },
            {
                lien:"lien5",
                nom:"apprentissage_vitesse.pdf",
                utilisateur:{
                    nom:"Ross",
                    prenom:"Max",
                    idetudiant:"ETU7"
                }
            },
        ]
    }
];

const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
      marginBottom: "30px",
      [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
  }));

const CloudDirectory=()=>{
    return (
        <Container>
            <Box className="breadcrumb">
                <Grid container spacing={3}>
                    <Grid item lg={10} md={10} sm={10} xs={10}>
                        <Breadcrumb routeSegments={[{ name: "Cloud", path: "/cloud" }]} />
                    </Grid>
                    <Grid item lg={2} md={2} sm={2} xs={2}>
                        <FormDialogCloud alldossier={clouddata}/>
                    </Grid>
                </Grid>
            </Box>
        <SimpleCard title="Espace Cloud">
            <PaginationTableCloud alldirectory={clouddata}/>
        </SimpleCard>
        </Container>
    )


}

export default CloudDirectory;