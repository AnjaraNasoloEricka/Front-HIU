import { Breadcrumb, Container } from "react-bootstrap";
import { Box } from "@mui/material";
import React from "react";
import { SimpleCard } from "app/components";
import PaginationTableCloud from "app/components/MatxTable/PaginationTableCloud";
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


const CloudDirectory=()=>{
    return (
        <Container>
            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: "Cloud", path: "/cloud" }]} />
            </Box>
        <SimpleCard title="Espace Cloud">
            <PaginationTableCloud alldirectory={clouddata}/>
        </SimpleCard>
        </Container>
    )


}

export default CloudDirectory;