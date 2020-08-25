import React, { useEffect } from 'react';

// == Import material UI
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import { Slide } from '@material-ui/core';

// == Composant
import Mappy from '../../containers/Mappy';

import './styles.scss';

const useStyles = makeStyles((theme) => ({
  paperStyleLi: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  paperStyle: {
    position: 'fixed',
    bottom: '10px',
    right: '10px',
    width: '15%',
    zIndex: '20',
    padding: '0.8em',
  },
}));

const App = ({ featuresSelected, deleteFeature }) => {
  const classes = useStyles();
  return (
    <>
      <Slide in={featuresSelected.length} direction="left">
        <Paper className={featuresSelected.length ? `${classes.paperStyle} paperStyle-active` : ' paperStyle '}>
          <ul>
            {
            featuresSelected
              ? featuresSelected.map((featureName) => (
                <li
                  className={classes.paperStyleLi}
                >
                  {featureName}
                  <CancelOutlinedIcon fontSize="small" color="secondary" onClick={(event) => deleteFeature(event, featureName)} />
                </li>
              ))
              : null
          }
          </ul>
        </Paper>
      </Slide>

      <Mappy />
    </>
  );
};

// == Export
export default App;
