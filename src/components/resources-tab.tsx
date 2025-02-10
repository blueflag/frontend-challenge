"use client";

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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { BookOpen, BarChart, CheckCircle, Clock, XCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface ResourcesTabProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  sortColumn: string | null;
  setSortColumn: (column: string | null) => void;
  sortDirection: "asc" | "desc";
  setSortDirection: (direction: "asc" | "desc") => void;
  itemsPerPage: number;
  setItemsPerPage: (items: number) => void;
  getResourceStats: () => any[];
  usersData: any[];
  learningResourcesData: any[];
  learningRecordsData: any[];
}

export function ResourcesTab({
  searchTerm,
  setSearchTerm,
  currentPage,
  setCurrentPage,
  sortColumn,
  setSortColumn,
  sortDirection,
  setSortDirection,
  itemsPerPage,
  setItemsPerPage,
  getResourceStats,
  usersData,
  learningResourcesData,
  learningRecordsData,
}: ResourcesTabProps) {
  const filteredResources = useMemo(() => {
    let filtered = getResourceStats();

    if (searchTerm) {
      filtered = filtered.filter((resource) =>
        `${resource.title} ${resource.code}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
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
  }, [searchTerm, sortColumn, sortDirection, getResourceStats]);

  const paginatedResources = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredResources.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredResources, currentPage, itemsPerPage]);

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

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="dark:bg-[#1a202c] dark:border-[#3f444e]">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">
                  Most Completed Resource
                </p>
                <h3 className="text-2xl font-bold mt-1">
                  {
                    getResourceStats().sort(
                      (a, b) => b.completionRate - a.completionRate
                    )[0].title
                  }
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {
                    getResourceStats().sort(
                      (a, b) => b.completionRate - a.completionRate
                    )[0].completionRate
                  }
                  % completion rate
                </p>
              </div>
              <BookOpen className="h-6 w-6 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card className="dark:bg-[#1a202c] dark:border-[#3f444e]">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">
                  Least Completed Resource
                </p>
                <h3 className="text-2xl font-bold mt-1">
                  {
                    getResourceStats().sort(
                      (a, b) => a.completionRate - b.completionRate
                    )[0].title
                  }
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {
                    getResourceStats().sort(
                      (a, b) => a.completionRate - b.completionRate
                    )[0].completionRate
                  }
                  % completion rate
                </p>
              </div>
              <BookOpen className="h-6 w-6 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card className="dark:bg-[#1a202c] dark:border-[#3f444e]">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">
                  Average Completion Rate
                </p>
                <h3 className="text-2xl font-bold mt-1">
                  {Math.round(
                    getResourceStats().reduce(
                      (sum, resource) => sum + resource.completionRate,
                      0
                    ) / getResourceStats().length
                  )}
                  %
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Across all resources
                </p>
              </div>
              <BarChart className="h-6 w-6 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="dark:bg-[#1a202c] dark:border-[#3f444e]">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Resource Statistics</h3>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e: { target: { value: string } }) =>
                  setSearchTerm(e.target.value)
                }
                className="w-64 bg-background border-input"
              />
              <div className="flex items-center space-x-2">
                <Label htmlFor="rowsPerPage">Rows per page:</Label>
                <Select
                  value={itemsPerPage.toString()}
                  onValueChange={(value: any) => setItemsPerPage(Number(value))}
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
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="dark:hover:bg-[#2f3441] dark:border-[#3f444e]">
                  <TableHead
                    className="w-[30%] cursor-pointer"
                    onClick={() => handleSort("title")}
                  >
                    <div className="flex items-center">
                      {renderSortIcon("title")}
                      Title
                    </div>
                  </TableHead>
                  <TableHead
                    className="w-[20%] cursor-pointer"
                    onClick={() => handleSort("code")}
                  >
                    <div className="flex items-center">
                      {renderSortIcon("code")}
                      Code
                    </div>
                  </TableHead>
                  <TableHead
                    className="w-[30%] cursor-pointer"
                    onClick={() => handleSort("completionRate")}
                  >
                    <div className="flex items-center">
                      {renderSortIcon("completionRate")}
                      Completion Rate
                    </div>
                  </TableHead>
                  <TableHead className="w-[20%]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedResources.map((resource) => (
                  <TableRow
                    key={resource.masterId}
                    className="dark:hover:bg-[#2f3441] dark:border-[#3f444e]"
                  >
                    <TableCell className="font-medium">
                      {resource.title}
                    </TableCell>
                    <TableCell>{resource.code}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="w-12">{resource.completionRate}%</span>
                        <Progress
                          value={resource.completionRate}
                          className="w-full"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="dark:bg-[#05b7f2] dark:text-white dark:hover:bg-[#049ed3]"
                          >
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[550px] dark:bg-[#1a202c] dark:border-[#3f444e]">
                          <DialogHeader>
                            <DialogTitle className="text-2xl font-bold">
                              {resource.title}
                            </DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-6 py-4">
                            <div className="space-y-2">
                              <p className="font-medium">Completion Rate</p>
                              <div className="flex items-center gap-2">
                                <Progress
                                  value={resource.completionRate}
                                  className="flex-grow"
                                />
                                <span className="text-lg font-bold">
                                  {resource.completionRate}%
                                </span>
                              </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                              <div className="p-4 bg-green-100 dark:bg-green-900 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                                  <p className="text-sm text-green-600 dark:text-green-400">
                                    Completed
                                  </p>
                                </div>
                                <p className="text-xl font-bold text-green-700 dark:text-green-300">
                                  {resource.completions}
                                </p>
                              </div>
                              <div className="p-4 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                  <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                                  <p className="text-sm text-yellow-600 dark:text-yellow-400">
                                    Attempted
                                  </p>
                                </div>
                                <p className="text-xl font-bold text-yellow-700 dark:text-yellow-300">
                                  {resource.attempts}
                                </p>
                              </div>
                              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                  <XCircle className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Not Started
                                  </p>
                                </div>
                                <p className="text-xl font-bold text-gray-700 dark:text-gray-300">
                                  {resource.notStarted}
                                </p>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-muted-foreground">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, filteredResources.length)}{" "}
              of {filteredResources.length} resources
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
                      Math.ceil(filteredResources.length / itemsPerPage),
                      currentPage + 1
                    )
                  )
                }
                disabled={
                  currentPage ===
                  Math.ceil(filteredResources.length / itemsPerPage)
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

export function ResourcesTabSkeleton() {
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
            <Skeleton className="h-6 w-[150px]" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-10 w-64" />
              <Skeleton className="h-10 w-[100px]" />
            </div>
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <Skeleton className="h-4 w-[200px]" />
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
