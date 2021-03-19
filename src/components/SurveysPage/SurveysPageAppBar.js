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

function SurveysPageAppBar(props) {
  const [appBarMenuAnchorEl, setAppBarMenuAnchorEl] = useState(null);

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
          <div className="toolbar-links">
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
