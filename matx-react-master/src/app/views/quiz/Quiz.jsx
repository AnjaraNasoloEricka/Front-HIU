import { Stack, Button, Card } from "@mui/material";
import { Box, styled } from "@mui/system";
import { Breadcrumb, MatxLoading, SimpleCard } from "app/components";
import { useEffect, useRef, useState } from "react";
import QuizCard from "./QuizCard";
import ResultQuiz from "./ResultQuiz";

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

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MDYzOTYwYzJmNzMyZGE1N2Q0OTg3OCIsImlhdCI6MTY3ODI3NDkxNywiZXhwIjoxNjc4MzYxMzE3fQ.0bG52277kyMKk0VIHFi4vkt4twBuMFr2rUFB0oamS6c";
const url = "https://mini-hiu-2023-api.vercel.app/level-test/generate";

const Quiz = () => {
  const [isLoadingListQuiz, setIsLoadingListQuiz] = useState(true);
  const quizrep = useRef({});
  const [showResult, setShowResult] = useState(false);
  const [nbQuizz, setNbQuiz] = useState(0);
  const [bnReponse, setBnReponse] = useState(0);
  const [listquiz, setListQuiz] = useState([]);

  const initializeQuizList = () => {
    setIsLoadingListQuiz(true);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({
        subject: "mathematique",
        theme: "soustraction",
      }),
    };

    fetch(url, options)
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
      // li.forEach((quizz, index) => {
      //   if (quizz.idReponse === parseInt(quizrep.current[index])) {
      //     setBnReponse(bnReponse + 1);
      //   }
      // });
    });
    setBnReponse(totalBonnesReponses);
    setShowResult(1);
  };

  const handleChange = (e, index) => {
    quizrep.current[index].value = e.target.value;
  };

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
    if (showResult) {
      return (
        <div>
          <ResultQuiz question={quizz}></ResultQuiz>
        </div>
      );
    }
  };

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Quizz" }]} />
      </Box>
      <Stack spacing={3}>
        {showResult && (
          <Card
            style={{
              padding: 20,
              borderRadius: 0,
              backgroundColor: bnReponse >= nbQuizz/2 ? "green" : "red",
              color: "white",
            }}
          >
            {`${bnReponse}  bonnes réponses sur ${nbQuizz} questions`}
          </Card>
        )}
        {listquiz &&
          Object.keys(listquiz).map((quizkey, key) => {
            const quiz = listquiz[quizkey];
            return (
              <div key={key}>
                {renderCard(quiz, key)}
              </div>
            );
          })}
      </Stack>
      {isLoadingListQuiz && <MatxLoading />}
      {!showResult && !isLoadingListQuiz && (
        <Button variant="contained" color="primary" onClick={getResultat}>
          Valider
        </Button>
      )}
    </Container>
  );
};

export default Quiz;
