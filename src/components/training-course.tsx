import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "next-themes";
import { OverviewTab } from "./overview-tab";
import { UsersTab } from "./users-tab";
import { ResourcesTab } from "./resources-tab";
import { useDataFetching } from "../hooks/useDataFetching";
import { useDataProcessing } from "../hooks/useDataProcessing";
import { OverviewTabSkeleton } from "./overview-tab";
import { UsersTabSkeleton } from "./users-tab";
import { ResourcesTabSkeleton } from "./resources-tab";
import { DEFAULT_ITEMS_PER_PAGE } from "@/constants";

export default function TrainingCourse() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const { usersData, learningResourcesData, learningRecordsData, isLoading } =
    useDataFetching();
  const { getCompletionRate, getMostActiveUsers, getResourceStats } =
    useDataProcessing(usersData, learningResourcesData, learningRecordsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [filterJobPosition, setFilterJobPosition] = useState<string | null>(
    null
  );
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background dark:bg-[#1a202c] text-foreground dark:border-[#3f444e]">
        <div className="container mx-auto p-6">
          <h1 className="text-2xl font-bold mb-6">Training Course 101</h1>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <OverviewTabSkeleton />
            </TabsContent>
            <TabsContent value="users">
              <UsersTabSkeleton />
            </TabsContent>
            <TabsContent value="resources">
              <ResourcesTabSkeleton />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  }

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background dark:bg-[#1a202c] text-foreground dark:border-[#3f444e]">
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Training Course 101</h1>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <OverviewTab
              getCompletionRate={getCompletionRate}
              getMostActiveUsers={getMostActiveUsers}
              getResourceStats={getResourceStats}
              theme={theme}
              usersData={usersData}
              learningResourcesData={learningResourcesData}
              learningRecordsData={learningRecordsData}
            />
          </TabsContent>
          <TabsContent value="users">
            <UsersTab
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              sortColumn={sortColumn}
              setSortColumn={setSortColumn}
              sortDirection={sortDirection}
              setSortDirection={setSortDirection}
              filterJobPosition={filterJobPosition}
              setFilterJobPosition={setFilterJobPosition}
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
              getMostActiveUsers={getMostActiveUsers}
              usersData={usersData}
              learningResourcesData={learningResourcesData}
              learningRecordsData={learningRecordsData}
            />
          </TabsContent>
          <TabsContent value="resources">
            <ResourcesTab
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              sortColumn={sortColumn}
              setSortColumn={setSortColumn}
              sortDirection={sortDirection}
              setSortDirection={setSortDirection}
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
              getResourceStats={getResourceStats}
              usersData={usersData}
              learningResourcesData={learningResourcesData}
              learningRecordsData={learningRecordsData}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
