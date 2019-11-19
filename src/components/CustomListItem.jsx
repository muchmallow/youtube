import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import CachedIcon from "@material-ui/icons/Cached";
import AssignmentLateIcon from "@material-ui/icons/AssignmentLate";
import ShareIcon from "@material-ui/icons/Share";

const useStyles = makeStyles(() => ({
  listItemIcon: {
    minWidth: "24px",
    margin: "0 10px 0 0",
    color: "#757575"
  }
}));

const CustomListItem = ({ button, classname, primary, type }) => {
  const classes = useStyles();
  return (
    <ListItem button={button} className={classname}>
      <ListItemIcon className={classes.listItemIcon}>
        {type === "share" && <ShareIcon/>}
        {type === "unassigned" && <AssignmentLateIcon/>}
        {type === "encoding" && <CachedIcon/>}
      </ListItemIcon>
      <ListItemText primary={primary}/>
    </ListItem>
  );
};

export default CustomListItem;
