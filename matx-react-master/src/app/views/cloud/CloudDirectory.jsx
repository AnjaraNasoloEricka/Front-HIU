import { Breadcrumb } from "react-bootstrap";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Icon,
  Input,
  Stack,
  styled,
  TextField,
} from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import { MatxLoading, SimpleCard } from "app/components";
import PaginationTableCloud from "app/components/MatxTable/PaginationTableCloud";
import FormDialogCloud from "app/components/MatxDialog/FormDialogCloud";
import { storage } from "../../../firebase";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { v4 } from "uuid";
import { BASE_URL, TOKEN } from "app/config";
import Autocomplete from "@mui/material/Autocomplete";
import { getCloudFilesApi } from "app/apis/cloudApi";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));
const CloudDirectory = () => {
  const [cloudData, setCloudData] = useState([]);
  const [fileUpload, setFileUpload] = useState(null);
  const [dossier, setDossier] = useState("");
  const hiddenFileInput = useRef(null);
  const [isLoadingCloudData, setIsLoadingCloudData] = useState(true);

  const initializeCloudData = () => {
    setIsLoadingCloudData(true);
    getCloudFilesApi()
      .then((e) => {
        const data = e.data;
        setCloudData([...data]);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoadingCloudData(false);
      });
  };

  useEffect(() => {
    initializeCloudData();
  }, []);
  // function handleFileUpload(file) {
  //   // const newFileUpload = e.target.files[0];
  //   setFileUpload(file);
  // }

  const handleUploadFile = () => {
    if (fileUpload == null) return;
    const fileRef = ref(storage, `files/${dossier}/${fileUpload.name + v4()}`);
    uploadBytes(fileRef, fileUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((fileUrl) => {
        console.log(fileUrl);
        fetch(`${BASE_URL}/file`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": `${TOKEN}`,
          },
          body: JSON.stringify({
            lien: `${fileUrl}`,
            nom: `${fileUpload.name}`,
            dossier: dossier,
          }),
        })
          .then((response) => response.json())
          .then((data) => console.log(data))
          .catch((error) => console.error(error));
      });
    });
  };
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleChangeUploadedFile = (event) => {
    const fileUploaded = event.target.files[0];
    setFileUpload(fileUploaded);
  };
  useEffect(() => {
    console.log(dossier);
  }, [dossier]);
  useEffect(() => {
    console.log(fileUpload);
  }, [fileUpload]);

  return (
    <Container>
      <SimpleCard title="Espace Cloud">
        <Container>
          <Stack spacing={3}>
            <>
              <SimpleCard>
                <h3>Upload</h3>
                <Button onClick={handleClick} variant="outlined">
                  <CloudDownloadIcon />{" "}
                  <span style={{ marginLeft: 10 }}>
                    Choisissez un fichier à uploader ...
                  </span>
                </Button>
                <br />
                {fileUpload && fileUpload.name}
                <input
                  type="file"
                  ref={hiddenFileInput}
                  style={{ display: "none" }}
                  onChange={handleChangeUploadedFile}
                />
                <br />
                {fileUpload && (
                  // <TextField
                  //   value={dossier}
                  //   onChange={(e) => {
                  //     console.log(e.target.value)
                  //     setDossier(e.target.value);
                  //   }}
                  // />
                  <Autocomplete
                    value={dossier}
                    disablePortal
                    id="combo-box-demo"
                    options={[
                      { label: "informatique", year: 1994 },
                      { label: "gestion", year: 1972 },
                    ]}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField
                        onChange={(e) => setDossier(e.target.value)}
                        {...params}
                        label="Nom de dossier"
                      />
                    )}
                  />
                )}
                <br />
                {fileUpload && dossier ? (
                  <Button
                    variant="contained"
                    onClick={() => {
                      handleUploadFile();
                    }}
                  >
                    Upload
                  </Button>
                ) : (
                  <Button
                    disabled
                    variant="contained"
                    style={{ backgroundColor: "#d7d7d7", color: "#9d9d9d" }}
                  >
                    Upload
                  </Button>
                )}
              </SimpleCard>
            </>
          </Stack>
        </Container>
        {isLoadingCloudData ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MatxLoading text={`Chargement des fichiers ...`}/>
            {/* <CircularProgress style={{ marginRight: 10 }} /> */}
            {/* <p style={{ color: "grey", fontSize: 15 }}>
            </p> */}
          </div>
        ) : (
          <PaginationTableCloud alldirectory={cloudData} />
        )}
      </SimpleCard>
    </Container>
  );
};

export default CloudDirectory;
