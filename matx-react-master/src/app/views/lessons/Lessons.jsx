import { Box, styled } from "@mui/material";
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

const Lessons = () => {
  return (
    <div>
      <Container>
        <Box className="breadcrumb">
          <Breadcrumb routeSegments={[{ name: "Publications", path: "/publications" }]} />
        </Box>
        <SimpleCard title="Liste des Lessons">
            {/* <PaginationTablePublication publications={pubs} /> */}
        </SimpleCard>
      </Container>
    </div>
  );
};

export default Lessons;
