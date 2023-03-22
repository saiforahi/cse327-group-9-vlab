import * as React from "react";
import { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { styled, useTheme } from "@material-ui/core/styles";
import MuiDrawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import StarBorder from "@material-ui/icons/StarBorder";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { useDispatch, useSelector } from "react-redux";
import { changeState } from "../../store/slices/DrawerSlice";
import { drawerWidth } from "../../Config";
import DashBoardIconFigma from "../../assets/icons/dashboard-icon.svg";
import Icon from "@material-ui/core/Icon";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import { useHistory, useLocation } from "react-router-dom";
import "./MatSideBar.css";
const openedMixin = (theme) => ({
  width: drawerWidth,

  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
const DrawerFooter = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  marginBottom: "0px",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {

  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
const useStyles = makeStyles((theme) => ({

  root: {

    width: "100%",
    maxWidth: 360,
    backgroundColor: "theme.palette.background.paper",
  },
  nested: {
    paddingLeft: " theme.spacing(4)",
  },

}));
export default function MatSideBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const classes = useStyles();
  const theme = useTheme();
  const open = useSelector((state) => state.drawer.open);
  const dispatch = useDispatch();
  let history = useHistory();
  let location = useLocation();
  const [opening, setOpen] = useState(true);
  const [opening2, setOpen2] = useState(true);
  const handleClickProjects = () => {
    setOpen(!opening);
  };
  const handleClickWBS = () => {
    setOpen2(!opening2);
  }
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleDrawerClose = () => {
    dispatch(changeState(open ? false : true));
  };
  React.useEffect(() => {
    console.log(location.pathname);
  }, [location]);
  return (
    <>
      {/**Desktop menu */}
      <Drawer variant="permanent" open={open}
        className="custom-drawer">
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {/* Logo */}
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>

        <List>
          <ListItem
            className="custom-list-item"
            button
            onClick={() => {
              history.push("/dashboard");
            }}
            selected={location.pathName == "/dashboard" ? true : false}
          >
            <ListItemIcon>
              {/* <DashboardRoundedIcon/> */}
              {/* <Icon><img src={DashBoardIconFigma}/></Icon> */}
              <img src={DashBoardIconFigma} />
            </ListItemIcon>
            <ListItemText primary={"Dashboard"} />
          </ListItem>
          {/**Projects */}
          <ListItem button onClick={handleClickProjects}>
            {/* <ListItem button onClick={()=>{history.push('/dashboard/ongoing-project-details-view')}} selected={location.pathName == "/dashboard/ongoing-project-details-view"?true:false}> */}

            <ListItemIcon>
              {/* <DashboardRoundedIcon/> */}
              {/* <Icon><img src={DashBoardIconFigma}/></Icon> */}
              <img src={DashBoardIconFigma} />
            </ListItemIcon>
            <ListItemText primary="Projects" />
            {opening ? <ExpandMore /> : <ExpandLess />}
          </ListItem>
          {/*Projects sub routes*/}
          <Collapse in={!opening} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {/**Ongoing project */}
              <ListItem
                button
                className={classes.nested}
                onClick={() => {
                  history.push(
                    "/dashboard/Projects/ongoing-project-details-view"
                  );
                }}
                selected={
                  location.pathName ==
                    "/dashboard/Projects/ongoing-project-details-view"
                    ? true
                    : false
                }
              >
                <ListItemIcon>
                  <RadioButtonCheckedIcon />
                </ListItemIcon>
                <ListItemText primary="Ongoing" />
              </ListItem>
              {/**Completed Project */}
              <ListItem
                button
                className={classes.nested}
                onClick={() => {
                  history.push("/dashboard/Projects/completed-projects");
                }}
                selected={
                  location.pathName == "/dashboard/Projects/completed-projects"
                    ? true
                    : false
                }
              >
                <ListItemIcon>
                  <RadioButtonCheckedIcon />
                </ListItemIcon>
                <ListItemText primary="Completed" />
              </ListItem>
              {/**Create a new project */}
              <ListItem
                button
                className={classes.nested}
                onClick={() => {
                  history.push("/dashboard/Projects/create-new-project");
                }}
                selected={
                  location.pathName == "/dashboard/Projects/create-new-project"
                    ? true
                    : false
                }
              >
                <ListItemIcon>
                  <RadioButtonCheckedIcon />
                </ListItemIcon>
                <ListItemText primary="Create Project" />
              </ListItem>
            </List>
          </Collapse>
          {/**Meetings */}
          <ListItem
            button
            onClick={() => {
              history.push("/dashboard/meetings");
            }}
            selected={location.pathName == "/dashboard/meetings" ? true : false}
          >
            <ListItemIcon>
              <img src={DashBoardIconFigma} />
            </ListItemIcon>
            <ListItemText primary={"Meetings"} />
          </ListItem>
          {/*WBS*/}
          <ListItem
            button
            onClick={handleClickWBS}
          >
            <ListItemIcon>
              <img src={DashBoardIconFigma} />
            </ListItemIcon>
            <ListItemText primary={"WBS"} />
            {opening2 ? <ExpandMore /> : <ExpandLess />}
          </ListItem>
          {/**WBS Subroutes */}
          <Collapse in={!opening2} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {/**Create WBS */}
              <ListItem
                button
                className={classes.nested}
                onClick={() => {
                  history.push(
                    "/dashboard/WBS/create-wbs"
                  );
                }}
                selected={
                  location.pathName ==
                    "/dashboard/WBS/create-wbs"
                    ? true
                    : false
                }
              >
                <ListItemIcon>
                  <RadioButtonCheckedIcon />
                </ListItemIcon>
                <ListItemText primary="Create WBS" />
              </ListItem>
              {/**BOARD */}
              <ListItem
                button
                className={classes.nested}
                onClick={() => {
                  history.push("/dashboard/WBS/board");
                }}
                selected={
                  location.pathName == "/dashboard/WBS/board"
                    ? true
                    : false
                }
              >
                <ListItemIcon>
                  <RadioButtonCheckedIcon />
                </ListItemIcon>
                <ListItemText primary="Board" />
              </ListItem>

            </List>
          </Collapse>
          {/**EVMS */}
          <ListItem
            button
            onClick={() => {
              history.push("/dashboard/EVMS");
            }}
            selected={location.pathName == "/dashboard/EVMS" ? true : false}
          >
            <ListItemIcon>
              <img src={DashBoardIconFigma} />
            </ListItemIcon>
            <ListItemText primary={"EVMS"} />
          </ListItem>
          {/**Profile */}
          <ListItem
            button
            onClick={() => {
              history.push("/dashboard/profile");
            }}
            selected={location.pathName == "/dashboard/profile" ? true : false}
          >
            <ListItemIcon>
              <img src={DashBoardIconFigma} />
            </ListItemIcon>
            <ListItemText primary={"Profile"} />
          </ListItem>
          {/**Time card */}
          <ListItem
            button
            onClick={() => {
              history.push("/dashboard/timecards");
            }}
            selected={location.pathName == "/dashboard/timecards" ? true : false}
          >
            <ListItemIcon>
              <img src={DashBoardIconFigma} />
            </ListItemIcon>
            <ListItemText primary={"Timecards"} />
          </ListItem>
          {/**Shared Docs */}
          <ListItem
            button
            onClick={() => {
              history.push("/dashboard/shared-documents");
            }}
            selected={
              location.pathName == "/dashboard/shared-documents" ? true : false
            }
          >
            <ListItemIcon>
              <img src={DashBoardIconFigma} />
            </ListItemIcon>
            <ListItemText primary={"Shared Docs"} />
          </ListItem>
        </List>
      </Drawer>

      {/**mobile drawer */}


    </>
  );
}
