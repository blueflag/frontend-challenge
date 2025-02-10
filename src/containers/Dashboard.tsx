import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Autocomplete,
  TextField,
  debounce,
} from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Tooltip,
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Legend,
} from "chart.js";
import Header from "../components/Header";
import useFetch from "../hooks/useFetch";
import { Record, Resource, User } from "../types";

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

  const records: Record[] = useFetch("learning-records.json", [], setLoading);
  const users: User[] = useFetch("users.json", [], setLoading);

  if (loading) return <CircularProgress />;

  const completedCounts: number = records
    .filter((record: Record) => record.learning_record_verb === "COMPLETE")
    .reduce((acc: any, record: Record) => {
      acc[record.user_id] = (acc[record.user_id] || 0) + 1;
      return acc;
    }, {});

  const sortedUsers: User[] | Array<any> = Object.entries(completedCounts)
    .sort((a: any, b: any) => b[1] - a[1])
    .slice(0, 10);

  const usersMap: User[] | any = Object.fromEntries(
    users.map((user: User) => [user.id, `${user.givenName} ${user.familyName}`])
  );

  return (
    <Container>
      <br />
      <br />
      <Typography variant="h5" fontWeight={600} gutterBottom>
        Top 10 Users Who Completed Learning Resources
      </Typography>
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
            {sortedUsers.map(([userId, count]: Array<any>, index: number) => (
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

  const records: Record[] = useFetch("learning-records.json", [], setLoading);
  const resources: Resource[] = useFetch(
    "learning-resources.json",
    [],
    setLoading
  );

  if (loading) return <CircularProgress />;

  const stats = records.reduce((acc: any, record: Record) => {
    acc[record.learning_resource_id] =
      (acc[record.learning_resource_id] || 0) + 1;
    return acc;
  }, {});

  const labels: Array<string> = Object.keys(stats).map((id: string) => {
    const resource: Resource | any =
      resources?.find((rid: any) => rid.masterId === id) || {};
    return resource?.title || "Unknown Resource";
  });

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
      <Typography variant="h5" fontWeight={600} gutterBottom>
        User Learning Records Stats
      </Typography>
      <br />
      <Bar data={chartData} />
    </Container>
  );
};

const AutoComplete = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const users: User[] = useFetch("users.json", []);
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

  const handleUserSelect = (event: any, value: User | any) => {
    const selectedUser: User | any = users.find(
      (user: User) =>
        `${user.givenName} ${user.familyName} - ${user.jobPositions}` === value
    );
    if (selectedUser) {
      navigate(`/users/${selectedUser.id}`);
    }
  };

  const handleInputChange = (event: any, value: any) => {
    setSearchQuery(value);
    handleSearch(value);
  };

  return (
    <Autocomplete
      freeSolo
      options={users.map(
        (user: User) =>
          `${user.givenName} ${user.familyName} - ${user.jobPositions}`
      )}
      inputValue={searchQuery}
      onInputChange={handleInputChange}
      onChange={handleUserSelect}
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          variant="outlined"
          label="Search Users"
          margin="normal"
        />
      )}
    />
  );
};

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

export default HomePage;
