import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
// import deepPurple from "@material-ui/core/colors/deepPurple";
import indigo from "@material-ui/core/colors/indigo";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
// import GridListTileBar from "@material-ui/core/GridListTileBar";
// import ListSubheader from "@material-ui/core/ListSubheader";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
// import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
// import InfoIcon from "@material-ui/icons/Info";
// import MenuIcon from "@material-ui/icons/Menu";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Paper from "@material-ui/core/Paper";

import moment from "moment";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: "100%",
    height: "100%"
  },
  gridHeaderTile: {
    background: "#ede7f6"
  },
  gridTile: {
    background: "#ede7f6",
    "&&:selected": {
      background: indigo[200]
    }
  },
  selected: {
    background: indigo[200]
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary,
    "&:hover": {
      background: indigo[100]
    }
  },
  headerTile: {
    background: indigo[300] + " !important",
    color: indigo[50]
  },
  disabled: {
    background: "#f9f9f9",
    color: "#b7b7b7",
    "&:hover": {
      background: indigo[50]
    }
  },
  icon: {
    // color: "rgba(255, 255, 255, 0.54)"
  }
});

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

// const CalendarTile = ({ tile }) => {
//   if (tile.state === "disabled") {
//     return (
//       <Paper square="true">{tile.title}</Paper>
//       // <div>
//       //   <p>{tile.title}</p>
//       //   <span>{tile.select? "selected" : ""}</span>
//       // </div>
//     );
//   }

//   return (
//     <GridListTileBar
//         title={tile.title}
//         subtitle={<span>{tile.subtitle}</span>}
//         // actionIcon={
//         //   <IconButton className={classes.icon}>
//         //     <MenuIcon />
//         //   </IconButton>
//         // }
//       />
//   );
// };

class CalendarGrid extends React.Component {
  constructor(props) {
      // let imageList = props.imageList
    super(props);
    this.state = {
      date: moment(),
      mode: "default",
      tiles: []
    };
    this.calendarDateManager = new CalendarDateManager();
    this.grids = {};
  }

  toPreviousMonth() {
    const current = this.state.date;
    this.setState({
      date: current.clone().subtract(1, "months")
    });
  }

  toNextMonth() {
    const current = this.state.date;
    this.setState({
      date: current.clone().add(1, "months")
    });
  }

  handleTileClick(event, tile, selected) {
    tile.select = selected || !tile.select;
    this.setState({ state: this.state });
    console.log(tile)
    // content 입력 & 수정
    // imageList.contentId
    // return <Content contentId={imageList.contentId} />
  }

  handleTileHover(event, tile, selected = true) {
    const state = this.state;
    // if (state.mode === "selection") {
    //   tile.select = selected;
    //   this.setState({ state: this.state });
    // }
  }

  handleTileDoubleClick(event, tile) {
    const state = this.state;
    const mode = state.mode === "selection" ? "default" : "selection";
    this.setState({ ...state, mode });
  }

  indexTiles(tileData) {}

  getTiles(date) {
    const key = date.year() + "-" + date.month();
    if (!this.grids[key]) {
      this.grids[key] = this.calendarDateManager.createMonthData(date);
    }
    return this.grids[key];
  }

  render() {
    const date = this.state.date;
    const tileData = this.getTiles(date);
    this.indexTiles(tileData);
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Toolbar>
          <IconButton
            className={classes.icon}
            onClick={ev => this.toPreviousMonth()}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant="subtitle1"
            color="inherit"
            className={classes.grow}
          >
            {MONTHS[date.month()] + " " + date.year()} [{this.state.mode}]
          </Typography>
          <IconButton
            className={classes.icon}
            onClick={ev => this.toNextMonth()}
          >
            <ArrowForwardIcon />
          </IconButton>
        </Toolbar>
        <GridList
          key="calendar-header"
          cellHeight={40}
          cols={7}
          className={classes.gridList}
        >
          {DAYS.map(day => (
            <GridListTile key={day}>
              <Paper className={[classes.paper, classes.headerTile]}>
                {day}
              </Paper>
            </GridListTile>
          ))}
        </GridList>
        <GridList
          key="calendar"
          cellHeight={180}
          cols={7}
          spacing={0}
          className={classes.gridList}
        >
          {tileData.map(week =>
            week.map(tile => (
              <GridListTile
                key={tile.id}
                className={[classes.gridTile].join("")}
              >
                <Paper
                  square={true}
                  onClick={event => this.handleTileClick(event, tile)}
                  onMouseOver={event => this.handleTileHover(event, tile)}
                  onDoubleClick={event =>
                    this.handleTileDoubleClick(event, tile)
                  }
                  // onSelect={event => this.handleTileClick(event, tile, true)}
                  // onDragOver={event => this.handleTileClick(event, tile, true)}
                  className={
                    [classes[tile.mode],
                    classes.paper,
                    tile.select ? classes.selected : ""
                    ].join(" ")}
                >
                  {tile.title}
                  {/* imageList.map(image =>
                        if image.date == tile.title :
                            <img src=image.link ... /> 
                    ) */}
                  <img src="https://cdn.hellodd.com/news/photo/202102/91702_303070_1147.jpg" style={{width:"100%"}}/>
                </Paper>
              </GridListTile>
            ))
          )}
        </GridList>
      </div>
    );
  }
}

class CalendarDateManager {
  createMonthData(date) {
    const end = date.clone().endOf("month");
    const start = date.clone().startOf("month");
    const month = date.month();
    const dayDate = date.date();
    const startDayThisWeek = start.day();
    const numOfDaysThisMonth = end.date();
    const numOfWeeks = numOfDaysThisMonth / 7 + 1;
    const now = moment();
    const tmpDay = startDayThisWeek
      ? start.clone().subtract(startDayThisWeek, "days")
      : start.clone();
    console.log("tmpDay", tmpDay.toString());
    console.log("startDayThisWeek", startDayThisWeek);
    const tileData = [];
    for (let i = 0; i < numOfWeeks; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if (i > 0 && j === 0 && tmpDay.month() !== month) {
          break;
        }
        const id = i * 7 + j; // counting index - doesn't
        let day = {
          id: "tile-" + id,
          title: tmpDay.date(),
          subtitle: "",
          moment: tmpDay.clone(),
          mode: "ready",
          select: false
        };
        if (tmpDay.month() !== month || id < startDayThisWeek) {
          day.mode = "disabled";
        } else {
          if (day.moment.date() === dayDate && now.month() === month) {
            day.subtitle = "Today";
          }
        }
        tmpDay.add(1, "days");
        week.push(day);
      }
      if (week.length > 0) {
        tileData.push(week);
      }
    }
    return tileData;
  }
}

CalendarGrid.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CalendarGrid);