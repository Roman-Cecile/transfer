import React from 'react';

// Import Material UI
import CreateIcon from '@material-ui/icons/Create';
import { Button, Menu, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  button: {
    position: 'fixed',
    zIndex: '200',
    borderRadius: '50%',
    height: '4em',
    top: '20em',
    left: '2em',
  },
});
const MenuCreate = () => {
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
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        onClick={handleClick}
      >
        <CreateIcon />
      </Button>
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
