import React from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/core/styles"
import TreeView from "@material-ui/lab/TreeView"
import TreeItem from "@material-ui/lab/TreeItem"
import Typography from "@material-ui/core/Typography"
import MailIcon from "@material-ui/icons/Mail"
import DeleteIcon from "@material-ui/icons/Delete"
import Label from "@material-ui/icons/Label"
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount"
import InfoIcon from "@material-ui/icons/Info"
import ForumIcon from "@material-ui/icons/Forum"
import LocalOfferIcon from "@material-ui/icons/LocalOffer"
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown"
import ArrowRightIcon from "@material-ui/icons/ArrowRight"
import {
  primaryColor,
  infoColor,
  successColor,
  warningColor,
  dangerColor,
  roseColor,
  // drawerWidth,
} from "../../assets/jss/material-kit-react.js"

const useTreeItemStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.secondary,
    "&:hover > $content": {
      backgroundColor: "var(--tree-view-color)",
      color: "#fff",
    },
    "&:focus > $content, &$selected > $content": {
      //   backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
      backgroundColor: "#fff",
      color: "var(--tree-view-color)",
    },
    "&:focus > $content $label > $content $label, &$selected > $content $label": {
      backgroundColor: "transparent",
    },
  },
  content: {
    color: "#555",
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    "$expanded > &": {
      fontWeight: theme.typography.fontWeightRegular,
    },
  },
  group: {
    marginLeft: 0,
    "& $content": {
      paddingLeft: theme.spacing(1),
    },
  },
  expanded: {},
  selected: {},
  label: {
    // fontWeight: "inherit",
    color: "inherit",
    paddingLeft: "0px",
  },
  labelRoot: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0.5, 0),
  },
  labelIcon: {
    marginRight: theme.spacing(2),
  },
  labelText: {
    fontSize: "12px",
    fontWeight: "400",
    flexGrow: 1,
  },
  primary: {
    backgroundColor: primaryColor,
    color: "#FFFFFF",
  },
  info: {
    backgroundColor: infoColor,
    color: "#FFFFFF",
  },
  success: {
    backgroundColor: successColor,
    color: "#FFFFFF",
  },
  warning: {
    backgroundColor: warningColor,
    color: "#FFFFFF",
  },
  danger: {
    backgroundColor: dangerColor,
    color: "#FFFFFF",
  },
  rose: {
    backgroundColor: roseColor,
    color: "#FFFFFF",
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
  },
  white: {
    border: "0",
    padding: "0.625rem 0",
    marginBottom: "20px",
    color: "#555",
    backgroundColor: "#fff !important",
  },
}))

function StyledTreeItem(props) {
  const classes = useTreeItemStyles()
  const {
    labelText,
    labelIcon: LabelIcon,
    labelInfo,
    color,
    bgColor,
    ...other
  } = props

  return (
    <TreeItem
      label={
        <div className={classes.labelRoot}>
          <LabelIcon color="initial" className={classes.labelIcon} />
          <Typography
            color="inherit"
            variant="body2"
            className={classes.labelText}
          >
            {" "}
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </div>
      }
      style={{
        "--tree-view-color": color,
        "--tree-view-bg-color": bgColor,
      }}
      classes={{
        root: classes.root,
        content: classes.content,
        expanded: classes.expanded,
        selected: classes.selected,
        group: classes.group,
        label: classes.label,
      }}
      {...other}
    />
  )
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.elementType.isRequired,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
}

const useStyles = makeStyles({
  root: {
    height: 264,
    flexGrow: 1,
    maxWidth: 400,
  },
})

export default function MenuTreeView({ colorStyle }) {
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState([])
  const [selected, setSelected] = React.useState([])

  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds)
  }

  const handleSelect = (event, nodeIds) => {
    setSelected(nodeIds)
  }

  return (
    <TreeView
      className={classes.root}
      defaultExpanded={["3"]}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
      expanded={expanded}
      selected={selected}
      onNodeToggle={handleToggle}
      onNodeSelect={handleSelect}
    >
      <StyledTreeItem
        nodeId="1"
        labelText="Call"
        labelIcon={MailIcon}
        color="#a250f5"
        bgColor="#f3e8fd"
      >
        <StyledTreeItem
          nodeId="7"
          labelText="Call Inbound"
          labelIcon={ForumIcon}
          labelInfo="3,566"
          color="#a250f5"
          bgColor="#f3e8fd"
        />
        <StyledTreeItem
          nodeId="8"
          labelText="Call Outbound"
          labelIcon={LocalOfferIcon}
          labelInfo="733"
          color="#3c8039"
          bgColor="#e6f4ea"
        />
      </StyledTreeItem>
      <StyledTreeItem
        nodeId="2"
        labelText="MissCall"
        labelIcon={DeleteIcon}
        color="#ff4040"
        bgColor="#f3e8fd"
      />
      <StyledTreeItem
        nodeId="3"
        labelText="Agent"
        labelIcon={Label}
        color="#0000ff"
        bgColor="#f3e8fd"
      >
        <StyledTreeItem
          nodeId="5"
          labelText="Agent Status"
          labelIcon={SupervisorAccountIcon}
          labelInfo="90"
          color="#1a73e8"
          bgColor="#e8f0fe"
        />
        <StyledTreeItem
          nodeId="6"
          labelText="Agent Summary"
          labelIcon={InfoIcon}
          labelInfo="2,294"
          color="#e3742f"
          bgColor="#fcefe3"
        />
      </StyledTreeItem>
      <StyledTreeItem
        nodeId="4"
        labelText="History"
        labelIcon={Label}
        color="#468499"
        bgColor="#f3e8fd"
      />
    </TreeView>
  )
}
