import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  styled,
  TextField,
} from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import { MatxLoading, SimpleCard } from "app/components";
import PaginationTableCloud from "app/components/MatxTable/PaginationTableCloud";
import { storage } from "../../../firebase";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { BASE_URL, TOKEN } from "app/config";
import Autocomplete from "@mui/material/Autocomplete";
import { getCloudFilesApi } from "app/apis/cloudApi";
import CloudIcon from "@mui/icons-material/Cloud";
import SendIcon from "@mui/icons-material/Send";
import { useAlert } from "react-alert";
import ReactLoading from "react-loading";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));
const CloudDirectory = () => {
  const alert = useAlert();
  const [cloudData, setCloudData] = useState([]);
  const [fileUpload, setFileUpload] = useState(null);
  const [dossier, setDossier] = useState("");
  const hiddenFileInput = useRef(null);
  const [isLoadingCloudData, setIsLoadingCloudData] = useState(true);

  const [isLoadingUpload, setIsLoadingUpload] = useState(false);

  const initializeCloudData = () => {
    setFileUpload(null)
    setDossier("")
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
    setIsLoadingUpload(true);
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
          .then((data) => {
            console.log(data);
            alert.success(`Fichier uploadé avec succès`);
          })
          .catch((error) => {
            console.error(error);
            alert.error(`Une erreur est survenue lors de l'upload du fichier`);
          })
          .finally(() => {
            setIsLoadingUpload(false);
            setTimeout(() => {
              initializeCloudData();
            }, 1000);
          });
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
      <SimpleCard
        title={
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "end",
            }}
          >
            <CloudIcon style={{ marginRight: 10, width: 20 }} /> Espace Cloud
          </div>
        }
      >
        <Container>
          <Stack spacing={3}>
            <>
              <SimpleCard>
                <h3>Upload</h3>
                <Button onClick={handleClick} variant="outlined">
                  <CloudDownloadIcon />{" "}
                  <span style={{ marginLeft: 10 }}>
                    {fileUpload
                      ? fileUpload?.name
                      : "Choisissez un fichier à uploader ..."}
                  </span>
                </Button>
                <br />
                <br />
                <input
                  type="file"
                  ref={hiddenFileInput}
                  style={{ display: "none" }}
                  onChange={handleChangeUploadedFile}
                />
                <div
                  style={
                    {
                      // display: "flex",
                      // alignItems: "center",
                    }
                  }
                >
                  <TextField
                    variant="standard"
                    placeholder={`Nouveau dossier ... `}
                    value={dossier}
                    onChange={(e) => {
                      setDossier(e.target.value);
                    }}
                  />
                  <br />
                  <br />
                  <span style={{}}>ou</span>
                  <br />
                  <FormControl variant="standard" sx={{ minWidth: 200 }}>
                    <InputLabel id="demo-simple-select-standard-label">
                      Choisir un dossier
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={dossier}
                      onChange={(e) => {
                        setDossier(e.target.value);
                      }}
                      label="Choisir un dossier existant"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={"Informatique"}>Informatique</MenuItem>
                      <MenuItem value={"Gestion"}>Gestion</MenuItem>
                      <MenuItem value={"Anglais"}>Anglais</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <br />
                <br />
                {fileUpload && dossier ? (
                  <Button
                    variant="contained"
                    disabled={isLoadingUpload}
                    onClick={() => {
                      handleUploadFile();
                    }}
                  >
                    {isLoadingUpload ? (
                      <ReactLoading
                        type={"bubbles"}
                        color={"blue"}
                        height={20}
                        width={20}
                      />
                    ) : (
                      <SendIcon />
                    )}
                  </Button>
                ) : (
                  <Button
                    disabled
                    variant="contained"
                    style={{ backgroundColor: "#d7d7d7", color: "#9d9d9d" }}
                  >
                    <SendIcon />
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
            <MatxLoading text={`Chargement des fichiers ...`} />
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
