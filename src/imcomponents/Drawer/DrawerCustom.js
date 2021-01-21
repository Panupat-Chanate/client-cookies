import React from "react"
import clsx from "clsx"
import { makeStyles } from "@material-ui/core/styles"
import Drawer from "@material-ui/core/Drawer"
// import AppBar from "@material-ui/core/AppBar"
// import Toolbar from "@material-ui/core/Toolbar"
// import List from "@material-ui/core/List"
import Divider from "@material-ui/core/Divider"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
// import ListItem from "@material-ui/core/ListItem"
// import ListItemIcon from "@material-ui/core/ListItemIcon"
// import ListItemText from "@material-ui/core/ListItemText"
import Lot from "../lottie/index"
// import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js"
// import { VscCallIncoming, VscCallOutgoing } from "react-icons/vsc"
// import { ImUserTie } from "react-icons/im"
// import { FiPhoneMissed } from "react-icons/fi"
import {
  primaryColor,
  infoColor,
  successColor,
  warningColor,
  dangerColor,
  roseColor,
  // drawerWidth,
} from "../../assets/jss/material-kit-react.js"
import DrawerList from "./DrawerList"

const drawerWidth = 200

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: -5,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(7) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    // ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0, 1),
  },

  listItemText: {
    fontSize: "0.7em", //Insert your required size
  },
  primary: {
    backgroundColor: primaryColor,
    color: "#FFFFFF",
    boxShadow:
      "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(156, 39, 176, 0.46)",
  },
  info: {
    backgroundColor: infoColor,
    color: "#FFFFFF",
    boxShadow:
      "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(0, 188, 212, 0.46)",
  },
  success: {
    backgroundColor: successColor,
    color: "#FFFFFF",
    boxShadow:
      "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(76, 175, 80, 0.46)",
  },
  warning: {
    backgroundColor: warningColor,
    color: "#FFFFFF",
    boxShadow:
      "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(255, 152, 0, 0.46)",
  },
  danger: {
    backgroundColor: dangerColor,
    color: "#FFFFFF",
    boxShadow:
      "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(244, 67, 54, 0.46)",
  },
  rose: {
    backgroundColor: roseColor,
    color: "#FFFFFF",
    boxShadow:
      "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(233, 30, 99, 0.46)",
  },
  transparent: {
    backgroundColor: "transparent !important",
    boxShadow: "none",
    paddingTop: "25px",
    color: "#FFFFFF",
  },
  dark: {
    color: "#FFFFFF",
    backgroundColor: "#212121 !important",
    boxShadow:
      "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(33, 33, 33, 0.46)",
  },
  white: {
    border: "0",
    padding: "0.625rem 0",
    marginBottom: "20px",
    color: "#555",
    backgroundColor: "#fff !important",
    boxShadow:
      "0 4px 18px 0px rgba(0, 0, 0, 0.12), 0 7px 10px -5px rgba(0, 0, 0, 0.15)",
  },
}))

export default function MiniDrawer({ colorStyle }) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes[colorStyle]]: true,
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <Lot height={40} width={50} animationData="reportLogo" />
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton, {
            [classes.hide]: open,
          })}
        >
          <MenuIcon />
        </IconButton>
      </div>
      <Divider />
      {/* <List dense={true}>
        <ListItem button key={"Call In Report"}>
          <ListItemIcon>
            <VscCallIncoming />
          </ListItemIcon>
          <ListItemText primary={"Call In Report"} />
        </ListItem>
        <ListItem button key={"Call Out Report"}>
          <ListItemIcon>
            <VscCallOutgoing />
          </ListItemIcon>
          <ListItemText primary={"Call Out Report"} />
        </ListItem>
        <ListItem button key={"Miss Call Report"}>
          <ListItemIcon>
            <FiPhoneMissed />
          </ListItemIcon>
          <ListItemText primary={"Miss Call Report"} />
        </ListItem>
        <ListItem button key={"Agent Report"}>
          <ListItemIcon>
            <ImUserTie />
          </ListItemIcon>
          <ListItemText primary={"Agent Report"} />
        </ListItem>
      </List> */}
      <DrawerList colorStyle={colorStyle} />
    </Drawer>
  )
}
