import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Users, BarChart } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface UsersTabProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  sortColumn: string | null;
  setSortColumn: (column: string | null) => void;
  sortDirection: "asc" | "desc";
  setSortDirection: (direction: "asc" | "desc") => void;
  filterJobPosition: string | null;
  setFilterJobPosition: (position: string | null) => void;
  itemsPerPage: number;
  setItemsPerPage: (items: number) => void;
  getMostActiveUsers: () => any[];
  usersData: any[];
  learningResourcesData: any[];
  learningRecordsData: any[];
}

export function UsersTab({
  searchTerm,
  setSearchTerm,
  currentPage,
  setCurrentPage,
  sortColumn,
  setSortColumn,
  sortDirection,
  setSortDirection,
  filterJobPosition,
  setFilterJobPosition,
  itemsPerPage,
  setItemsPerPage,
  getMostActiveUsers,
  usersData,
  learningResourcesData,
  learningRecordsData,
}: UsersTabProps) {
  const filteredUsers = useMemo(() => {
    let filtered = getMostActiveUsers();

    if (searchTerm) {
      filtered = filtered.filter((user) =>
        `${user.givenName} ${user.familyName} ${user.jobPositions}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    if (filterJobPosition) {
      filtered = filtered.filter(
        (user) => user.jobPositions === filterJobPosition
      );
    }

    if (sortColumn) {
      filtered.sort((a, b) => {
        if (a[sortColumn] < b[sortColumn])
          return sortDirection === "asc" ? -1 : 1;
        if (a[sortColumn] > b[sortColumn])
          return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [
    searchTerm,
    filterJobPosition,
    sortColumn,
    sortDirection,
    getMostActiveUsers,
  ]);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredUsers, currentPage, itemsPerPage]);

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const renderSortIcon = (column: string) => {
    if (sortColumn === column) {
      return sortDirection === "asc" ? "↑" : "↓";
    }
    return "↕";
  };

  const getRecentActivities = (userId: string) => {
    return learningRecordsData
      .filter((record) => record.user_id === userId)
      .sort(
        (a, b) =>
          new Date(b.learning_record_timestamp).getTime() -
          new Date(a.learning_record_timestamp).getTime()
      )
      .slice(0, 5)
      .map((record) => {
        const resource = learningResourcesData.find(
          (r) => r.masterId === record.learning_resource_id
        );
        return {
          resource,
          verb: record.learning_record_verb,
          timestamp: new Date(
            record.learning_record_timestamp
          ).toLocaleString(),
        };
      });
  };

  const getUserProgress = (userId: string) => {
    const userRecords = learningRecordsData.filter(
      (record) => record.user_id === userId
    );
    return learningResourcesData.map((resource) => {
      const record = userRecords.find(
        (r) => r.learning_resource_id === resource.masterId
      );
      return {
        ...resource,
        status: record ? record.learning_record_verb : "NOT_STARTED",
      };
    });
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="dark:bg-[#1a202c] dark:border-[#3f444e]">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">
                  Most Active User
                </p>
                <h3 className="text-2xl font-bold mt-1">
                  {getMostActiveUsers()[0].givenName}{" "}
                  {getMostActiveUsers()[0].familyName}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {getMostActiveUsers()[0].completionRate}% completion rate
                </p>
              </div>
              <Users className="h-6 w-6 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card className="dark:bg-[#1a202c] dark:border-[#3f444e]">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">
                  Least Active User
                </p>
                <h3 className="text-2xl font-bold mt-1">
                  {
                    getMostActiveUsers()[getMostActiveUsers().length - 1]
                      .givenName
                  }{" "}
                  {
                    getMostActiveUsers()[getMostActiveUsers().length - 1]
                      .familyName
                  }
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {
                    getMostActiveUsers()[getMostActiveUsers().length - 1]
                      .completionRate
                  }
                  % completion rate
                </p>
              </div>
              <Users className="h-6 w-6 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card className="dark:bg-[#1a202c] dark:border-[#3f444e]">
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">
                  Average User Progress
                </p>
                <h3 className="text-2xl font-bold mt-1">
                  {Math.round(
                    getMostActiveUsers().reduce(
                      (sum, user) => sum + user.completionRate,
                      0
                    ) / getMostActiveUsers().length
                  )}
                  %
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Across all users
                </p>
              </div>
              <BarChart className="h-6 w-6 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="dark:bg-[#1a202c] dark:border-[#3f444e]">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
            <h3 className="text-lg font-semibold">Users</h3>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 bg-background border-input"
              />
              <Select
                value={filterJobPosition || "All Positions"}
                onValueChange={(value) => setFilterJobPosition(value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Positions">All Positions</SelectItem>
                  {Array.from(
                    new Set(usersData.map((user) => user.jobPositions))
                  ).map((position) => (
                    <SelectItem key={position} value={position}>
                      {position}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex items-center space-x-2">
                <Label htmlFor="rowsPerPage">Rows per page:</Label>
                <Select
                  value={itemsPerPage.toString()}
                  onValueChange={(value) => setItemsPerPage(Number(value))}
                >
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {[5, 10, 20, 50].map((value) => (
                      <SelectItem key={value} value={value.toString()}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto -mx-6 px-6">
            <Table>
              <TableHeader>
                <TableRow className="dark:hover:bg-[#2f3441] dark:border-[#3f444e]">
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSort("givenName")}
                  >
                    <div className="flex items-center">
                      {renderSortIcon("givenName")}
                      Name
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSort("jobPositions")}
                  >
                    <div className="flex items-center">
                      {renderSortIcon("jobPositions")}
                      Position
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSort("completionRate")}
                  >
                    <div className="flex items-center">
                      {renderSortIcon("completionRate")}
                      Progress
                    </div>
                  </TableHead>
                  <TableHead className="w-[15%]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedUsers.map((user) => (
                  <TableRow
                    key={user.id}
                    className="dark:hover:bg-[#2f3441] dark:border-[#3f444e]"
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Avatar>
                          <AvatarImage
                            src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.givenName} ${user.familyName}`}
                          />
                          <AvatarFallback>
                            {user.givenName[0]}
                            {user.familyName[0]}
                          </AvatarFallback>
                        </Avatar>
                        {user.givenName} {user.familyName}
                      </div>
                    </TableCell>
                    <TableCell>{user.jobPositions}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="w-12">{user.completionRate}%</span>
                        <Progress
                          value={user.completionRate}
                          className="w-full"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="dark:bg-[#05b7f2] dark:text-white dark:hover:bg-[#049ed3]"
                          >
                            View Details
                          </Button>
                        </SheetTrigger>
                        <SheetContent className="w-[400px] sm:w-[540px] max-h-screen overflow-y-auto">
                          <div className="pb-6">
                            <SheetHeader>
                              <SheetTitle className="text-2xl font-semibold">
                                {user.givenName} {user.familyName}
                              </SheetTitle>
                              <p className="text-sm text-muted-foreground">
                                {user.jobPositions}
                              </p>
                            </SheetHeader>
                            <div className="grid gap-6 py-4">
                              <div>
                                <h4 className="text-base font-medium mb-2">
                                  Overall Progress
                                </h4>
                                <div className="flex items-center gap-2">
                                  <Progress
                                    value={user.completionRate}
                                    className="flex-grow"
                                  />
                                  <span className="text-sm font-medium">
                                    {user.completionRate}%
                                  </span>
                                </div>
                              </div>
                              <div>
                                <h4 className="text-base font-medium mb-4">
                                  Recent Activities
                                </h4>
                                <div className="space-y-4">
                                  {getRecentActivities(user.id).map(
                                    (activity, index) => (
                                      <div
                                        key={index}
                                        className="flex flex-col gap-1"
                                      >
                                        <div className="flex items-center justify-between">
                                          <div className="flex items-center gap-2">
                                            <div
                                              className={`w-2 h-2 rounded-full ${
                                                activity.resource?.title
                                                  .toLowerCase()
                                                  .includes("quiz")
                                                  ? "bg-blue-500"
                                                  : "bg-green-500"
                                              }`}
                                            />
                                            <span className="font-medium">
                                              {activity.resource?.title}
                                            </span>
                                          </div>
                                          <span className="text-xs text-muted-foreground">
                                            {new Date(
                                              activity.timestamp
                                            ).toLocaleString([], {
                                              month: "numeric",
                                              day: "numeric",
                                              year: "numeric",
                                              hour: "numeric",
                                              minute: "2-digit",
                                              hour12: true,
                                            })}
                                          </span>
                                        </div>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                              <div>
                                <h4 className="text-base font-medium mb-4">
                                  Resource Interactions
                                </h4>
                                <div className="space-y-4">
                                  {getUserProgress(user.id).map(
                                    (resource, index) => (
                                      <div
                                        key={index}
                                        className="flex items-center justify-between"
                                      >
                                        <div className="flex items-center gap-2">
                                          <div
                                            className={`w-2 h-2 rounded-full ${
                                              resource.title
                                                .toLowerCase()
                                                .includes("quiz")
                                                ? "bg-blue-500"
                                                : "bg-green-500"
                                            }`}
                                          />
                                          <span className="font-medium">
                                            {resource.title}
                                          </span>
                                        </div>
                                        <span
                                          className={`text-xs px-2 py-1 rounded-full ${
                                            resource.status === "COMPLETE"
                                              ? "bg-green-500/20 text-green-400"
                                              : resource.status === "ATTEMPT"
                                              ? "bg-yellow-500/20 text-yellow-400"
                                              : "bg-gray-500/20 text-gray-400"
                                          }`}
                                        >
                                          {resource.status}
                                        </span>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </SheetContent>
                      </Sheet>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-muted-foreground">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of{" "}
              {filteredUsers.length} users
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="dark:bg-[#05b7f2] dark:text-white dark:hover:bg-[#049ed3]"
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage(
                    Math.min(
                      Math.ceil(filteredUsers.length / itemsPerPage),
                      currentPage + 1
                    )
                  )
                }
                disabled={
                  currentPage === Math.ceil(filteredUsers.length / itemsPerPage)
                }
                className="dark:bg-[#05b7f2] dark:text-white dark:hover:bg-[#049ed3]"
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export function UsersTabSkeleton() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="dark:bg-[#1a202c] dark:border-[#3f444e]">
            <CardContent className="p-6">
              <Skeleton className="h-4 w-[250px] mb-2" />
              <Skeleton className="h-8 w-[100px] mb-2" />
              <Skeleton className="h-4 w-[200px]" />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="dark:bg-[#1a202c] dark:border-[#3f444e]">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <Skeleton className="h-6 w-[100px]" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-10 w-64" />
              <Skeleton className="h-10 w-[180px]" />
              <Skeleton className="h-10 w-[100px]" />
            </div>
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-8 w-[100px]" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
