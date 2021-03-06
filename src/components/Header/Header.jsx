import React from 'react';
import { Link } from 'react-router-dom';

// set up for styling
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import { pink } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  pink: {
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: pink[500],
  },
}));

function Header() {
const classes = useStyles();
// handle menu button in local state
const [open, setOpen] = React.useState(false);
const anchorRef = React.useRef(null);

// handle menu button open
const handleToggle = () => {
  setOpen((prevOpen) => !prevOpen);
};

// handle menu button close
const handleClose = (event) => {
  if (anchorRef.current && anchorRef.current.contains(event.target)) {
    return;
  }

  setOpen(false);
};

// menu button drop down
function handleListKeyDown(event) {
  if (event.key === 'Tab') {
    event.preventDefault();
    setOpen(false);
  }
}

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
        <Badge anchorOrigin={{vertical: 'top', horizontal:'right',}} color="secondary" badgeContent={1}>
          <IconButton 
            edge="start" 
            ref={anchorRef}
            className={classes.menuButton} 
            color="inherit" 
            aria-label= "menu" 
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}>
            <MenuIcon />
          </IconButton>
          </Badge>
          <Popper placement="bottom-start" open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem onClick={handleClose}><Link to ='/'>Home</Link></MenuItem>
                    <MenuItem onClick={handleClose}><Link to ='/admin'>Admin</Link></MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
          <Typography 
            variant="h6" 
            className={classes.title}>
            Feedback
          </Typography>
          <Avatar className={classes.pink}>A</Avatar>
          <Button color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;