import React from 'react';
import { Fab } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  button: {
    position: 'fixed',
    zIndex: '200',
    borderRadius: '50%',
    height: '4em',
    top: '30em',
    left: '2em',
  },
});

const ButtonEdit = () => {
  const classes = useStyles();
  const [active, setActive] = React.useState(true);
  window.addEventListener('keydown', (event) => {
    if (event.keyCode === 27) {
      setActive(false);
    }
  });
  return (
    <>
      <Fab
        variant="contained"
        color="secondary"
        className={classes.button}
        onClick={() => {
          window.postMessage(['edit']);
        }}
        disabled={active}
      >
        <CreateIcon />
      </Fab>
    </>
  );
};

export default ButtonEdit;
