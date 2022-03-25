import { Button, Card, Input, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useContext, useState } from "react";
import { RaceContext } from "../../App";
import User from "./User";

const UserList = () => {
    const [{users, lastRun}, dispatch] = useContext(RaceContext);
    const [newUser, setNewUser] = useState("");

    const handleAddNewUser = () => {
        dispatch({type: "ADD_NEW_USER", payload: {name: newUser}});
        setNewUser("");
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                    <TableRow>
                        <TableCell/>
                        <TableCell>SCOUT</TableCell>
                        <TableCell align="center">Compte</TableCell>
                        <TableCell align="center">Meilleur Temps</TableCell>
                        <TableCell align="center">Total</TableCell>
                        <TableCell align="center">Moyenne</TableCell>
                        <TableCell align="center">Distance</TableCell>
                        <TableCell align="center">Vitesse Moyenne</TableCell>
                        <TableCell/>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user, index) => {
                            return (
                                <User key={`user/${index}`} user={user} lastRun={lastRun} dispatch={dispatch} />
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Card sx={{margin: 5}}>
                <Input value={newUser} onChange={(e) => setNewUser(e.target.value)} />
                <Button onClick={() => handleAddNewUser()}>Ajouter un nouveau scout</Button>
            </Card>
        </>
    );
}

export default UserList;
