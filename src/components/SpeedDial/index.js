import React from 'react';
import {
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
} from '@material-ui/lab';
import {
  makeStyles,
  withStyles,
} from '@material-ui/core/styles';
import {
  Gesture as GestureIcon,
  Send as SendIcon,
  Drafts as DraftsIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
} from '@material-ui/icons';

import MenuCreate from './MenuCreate';
import ButtonEdit from './ButtonEdit';

const useStyles = makeStyles((theme) => ({
  speed: {
    margin: '2em 0.3em',
  },
  buttonText: {
    marginLeft: '1em',
    marginRight: '0.5em',
  },
  button: {
    width: '100%',
    margin: '0.5em auto',
  },
  listMenuItem: {
    display: 'flex',
    flexDirection: 'column',
  },
  menuIcon: {
    margin: '0.5em',
  },
}));

// const StyledMenuItem = withStyles((theme) => ({
//   // root: {
//   //   '&:focus': {
//   //     backgroundColor: theme.palette.primary.main,
//   //     '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
//   //       color: theme.palette.common.white,
//   //     },
//   //   },
//   // },
// }))(MenuItem);

const SpeedDialButton = ({ disabledCreate, disabledEdit, drawerState }) => {
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
      {!drawerState
        && (
          <SpeedDial
            className={classes.speed}
            ariaLabel="SpeedDial"
            icon={<GestureIcon />}
            onClose={handleClose}
            onOpen={handleOpen}
            open={open}
            direction="down"
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
        )}
    </>
  );
};

export default SpeedDialButton;
