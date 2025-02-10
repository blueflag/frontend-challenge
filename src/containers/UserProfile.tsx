import {
  CircularProgress,
  Typography,
  Grid,
  Avatar,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import useFetch from "../hooks/useFetch";
import { Record, Resource, User } from "../types";

const UserProfile = () => {
  const { userId } = useParams();
  const [loading, setLoading] = useState<boolean>(true);

  const users: User[] = useFetch("users.json", [], setLoading);
  const records: Record[] = useFetch("learning-records.json", [], setLoading);
  const resources: Resource[] = useFetch(
    "learning-resources.json",
    [],
    setLoading
  );

  const [user, setUser] = useState<User | any>({});

  useEffect(() => {
    if (users) {
      setUser(users.find((userObj: User) => userObj.id === userId) || {});
    }
  }, [users]);

  const completedCount = records.filter(
    (record: Record) =>
      record.user_id === user.id && record.learning_record_verb === "COMPLETE"
  ).length;

  const findResourceById = (id: string) => {
    return resources.find((resource: Resource) => resource.masterId === id);
  };

  const handleStatusColor = (status: string): string | any => {
    let color = "";
    switch (status) {
      case "COMPLETE":
        color = "success";
        break;
      case "ATTEMPT":
        color = "primary";
        break;
      case "FAIL":
        color = "error";
        break;
      case "PASS":
        color = "success";
        break;
      case "ENROL":
      case "ATTEND":
        color = "default";
        break;
      default:
        color = "default";
    }

    return color;
  };

  if (loading) return <CircularProgress />;

  return (
    <div>
      <Header />
      <br />
      <br />
      <Grid
        container
        className="Main"
        width={"100%"}
        height={"100%"}
        justifyContent="center"
      >
        <Grid item xs={4}>
          <Grid container flexDirection="column" alignItems="center">
            <Grid item>
              <Avatar sx={{ width: 256, height: 256 }}>
                <Typography fontSize={54}>
                  {user?.givenName[0]} {user?.familyName[0]}
                </Typography>
              </Avatar>
            </Grid>
            <br />
            <Grid item>
              <Typography variant="h6">
                {user.givenName} {user.familyName}
              </Typography>
              <Typography color="textSecondary">{user.jobPositions}</Typography>
              <br />
              <Typography variant="body2">
                Completed Resources: {completedCount}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item spacing={3} xs={8}>
          <Grid item key={user.id}>
            <Typography variant="h5" sx={{ mt: 2 }} fontWeight={600}>
              Learning Status
            </Typography>
            <br />
            <br />
            <TableContainer component={Paper}>
              <Table size="medium">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="body1" fontWeight={600}>
                        Title
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1" fontWeight={600}>
                        Resource ID
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1" fontWeight={600}>
                        Status
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {records
                    .filter((record: Record) => record.user_id === user.id)
                    .map((record: Record, index: number) => (
                      <TableRow key={index}>
                        <TableCell>
                          {findResourceById(record.learning_resource_id)?.title}
                        </TableCell>
                        <TableCell>{record.learning_resource_id}</TableCell>
                        <TableCell>
                          <Chip
                            label={record.learning_record_verb}
                            color={handleStatusColor(
                              record.learning_record_verb
                            )}
                            style={{ width: "100px" }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default UserProfile;
