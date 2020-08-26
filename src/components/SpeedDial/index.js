import React from 'react';
// import { RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import {SpeedDial, SpeedDialIcon, SpeedDialAction} from '@material-ui/lab';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { makeStyles } from '@material-ui/core/styles';
import MenuCreate from '../MenuCreate';
import ButtonEdit from '../ButtonEdit';


const useStyles = makeStyles((theme) => ({
  speedDial: {
    position: 'fixed',
    left: '2em',
    bottom: '3em'
    // '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
    //   bottom: theme.spacing(2),
    //   right: theme.spacing(2),
    // },
    // '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
    //   top: theme.spacing(2),
    //   left: theme.spacing(2),
    // },
  },
}));

const SpeedDialButton = ({disabledCreate, disabledEdit}) => {
  const [direction, setDirection] = React.useState('up');
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
        direction={direction}
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
