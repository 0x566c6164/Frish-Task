import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Team from './team';
import service from '../services';

export default function Scenario() {
  const classes = useStyles();
  const [scenario, setScenario] = useState();

  useEffect(() => {
    service.getData().then((res) => setScenario(res));
  }, []);

  const renderTeams = () => {
    if (!scenario) return <CircularProgress />;

    return (
      <div className={classes.contentContainer}>
        <Typography variant='h1'>{scenario.campaign_name}</Typography>
        <div className={classes.teamContainer}>
          {scenario.team_instances.map((team) => (
            <Team
              key={team.team_id}
              steps={team.steps}
              team_id={team.team_id}
              team_name={team.team_name}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <CssBaseline />
      <div className={classes.root}>
        <Container className={classes.container}>{renderTeams()}</Container>
      </div>
    </>
  );
}

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: '100%',
    color: '#fff',
    backgroundColor: '#282c34',
  },
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '28px',
  },
  contentContainer: { display: 'flex', flexDirection: 'column' },
  teamContainer: {
    display: 'flex',
    paddingTop: '28px',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));
