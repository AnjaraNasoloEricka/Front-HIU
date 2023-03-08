import { Stack, Button } from '@mui/material';
import { Box, styled } from '@mui/system';
import { Breadcrumb, SimpleCard } from 'app/components';
import { useEffect, useRef, useState } from 'react';
import QuizCard from './QuizCard';
import ResultQuiz from './ResultQuiz';

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MDYzOTYwYzJmNzMyZGE1N2Q0OTg3OCIsImlhdCI6MTY3ODI3NDkxNywiZXhwIjoxNjc4MzYxMzE3fQ.0bG52277kyMKk0VIHFi4vkt4twBuMFr2rUFB0oamS6c';
const url = 'https://mini-hiu-2023-api.vercel.app/level-test/generate';

const Quiz = () => {
  const quizrep = useRef({});
  const [etat,setEtat]=useState(0);
  const [nbQuizz,setNbQuiz]=useState(0);
  const[bnReponse,setBnReponse]=useState(0);
  const [listquiz, setList] = useState([]);



  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token,
    },
    body: JSON.stringify({
      subject: 'mathematique',
      theme: 'limite',
    }),
  };
  useEffect(() => {
    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setList(data);
        Object.keys(listquiz).map((quizkey, key) => {
            const li = listquiz[quizkey];
            console.log("Voici le nombre "+li.length);
            setNbQuiz(li.length)
        })
       
      })
      .catch((error) => console.error(error));
  }, []);

  const resultat = () => {
    Object.keys(listquiz).map((quizkey, key) => {
    const li = listquiz[quizkey];
    li.map((quizz, index) => {
       console.log("huhuhu");
            if(quizz.idReponse== parseInt(quizrep.current[index])){            
                    setBnReponse(bnReponse+1);
            }
      })  
    })
    setEtat(1);

  };

  const handleChange = (e, index) => {
    quizrep.current[index].value = e.target.value;
  };

  const renderCard = (quizz, index) => {
    quizrep.current[index] = {
      value: 0,
    };
    if(etat==0){
        return (
            <div>
              <QuizCard question={quizz} handleChange={handleChange} index={index}></QuizCard>
          
            </div>
          );
    }
    if(etat==1){
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
        <Breadcrumb routeSegments={[{ name: 'Material', path: '/material' }, { name: 'Radio' }]} />
      </Box>

      <Stack spacing={3}>
        {etat==1 &&
                <SimpleCard title={bnReponse+" bonnes réponses sur"+nbQuizz+" questions"}></SimpleCard>
        }
        
        {Object.keys(listquiz).map((quizkey, key) => {
          const li = listquiz[quizkey];
          setNbQuiz(li.length);
       
          return (
            <div>
              {li.map((quizz, index) => {
                return renderCard(quizz, index);
              })}
            </div>
          );
        })}
      </Stack>
        {etat==0 &&
            <Button variant="contained" color="primary" onClick={resultat}>
                 Primary
            </Button>
        }
     
    </Container>
  );
};

export default Quiz;
