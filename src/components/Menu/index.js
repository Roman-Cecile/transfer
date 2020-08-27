import React from 'react';

// Import Material UI
import {
  Button,
  Menu,
  MenuItem,
  Divider,
} from '@material-ui/core';
import {
  makeStyles,
  useTheme,
  withStyles,
} from '@material-ui/core/styles';
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  Gesture as GestureIcon,
} from '@material-ui/icons';

// Import Component
import CreateMenu from './Create';
import EditMenu from './Edit';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'right',
      horizontal: 'top',
    }}
    {...props}
  />
));

const useStyles = makeStyles((theme) => ({
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

const MenuFeatures = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAnchor = () => {
    setAnchorEl(null);
  };
  const actions = [
    { icon: <CreateMenu />, name: 'Create' },
    { icon: <EditMenu />, name: 'Edit' },
  ];
  const classes = useStyles();

  return (
    <>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        onClick={handleClick}
        className={classes.button}
      >
        <GestureIcon color="primary" />
        <span
          className={classes.buttonText}
        >
          features
        </span>
        <KeyboardArrowDownIcon />
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseAnchor}
      >

        {actions.map((action) => (
          <>
            <MenuItem onClick={handleCloseAnchor}>
              {action.icon}
            </MenuItem>
          </>
        ))}
      </StyledMenu>
    </>
  );
};

export default MenuFeatures;
