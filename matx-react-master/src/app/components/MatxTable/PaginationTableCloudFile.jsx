import { Button, Grid, Stack, styled } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { SimpleCard } from "..";
import "firebase/storage";
import ReactLoading from "react-loading";
import { useState } from "react";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const PaginationTableCloudFile = ({ allfile }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const handleDownload = async (fileUrl, fileName) => {
    setIsDownloading(true);
    // const response = await fetch(fileUrl);
    // const blob = await response.blob();
    // const url = window.URL.createObjectURL(blob);
    // const a = document.createElement(`a`);
    // a.href = fileUrl;
    // a.download = fileName;
    // a.click();
    // setIsDownloading(false);
  };

  return (
    <Container>
      <Stack spacing={3}>
        {allfile.map((file) => (
          <>
            <SimpleCard>
              <Grid container spacing={3}>
                <Grid item lg={1} md={1} sm={1} xs={1}>
                  <h3>
                    <ArticleIcon />
                  </h3>
                </Grid>
                <Grid item lg={8} md={8} sm={8} xs={8}>
                  <h3>{file.nom}</h3>
                  <p>
                    Par {file.utilisateur.nom} {file.utilisateur.prenom}
                  </p>
                </Grid>
                <Grid item lg={3} md={3} sm={3} xs={3}>
                  <h3>
                    <Button
                      color="success"
                      aria-label="Edit"
                      variant="outlined"
                      disabled={isDownloading}
                      onClick={() => {
                        handleDownload(`${file.lien}`, file.nom);
                      }}
                    >
                      {isDownloading ? (
                        <ReactLoading
                          type={"cylon"}
                          color={"green"}
                          height={25}
                          width={25}
                        />
                      ) : (
                        <CloudDownloadIcon />
                      )}
                    </Button>
                  </h3>
                </Grid>
              </Grid>
            </SimpleCard>
          </>
        ))}
      </Stack>
    </Container>
  );
};

export default PaginationTableCloudFile;
