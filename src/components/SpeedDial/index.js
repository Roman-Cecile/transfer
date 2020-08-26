import React from 'react';
// import { RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import {SpeedDial, SpeedDialIcon, SpeedDialAction} from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import MenuCreate from '../MenuCreate';
import ButtonEdit from '../ButtonEdit';


const useStyles = makeStyles((theme) => ({
  speedDial: {
    position: 'fixed',
    left: '2em',
    bottom: '3em',
  },
}));

const SpeedDialButton = ({disabledCreate, disabledEdit}) => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const actions = [
    { icon: <MenuCreate disabled={disabledCreate} />, name: 'Create' },
    { icon: <ButtonEdit disabled={disabledEdit} />, name: 'Edit' },
  ];
  const classes = useStyles();
  return (
    <>
      <SpeedDial
        ariaLabel="SpeedDial example"
        className={classes.speedDial}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        direction="up"
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={handleClose}
          />
        ))}
      </SpeedDial>
    </>
  );
};

export default SpeedDialButton;
