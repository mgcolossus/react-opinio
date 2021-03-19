import React, {useState} from "react";
import {
  Button,
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { useAuth } from "./../../contexts/AuthContext";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  toolbarLinks: {
    display: "flex",
    justifyContent: "flex-end",
    flex: "1 1 100%"
  }
}));

function SurveysPageAppBar(props) {
  const [appBarMenuAnchorEl, setAppBarMenuAnchorEl] = useState(null);
  const classes = useStyles();
  const { logOut, currentUser } = useAuth();

  const openAppBarMenu = (e) => {
    setAppBarMenuAnchorEl(e.currentTarget);
  };

  const closeAppBarMenu = () => {
    setAppBarMenuAnchorEl(null);
  };
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <div className={classes.toolbarLinks}>
            <Button onClick={openAppBarMenu} color="inherit" startIcon={<AccountCircle />}>
              {currentUser.name}
            </Button>
            <Menu
              anchorEl={appBarMenuAnchorEl}
              keepMounted
              open={Boolean(appBarMenuAnchorEl)}
              onClose={closeAppBarMenu}>
              <MenuItem
                onClick={() => {
                  closeAppBarMenu();
                  logOut();
                }}>
                Log out
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default SurveysPageAppBar;
