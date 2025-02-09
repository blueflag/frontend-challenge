import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Autocomplete, TextField, debounce } from "@mui/material";
import { Bar } from "react-chartjs-2";
import { Tooltip, Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Legend } from "chart.js";
import Header from "../components/Header";
import useFetch from "../hooks/useFetch";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const CompletionTable = () => {
    const [loading, setLoading] = useState(true);

   const records = useFetch('learning-records.json', [], setLoading);
   const users = useFetch('users.json', [], setLoading) 

    if (loading) return <CircularProgress />;

    const completedCounts = records
        .filter((record: any) => record.learning_record_verb === "COMPLETE")
        .reduce((acc: any, record: any) => {
            acc[record.user_id] = (acc[record.user_id] || 0) + 1;
            return acc;
        }, {});

    const sortedUsers = Object.entries(completedCounts)
        .sort((a: any, b: any) => b[1] - a[1])
        .slice(0, 10);

    const usersMap = Object.fromEntries(users.map((user: any) => [user.id, `${user.givenName} ${user.familyName}`]));

    return (
        <Container>
            <br />
            <br />
            <Typography variant="h5" gutterBottom>Top 10 Users Who Completed Learning Resources</Typography>
            <br />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>User</TableCell>
                            <TableCell>Completed Resources</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedUsers.map(([userId, count]: any, index: number) => (
                            <TableRow key={index}>
                                <TableCell>{usersMap[userId] || "Unknown User"}</TableCell>
                                <TableCell>{count}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <br />
            <br />
        </Container>
    );
};

const UserStatsPage = () => {
    const [loading, setLoading] = useState(true);

    const records = useFetch('learning-records.json', [], setLoading)
    const resources = useFetch('learning-resources.json', [], setLoading) 

    if (loading) return <CircularProgress />;

    const stats = records.reduce((acc: any, record: any) => {
        acc[record.learning_resource_id] = (acc[record.learning_resource_id] || 0) + 1;
        return acc;
    }, {});

    const labels = Object.keys(stats).map((id: string) => {
        const resource: any = resources?.find((rid: any) => rid.masterId === id)
        return resource?.title
    })

    const chartData = {
        labels,
        datasets: [
            {
                label: "Interactions per Learning Resource",
                data: Object.values(stats),
                backgroundColor: "#1976d2",
            },
        ],
    };

    return (
        <Container>
            <br />
            <br />
            <Typography variant="h5" gutterBottom>User Learning Records Stats</Typography>
            <br />
            <Bar data={chartData} />
        </Container>
    );
};

const AutoComplete = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);
    const users: any = useFetch('users.json', [])
    const navigate = useNavigate();

    const handleSearch = useCallback(
        debounce((query) => {
            setFilteredUsers(
                users.filter(
                    (user: any) =>
                        user.givenName?.toLowerCase().includes(query.toLowerCase()) ||
                        user.familyName?.toLowerCase().includes(query.toLowerCase()) ||
                        user.jobPositions?.toLowerCase().includes(query.toLowerCase())
                )
            );
        }, 300),
        [users]
    );

    const handleUserSelect = (event: any, value: any) => {
        const selectedUser: any = users.find(
            (user: any) => `${user.givenName} ${user.familyName} - ${user.jobPositions}` === value
        );
        if (selectedUser) {
            navigate(`/users/${selectedUser.id}`);
        }
    };

    const handleInputChange = (event: any, value: any) => {
        setSearchQuery(value);
        handleSearch(value);
    };

    return <Autocomplete
        freeSolo
        options={users.map((user: any) => `${user.givenName} ${user.familyName} - ${user.jobPositions}`)}
        inputValue={searchQuery}
        onInputChange={handleInputChange}
        onChange={handleUserSelect}
        renderInput={(params) => (
            <TextField {...params} fullWidth variant="outlined" label="Search Users" margin="normal" />
        )}
    />
}

const HomePage = () => {
    return (
        <div>
            <Header />
            <Container>
                <AutoComplete />
                <UserStatsPage />
                <CompletionTable />
            </Container>
        </div>
    );
};

export default HomePage