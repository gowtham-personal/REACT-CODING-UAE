import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

export const NyTimesStyles = (arg) => {
  console.log(arg);
  return makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginTop: 20,
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
    cardRoot: {
      minWidth: 275,
      minHeight: 150,
      backgroundColor: "antiquewhite",
      display: "flex",
      flexDirection: "column",
      cursor: arg ? "auto" : "pointer",
    },
    bullet: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)",
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    avatar: {
      backgroundColor: red[500],
      zIndex: 1,
    },
    cardFooter: {
      position: "relative",
      marginTop: "auto",
    },
    footerLink: {
      position: "absolute",
      bottom: 5,
      right: 10,
    },
    search: { width: 400, zIndex: 100 },
    loader: { color: "grey.500", marginTop: 100, textAlign: "center" },
    pagination: { marginTop: 10, marginLeft: 100 },
  }));
};
