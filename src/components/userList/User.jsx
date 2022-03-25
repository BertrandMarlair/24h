import { Box, Button, Collapse, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import moment from "moment";
import { Fragment, useState } from "react";
import { config } from "../../App";
import EventEmitter from "../../core/eventEmitter";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { CheckCircleOutline, DirectionsBikeOutlined, PlusOneOutlined } from "@mui/icons-material";

const User = ({user: {name, run}, lastRun, dispatch}) => {
    const [open, setOpen] = useState(false);
    const totalCount = run.reduce((acc, cur) => acc + cur.count, 0);
    const totalTime = run.reduce((acc, cur) => acc + (cur.endAt - cur.startAt), 0);
    const allRunTime = run.map((e) => ((e.endAt - e.startAt) / e.count));
    const bestRun = allRunTime.sort((a, b) => a - b)[0];
    const avgTime = allRunTime.reduce((acc, cur) => acc + cur, 0) / run.length;
    const totalDistance = config.distance * totalCount;
    const speed = Math.round(totalDistance / (totalTime / 1000) * 3.6 * 100) / 100;

    const handleAddNewRun = (velo) => {
        dispatch({type: "ADD_NEW_RUN", payload: {name, velo}});
        EventEmitter.dispatch(`NEW_RUN-${velo}`, avgTime);
    }

    const handleAddTour = (velo) => {
        dispatch({type: "ADD_NEW_TOUR", payload: {name, velo}});
        console.log("avgTime", avgTime, `NEW_RUN-${velo}`);
        EventEmitter.dispatch(`NEW_RUN-${velo}`, avgTime);
    }

    const handleSetFirstUser = (velo) => {
        dispatch({type: "SET_FIRST_USER", payload: {name, velo}});
    }

    const ButtonWrapper = () => {
        if (lastRun.velo1.endAt && lastRun.velo1.name && lastRun.velo1.name === name) {
            return (
                <Button variant="contained" endIcon={<PlusOneOutlined />} onClick={() => handleAddTour("velo1")}>
                    Nouveau tour
                </Button>
            )
        } else if (lastRun.velo2.endAt && lastRun.velo2.name && lastRun.velo2.name === name) {
            return (
                <Button variant="contained" endIcon={<PlusOneOutlined />} onClick={() => handleAddTour("velo2")}>
                    Nouveau tour
                </Button>
            )
        } else if (lastRun.velo1.name && lastRun.velo1.endAt && lastRun.velo2.name && lastRun.velo2.endAt) {
            return (
                <>
                    <Button variant="contained" endIcon={<DirectionsBikeOutlined />} onClick={() => handleAddNewRun("velo1")}>
                        JAUNE
                    </Button>
                    <Button variant="contained" endIcon={<DirectionsBikeOutlined />} onClick={() => handleAddNewRun("velo2")}>
                        ROUGE
                    </Button>
                </>
            ); 
        } else {
            return (
                <>
                    <Button variant="contained" endIcon={<CheckCircleOutline />} onClick={() => handleSetFirstUser("velo1")}>
                        JAUNE
                    </Button>
                    <Button variant="contained" endIcon={<CheckCircleOutline />} onClick={() => handleSetFirstUser("velo2")}>
                        ROUGE
                    </Button>
                </>
            )
        }
    }

    return (
        <Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">{name}</TableCell>
                <TableCell align="center">{totalCount}</TableCell>
                <TableCell align="center">{bestRun ? moment.utc(moment.duration(bestRun, "minutes").asMinutes()).format("mm:ss") : 0}</TableCell>
                <TableCell align="center">{totalTime ? moment.utc(moment.duration(totalTime, "minutes").asMinutes()).format("HH:mm:ss") : 0}</TableCell>
                <TableCell align="center">{avgTime ? moment.utc(moment.duration(avgTime, "minutes").asMinutes()).format("HH:mm:ss") : 0}</TableCell>
                <TableCell align="center">{totalDistance ? Math.round(totalDistance * 100) / 100000 : 0} km</TableCell>
                <TableCell align="center">{speed ? speed : 0} km/h</TableCell>
                <TableCell align="center">
                    <ButtonWrapper />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 1 }}>
                    <Typography variant="h6" gutterBottom component="div">
                        History
                    </Typography>
                    <Table size="small" aria-label="purchases">
                        <TableHead>
                            <TableRow>
                                <TableCell>Start At</TableCell>
                                <TableCell>End At</TableCell>
                                <TableCell align="right">Count</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {run.map((r, index) => (
                                <TableRow key={`run/${index}`}>
                                    <TableCell component="th" scope="row">
                                        {moment(r.startAt).format("HH:mm:ss")}
                                    </TableCell>
                                    <TableCell>{moment(r.endAt).format("HH:mm:ss")}</TableCell>
                                    <TableCell align="right">{r.count}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    </Box>
                </Collapse>
                </TableCell>
            </TableRow>
            {/* <Card>
                <div className="user-name">Name: {name}</div>
                <div className="user-name">Count: {totalCount}</div>
                <div className="user-name">Best: {bestRun ? moment.utc(moment.duration(bestRun, "minutes").asMinutes()).format("mm:ss") : 0}</div>
                <div className="user-name">Total Time: {totalTime ? moment.utc(moment.duration(totalTime, "minutes").asMinutes()).format("HH:mm:ss") : 0}</div>
                <div className="user-name">Average Time: {avgTime ? moment.utc(moment.duration(avgTime, "minutes").asMinutes()).format("HH:mm:ss") : 0}</div>
                <div className="user-name">Distance: {totalDistance ? Math.round(totalDistance * 100) / 100000 : 0} km</div>
                <div className="user-name">Average Speed: {speed ? speed : 0} km/h</div>
                <Button />
                <hr />
            </Card> */}
        </Fragment>
    );
}

export default User;
