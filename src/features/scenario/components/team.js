import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const STEPSIZE = 136;

export default function Team({ steps, team_name }) {
  const classes = useStyles();
  const [stepsPos, setStepsPos] = useState(0);

  const renderSteps = () => {
    if (steps.length === 0)
      return (
        <Typography style={{ margin: '0 auto' }}>No Steps Found</Typography>
      );

    return steps.map((step) => {
      let stepType;
      if (step.status === 'done') stepType = '#4caf50';
      if (step.status === 'in_progress') stepType = '#d32f2f';
      if (step.status === 'not_started') stepType = '#3f51b5';

      return (
        <div
          key={step.step_id}
          className={classes.step}
          style={{
            backgroundColor: stepType,
            transform: `translate(${stepsPos}px, 0)`,
          }}>
          <Typography className={classes.stepName}>{step.step_name}</Typography>
        </div>
      );
    });
  };

  const renderPagination = () => {
    if (steps.length > 3) {
      return (
        <div className={classes.pagination}>
          <ArrowBackIosIcon
            className={classes.arrow}
            onClick={() => move(0)}
            style={{ color: stepsPos ? 'black' : '#d5d2d2' }}
          />
          <ArrowForwardIosIcon
            className={classes.arrow}
            onClick={() => move(1)}
            style={{
              color:
                stepsPos - STEPSIZE - 273 < steps.length * -STEPSIZE
                  ? '#d5d2d2'
                  : 'black',
            }}
          />
        </div>
      );
    }
  };

  const move = (direction) => {
    if (direction) {
      // Move Forward
      if (stepsPos - STEPSIZE - 273 < steps.length * -STEPSIZE) return;
      setStepsPos(stepsPos - STEPSIZE);
    } else {
      // Move Back
      if (stepsPos + STEPSIZE > 0) return;
      setStepsPos(stepsPos + STEPSIZE);
    }
  };

  return (
    <Card className={classes.root} raised variant='outlined'>
      <Typography variant='body1' className={classes.title}>
        {team_name}
      </Typography>
      <Divider orientation='vertical' flexItem />
      <div className={classes.contentContainer}>
        <div className={classes.stepContainer}> {renderSteps()}</div>
        {renderPagination()}
      </div>
    </Card>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '600px',
    height: '100%',
    padding: '8px',
    margin: '14px',
    display: 'flex',
    margin: '20px auto',
  },
  title: {
    margin: 'auto 0',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '150px',
    minWidth: '150px',
    fontWeight: '600',
  },
  contentContainer: {
    overlfow: 'hidden',
  },
  stepContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    transition: 'all 1s',
    overflow: 'hidden',
    maxWidth: '400px',
    minWidth: '400px',
  },
  step: {
    borderRadius: '50%',
    width: '100px',
    height: '100px',
    display: 'flex',
    alignItems: 'center',
    margin: '0 18px',
  },
  stepName: {
    width: '150px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    padding: '8px',
    margin: 'auto 0',
    textAlign: 'center',
    fontSize: '0.9em',
    fontWeight: '600',
    color: '#fff',
  },
  pagination: {
    margin: '10px 0',
    display: 'flex',
    justifyContent: 'space-around',
  },
  arrow: {
    cursor: 'pointer',
  },
}));
