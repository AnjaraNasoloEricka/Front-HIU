import { Card, Container, Grid, styled, useTheme } from '@mui/material';
import { SimpleCard } from 'app/components';
import StatChart from 'app/components/MatxChart/StatChart';
import BadgeCard from 'app/components/MatxRowCard/BadgeCard';
import { Fragment } from 'react';
import Campaigns from './shared/Campaigns';
import DoughnutChart from './shared/Doughnut';
import RowCards from './shared/RowCards';
import StatCards from './shared/StatCards';
import StatCards2 from './shared/StatCards2';
import TopSellingTable from './shared/TopSellingTable';
import UpgradeCard from './shared/UpgradeCard';

const allbadge=[
    {nom:"Premier Test",date:new Date()},
    {nom:"Gourou des Etudes",date:new Date()},
    {nom:"Génie",date:new Date()},
    {nom:"Génie Max",date:new Date()},
]

const ContentBox = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
}));

const Title = styled('span')(() => ({
  fontSize: '1rem',
  fontWeight: '500',
  marginRight: '.5rem',
  textTransform: 'capitalize',
}));

const SubTitle = styled('span')(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
}));

const H4 = styled('h4')(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: '500',
  marginBottom: '16px',
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
}));

const Analytics = () => {
  const { palette } = useTheme();
  const theme = useTheme();

  return (
    <Container>
      <ContentBox>
        <Grid container spacing={3}>
          <Grid item lg={8} md={8} sm={12} xs={12}>
          <Card sx={{ px: 3, py: 2, mb: 3 }}>
              <Title>Suivi de progression</Title>
              <br/>
              <br/>
              <StatChart/>
          </Card>
            <H4>Mes badges de réalisation</H4>
            <BadgeCard allbadge={allbadge}/>
          </Grid>

          <Grid item lg={4} md={4} sm={12} xs={12}>
            <Card sx={{ px: 3, py: 2, mb: 3 }}>
              <Title>Statistiques examen</Title>
              <DoughnutChart
                height="300px"
                color={[palette.primary.dark, palette.primary.main, palette.primary.light]}
              />
            </Card>
            <UpgradeCard />
          </Grid>
        </Grid>
      </ContentBox>
    </Container>
  );
};

export default Analytics;
