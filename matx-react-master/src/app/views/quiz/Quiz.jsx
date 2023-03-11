import { Stack, Button, Card } from "@mui/material";
import { Box, styled } from "@mui/system";
import { Breadcrumb, MatxLoading } from "app/components";
import { useEffect, useRef, useState } from "react";
import QuizCard from "./QuizCard";
import ResultQuiz from "./ResultQuiz";
import { useParams } from "react-router-dom";
import { BASE_URL, TOKEN } from "app/config";
import { getExamDetails } from "app/apis/examApi";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const Quiz = () => {
  const myRef = useRef(null);
  const [isLoadingListQuiz, setIsLoadingListQuiz] = useState(true);
  const quizrep = useRef({});
  const [showResult, setShowResult] = useState(false);
  const [nbQuizz, setNbQuiz] = useState(0);
  const [bnReponse, setBnReponse] = useState(0);
  const [listquiz, setListQuiz] = useState([]);
  const { examId } = useParams();
  const [matiereState, setMatiereState] = useState("");
  const [themeState, setThemeState] = useState("");
  // const {examId} = useParams()
  // console.log(examId)

  const initializeQuizList = async () => {
    setShowResult(false);
    setNbQuiz(0);
    setBnReponse(0);
    setListQuiz([]);
    setIsLoadingListQuiz(true);
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

    fetch(`${BASE_URL}/level-test/generate`, options)
      .then((response) => response.json())
      .then((data) => {
        const datasList = data.datas;
        setListQuiz(datasList);
        console.log(datasList);
        setNbQuiz(Object.keys(datasList).length);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setIsLoadingListQuiz(false);
      });
  };

  useEffect(() => {
    initializeQuizList();
  }, []);

  const getResultat = () => {
    let totalBonnesReponses = 0;
    Object.keys(listquiz).forEach((quizkey, key) => {
      const quizz = listquiz[quizkey];
      if (quizz.idReponse === parseInt(quizrep.current[key].value)) {
        totalBonnesReponses += 1;
      }
    });
    setBnReponse(totalBonnesReponses);
    setShowResult(1);
  };

  const handleChange = (e, index) => {
    quizrep.current[index].value = e.target.value;
  };

  const [showResultsResponses, setShowResultsResponses] = useState(false);

  const renderCard = (quizz, index) => {
    quizrep.current[index] = {
      value: null,
    };
    if (!showResult) {
      return (
        <div>
          <QuizCard
            question={quizz}
            handleChange={handleChange}
            index={index}
          ></QuizCard>
        </div>
      );
    }
    if (showResult && showResultsResponses) {
      return (
        <>
          <div>
            <ResultQuiz question={quizz}></ResultQuiz>{" "}
          </div>
        </>
      );
    }
  };

  useEffect(() => {
    if (showResult) {
      setTimeout(() => {
        setShowResultsResponses(true);
      }, 1000);
    }
  }, [showResult]);
  return (
    <Container id="container" ref={myRef}>
      <Box className="breadcrumb">
        <Breadcrumb
          routeSegments={[{ name: `Quizz ${matiereState} - ${themeState}` }]}
        />
      </Box>
      <Stack spacing={3}>
        {showResult && (
          <>
            <Card
              style={{
                padding: 20,
                borderRadius: 0,
                backgroundColor: bnReponse >= nbQuizz / 2 ? "green" : "red",
                color: "white",
              }}
            >
              {`${bnReponse}  bonnes réponses sur ${nbQuizz} questions`}
            </Card>
          </>
        )}
        {showResult && (
          <div>
            <Button
              color="warning"
              variant="outlined"
              onClick={() => {
                initializeQuizList();
              }}
            >
              Refaire un autre quizz
            </Button>
          </div>
        )}
        {showResult && !showResultsResponses && <MatxLoading />}
        {showResult && showResultsResponses && (
          <div>
            <h1>Réponses</h1>
          </div>
        )}
        {listquiz &&
          Object.keys(listquiz).map((quizkey, key) => {
            const quiz = listquiz[quizkey];
            return <div key={key}>{renderCard(quiz, key)}</div>;
          })}
      </Stack>
      {isLoadingListQuiz && (
        <>
          <MatxLoading text={`Chargement du quizz en cours, veuillez patienter ...`} />
        </>
      )}
      {!showResult && !isLoadingListQuiz && (
        <Button
          variant="contained"
          color="success"
          style={{
            width: "100%",
            height: 70,
          }}
          onClick={() => {
            getResultat();
            // if (myRef.current) {
            //   myRef.current.scrollTo({
            //     top: 0,
            //     behavior: "smooth",
            //   });
            // } else {
            //   window.scrollTo({
            //     top: 0,
            //     behavior: "smooth",
            //   });
            // }
          }}
        >
          Valider
        </Button>
      )}
    </Container>
  );
};

export default Quiz;
