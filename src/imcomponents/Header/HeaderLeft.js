/*eslint-disable*/
import React from "react"
// react components for routing our app without refresh
import { NavLink } from "react-router-dom"

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"

// @material-ui/icons
import RecordVoiceOverIcon from "@material-ui/icons/RecordVoiceOver"
import AssessmentIcon from "@material-ui/icons/Assessment"
import SettingsIcon from "@material-ui/icons/Settings"
import ViewModuleIcon from "@material-ui/icons/ViewModule"
import { AiFillRocket } from "react-icons/ai"

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js"
import InsertChartOutlinedIcon from '@material-ui/icons/InsertChartOutlined';


const useStyles = makeStyles(styles)

export default function HeaderLinks(props) {
  const classes = useStyles()
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <NavLink to="/dashboard" color="transparent" className={classes.navLink}>
          <InsertChartOutlinedIcon  className={classes.icons} /> DASHBORD
        </NavLink>
      </ListItem>
      {/* <ListItem className={classes.listItem}></ListItem>
      <ListItem className={classes.listItem}>
        <NavLink to="/report" color="transparent" className={classes.navLink}>
          <RecordVoiceOverIcon className={classes.icons} /> RECORD
        </NavLink>
      </ListItem> */}
      <ListItem className={classes.listItem}>
        <NavLink to="/report" color="transparent" className={classes.navLink}>
          <AssessmentIcon className={classes.icons} /> REPORT
        </NavLink>
      </ListItem>
      {/* <ListItem className={classes.listItem}>
        <NavLink to="/module" color="transparent" className={classes.navLink}>
          <ViewModuleIcon className={classes.icons} /> MODULE
        </NavLink>
      </ListItem>
      <ListItem className={classes.listItem}>
        <NavLink to="/setting" color="transparent" className={classes.navLink}>
          <SettingsIcon className={classes.icons} /> SETTING
        </NavLink>
      </ListItem> */}
    </List>
  )
}
