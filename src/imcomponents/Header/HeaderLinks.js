/*eslint-disable*/
import React from "react"
import DeleteIcon from "@material-ui/icons/Delete"
import IconButton from "@material-ui/core/IconButton"
// react components for routing our app without refresh
import { Link } from "react-router-dom"

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import Tooltip from "@material-ui/core/Tooltip"
// @material-ui/icons
import AccountCircleIcon from "@material-ui/icons/AccountCircle"
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js"
import Button from "components/CustomButtons/Button.js"
import { Redirect } from "react-router-dom";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js"

const useStyles = makeStyles(styles)

export default function HeaderLinks(props) {
  const handleLogout =()=>{
    localStorage.removeItem('tokenId');
    return <Redirect to={'/login'} />
  }

  const classes = useStyles()
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="ADMIN"
          buttonProps={{
            className: classes.navLink,
            color: "transparent",
          }}
          buttonIcon={AccountCircleIcon}
          dropdownList={[
            // <Link to="/" className={classes.dropdownLink}>
            //   <PermContactCalendarIcon className={classes.icons} />
            //   Setting Profile
            // </Link>,
            <Link onClick={handleLogout} className={classes.dropdownLink}>
              <ExitToAppIcon className={classes.icons} /> Logout
            </Link>,
          ]}
        />
      </ListItem>
      {/* <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-tooltip"
          title="SIGN IN / SIGN UP"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.instagram.com/CreativeTimOfficial?ref=creativetim"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fas fa-sign-in-alt"} />
          </Button>
        </Tooltip>
      </ListItem> */}
    </List>
  )
}
