import { Box, Breadcrumbs, Container } from "@mui/material";
import PaginationTableCloudFile from "app/components/MatxTable/PaginationTableCloudFile";
import { useLocation } from "react-router-dom";
import React from "react";
import { SimpleCard } from "app/components";

const CloudFile=()=>{
    const location = useLocation();

    const allfile = location.state.allfile;

    return (
        <Container>
            <Box className="breadcrumb">
                <Breadcrumbs routeSegments={[{ name: "Cloud", path: "/cloud" }]} />
                <br/>
                <br/>
            </Box>
            <SimpleCard title="Espace Cloud">
                <PaginationTableCloudFile allfile={allfile}/>
            </SimpleCard>
        </Container>
    );
}

export default CloudFile;