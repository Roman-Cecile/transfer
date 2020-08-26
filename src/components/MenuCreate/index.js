import React from 'react';

// Import Material UI
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import { Fab, Menu, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  button: {
    top: '20em',
    left: '2em',
    zIndex: '200',
  },
});
const MenuCreate = ({disabled}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  window.addEventListener('keydown', (event) => {
    if (event.keyCode === 27) {
      window.postMessage(['escape']);
    }
  });
  const classes = useStyles();
  return (
    <>
      <Fab
        variant="contained"
        color="secondary"
        aria-label="add"
        className={classes.button}
        onClick={handleClick}
        disabled={disabled}
      >
        <ControlPointIcon />
      </Fab>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            window.postMessage(['select', 'Point']);
          }}
          id="Point"
        >
          Point
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            window.postMessage(['select', 'LineString']);
          }}
          id="Line"
        >
          Line
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            window.postMessage(['select', 'Polygon']);
          }}
          id="Polygon"
        >
          Polygon
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            window.postMessage(['select', 'Circle']);
          }}
          id="Circle"
        >
          Circle
        </MenuItem>
      </Menu>

    </>
  );
};

export default MenuCreate;
