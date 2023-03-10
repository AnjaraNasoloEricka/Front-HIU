import {
    Avatar,
    Box,
    Card,
    Checkbox,
    Container,
    Fab,
    Grid,
    Hidden,
    Icon,
    IconButton,
    styled,
    useTheme,
  } from '@mui/material';
  import { Span } from 'app/components/Typography';
  import { format } from 'date-fns';
  import { Fragment } from 'react';
  import VerifiedIcon from '@mui/icons-material/Verified';  
  const ProjectName = styled(Span)(({ theme }) => ({
    marginLeft: 24,
    fontWeight: '500',
    [theme.breakpoints.down('sm')]: { marginLeft: 4 },
  }));
  
  const StarOutline = styled(Fab)(() => ({
    marginLeft: 0,
    boxShadow: 'none',
    background: '#08ad6c !important',
    backgroundColor: 'rgba(9, 182, 109, 1) !important',
  }));
  
  const DateRange = styled(Fab)(({ theme }) => ({
    marginLeft: 0,
    boxShadow: 'none',
    color: 'white !important',
    background: `${theme.palette.error.main} !important`,
  }));
  
  const StyledAvatar = styled(Avatar)(() => ({
    width: '32px !important',
    height: '32px !important',
  }));
  
  const BadgeCard = ({allbadge}) => {
    const { palette } = useTheme();
    const textMuted = palette.text.secondary;
  
    return (
        <Container>
        {allbadge.map((badge,id) => (
        <Fragment key={id}>
            <Card sx={{ py: 1, px: 2 }} className="project-card">
            <Grid container alignItems="center">
                <Grid item md={10} xs={10}>
                <Box display="flex" alignItems="center">
                    <Hidden smDown >
                        <VerifiedIcon color="success"/>
                    </Hidden>
                    <ProjectName>{badge.nom}</ProjectName>
                </Box>
                </Grid>
                <Grid item md={2} xs={2}>
                <Box color={textMuted}>{format(badge.date, 'MM/dd/yyyy')}</Box>
                </Grid>
            </Grid>
            </Card>
            <Box py={1} />
        </Fragment>
        ))}
        </Container>
    )
  };
  
  export default BadgeCard;
  