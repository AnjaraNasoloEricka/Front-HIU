import { Card, Container } from '@mui/material';
import { useTheme } from '@mui/system';
import ReactEcharts from 'echarts-for-react';
import SimpleCard from 'app/components/SimpleCard';

const StatChart = () => {
  const theme = useTheme();
  const height="350px";
  const color=[theme.palette.primary.main, theme.palette.primary.light];

  const option = {
    grid: { top: '10%', bottom: '10%', left: '5%', right: '5%' },
    legend: {
      itemGap: 20,
      icon: 'circle',
      textStyle: { color: theme.palette.text.secondary, fontSize: 13, fontFamily: 'roboto' },
    },
    xAxis: {
      type: 'category',
      data: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        fontSize: 14,
        fontFamily: 'roboto',
        color: theme.palette.text.secondary,
      },
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: {
        lineStyle: { color: theme.palette.text.secondary, opacity: 0.15 },
      },
      axisLabel: { color: theme.palette.text.secondary, fontSize: 13, fontFamily: 'roboto' },
    },
    series: [
      {
        data: [30, 40, 20, 50, 40, 80, 90],
        type: 'line',
        stack: 'Ce mois-ci',
        name: 'Ce mois-ci',
        smooth: true,
        symbolSize: 4,
        lineStyle: { width: 4 },
      },
      {
        data: [20, 50, 15, 50, 30, 70, 95],
        type: 'line',
        stack: 'Le mois dernier',
        name: 'Le mois dernier',
        smooth: true,
        symbolSize: 4,
        lineStyle: { width: 4 },
      },
    ],
  };

  return (
      <ReactEcharts style={{ height: height }} option={{ ...option, color: [...color] }} />
  );
};

export default StatChart;
