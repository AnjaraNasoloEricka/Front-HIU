import { Box, styled, Icon, Button } from "@mui/material";
import { getExamDetails } from "app/apis/examApi";
import { Breadcrumb, MatxLoading, SimpleCard } from "app/components";
import { BASE_URL, TOKEN } from "app/config";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const Lessons = () => {
  const { examId } = useParams();
  const [isLoadingLessonsList, setIsLoadingLessonsList] = useState(false);
  const [matiereState, setMatiereState] = useState("");
  const [themeState, setThemeState] = useState("");
  const [lessonsList, setLessonsList] = useState([]);

  const initializeLessonsList = async () => {
    setIsLoadingLessonsList(true);
    // Getting exam details
    const examDetails = await getExamDetails(examId);
    const matiere = examDetails.matiere;
    const theme = examDetails.theme;
    setMatiereState(`${matiere}`);
    setThemeState(`${theme}`);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": TOKEN,
      },
      body: JSON.stringify({
        subject: `${matiere}`,
        theme: `${theme}`,
      }),
    };

    fetch(`${BASE_URL}/lesson/generate`, options)
      .then((response) => response.json())
      .then((data) => {
        const datasList = data.datas;
        console.log(datasList);
        setLessonsList(datasList);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setIsLoadingLessonsList(false);
      });
  };
  useEffect(() => {
    initializeLessonsList();
  }, []);
  return (
    <div>
      <Container>
        <Box className="breadcrumb">
          <Breadcrumb
            routeSegments={[
              {
                name: `Leçons | ${matiereState} - ${themeState}`,
                path: `/exams/${examId}/lessons`,
              },
            ]}
          />
        </Box>
        <div>
          <Button
            color="warning"
            variant="outlined"
            style={{
              marginBottom: 10
            }}
            onClick={() => {
              if(!isLoadingLessonsList){
                initializeLessonsList();
              }
            }}
          >
            {isLoadingLessonsList ? (
              <MatxLoading />
            ) : (
              <>
                <Icon
                  style={{
                    marginRight: 10,
                  }}
                >
                  language
                </Icon>{" "}
                Rafraichir
              </>
            )}
          </Button>
        </div>
        <SimpleCard title="">
          {isLoadingLessonsList ? (
            <>
              <MatxLoading text={`Chargement de la liste des leçons ...`} />
            </>
          ) : (
            <>
              {lessonsList &&
                lessonsList.map((lesson, key) => {
                  const suggestedWebsites = lesson?.suggestedWebsites;
                  return (
                    <div key={key}>
                      <h3
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Icon style={{ marginRight: 20 }}>language</Icon>{" "}
                        {lesson?.lessonTitle}
                      </h3>
                      <div style={{ marginLeft: 50 }}>
                        <h4 style={{ color: "grey" }}>Sites webs suggérés</h4>
                        {suggestedWebsites &&
                          suggestedWebsites.map((website, key) => {
                            return (
                              <SimpleCard
                                onClick={() => {
                                  window.open(`${website?.title}`, "_blank");
                                }}
                                key={key}
                                title={website?.title}
                                style={{ marginBottom: 20, cursor: "pointer" }}
                              >
                                <a
                                  style={{
                                    color: "blue",
                                    textDecoration: "underline",
                                  }}
                                  href={website?.link}
                                  rel="noreferrer"
                                  target="_blank"
                                >
                                  {website?.link}
                                </a>
                              </SimpleCard>
                            );
                          })}
                      </div>
                    </div>
                  );
                })}
            </>
          )}
          {/* <PaginationTablePublication publications={pubs} /> */}
        </SimpleCard>
      </Container>
    </div>
  );
};

export default Lessons;
