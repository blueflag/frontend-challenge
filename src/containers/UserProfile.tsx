import { CircularProgress, Typography, Grid, Card, CardContent, Avatar, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";

const UserProfile = () => {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState<any>({})

    const { userId } = useParams()

    useEffect(() => {
        Promise.all([
            fetch("http://localhost:3000/users.json").then((res) => res.json()),
            fetch("http://localhost:3000/learning-records.json").then((res) => res.json()),
        ]).then(([usersData, recordsData]) => {
            setUsers(usersData);
            setRecords(recordsData);
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        if (users) {
            setUser(users.find((userObj: any) => userObj.id === userId) || {})
        }
    }, [users])

    const completedCount = records.filter(
        (record: any) => record.user_id === user.id && record.learning_record_verb === "COMPLETE"
    ).length;

    if (loading) return <CircularProgress />;

    return (
        <div>
            <Header />
            <br />
            <br />
            <Grid container flexDirection='row' alignItems='center' justifyContent='space-evenly' className="Main">
                <Grid>
                    <Grid container spacing={2} flexDirection='column' alignItems='center'>
                        <Grid item>
                            <Avatar sx={{ width: 256, height: 256 }}>
                                <Typography fontSize={54}>{user.givenName[0]} {user.familyName[0]}</Typography>
                            </Avatar>
                        </Grid>
                        <Grid item>
                            <Typography variant="h6">{user.givenName} {user.familyName}</Typography>
                            <Typography color="textSecondary">{user.jobPositions}</Typography>
                            <Typography variant="body2">Completed Resources: {completedCount}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid spacing={3}>
                    <Grid item key={user.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="subtitle1" sx={{ mt: 2 }}>Learning Resources Status</Typography>
                                <br />
                                <TableContainer component={Paper}>
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Resource ID</TableCell>
                                                <TableCell>Status</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {records
                                                .filter((record: any) => record.user_id === user.id)
                                                .map((record: any, index: number) => (
                                                    <TableRow key={index}>
                                                        <TableCell>{record.learning_resource_id}</TableCell>
                                                        <TableCell>{record.learning_record_verb}</TableCell>
                                                    </TableRow>
                                                ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export default UserProfile