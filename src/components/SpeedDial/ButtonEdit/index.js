import React from 'react';
import { Fab } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  
});

const ButtonEdit = () => {
  const classes = useStyles();
  const [isActive, setIsActive] = React.useState(true);
  window.addEventListener('keydown', (event) => {
    if (event.keyCode === 27) {
      setIsActive(false);
    }
  });
  return (
    <>
      <Fab
        variant="extended"
        color="secondary"
        onClick={() => {
          window.postMessage(['edit']);
        }}
        disabled={isActive}
      >
        <CreateIcon />
      </Fab>
    </>
  );
};

export default ButtonEdit;
