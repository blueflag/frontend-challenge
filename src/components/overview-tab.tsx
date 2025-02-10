import { Card, CardContent } from "@/components/ui/card";
import { Users, BookOpen, GraduationCap } from "lucide-react";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getStatusBadge } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface OverviewTabProps {
  getCompletionRate: () => number;
  getMostActiveUsers: () => any[];
  getResourceStats: () => any[];
  theme: string | undefined;
  usersData: any[];
  learningResourcesData: any[];
  learningRecordsData: any[];
}

export function OverviewTab({
  getCompletionRate,
  getMostActiveUsers,
  getResourceStats,
  theme,
  usersData,
  learningResourcesData,
  learningRecordsData,
}: OverviewTabProps) {
  const getRecentActivities = () => {
    return learningRecordsData
      .sort(
        (a, b) =>
          new Date(b.learning_record_timestamp).getTime() -
          new Date(a.learning_record_timestamp).getTime()
      )
      .slice(0, 5)
      .map((record) => {
        const user = usersData.find((u) => u.id === record.user_id);
        const resource = learningResourcesData.find(
          (r) => r.masterId === record.learning_resource_id
        );
        return {
          user,
          resource,
          verb: record.learning_record_verb,
          timestamp: new Date(
            record.learning_record_timestamp
          ).toLocaleString(),
        };
      });
  };

  return (
    <>
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card className="dark:bg-[#1a202c] dark:border-[#3f444e]">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">
                  Overall Completion Rate
                </p>
                <h3 className="text-2xl font-bold mt-1">
                  {getCompletionRate()}%
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Across all users & resources
                </p>
              </div>
              <GraduationCap className="h-6 w-6 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card className="dark:bg-[#1a202c] dark:border-[#3f444e]">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <h3 className="text-2xl font-bold mt-1">{usersData.length}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Across all positions
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
                  Learning Resources
                </p>
                <h3 className="text-2xl font-bold mt-1">
                  {learningResourcesData.length}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Available for completion
                </p>
              </div>
              <BookOpen className="h-6 w-6 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="dark:bg-[#1a202c] dark:border-[#3f444e] md:col-span-2">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Resource Completion Rates
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={getResourceStats()}>
                <XAxis dataKey="code" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="completionRate"
                  fill={theme === "dark" ? "#3b82f6" : "#2563eb"}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="dark:bg-[#1a202c] dark:border-[#3f444e]">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4 text-blue-600 dark:text-blue-400">
              Recent User Activities
            </h3>
            <div className="space-y-4">
              {getRecentActivities().map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        src={`https://api.dicebear.com/6.x/initials/svg?seed=${activity.user?.givenName} ${activity.user?.familyName}`}
                      />
                      <AvatarFallback>
                        {activity.user?.givenName[0]}
                        {activity.user?.familyName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        {activity.user?.givenName} {activity.user?.familyName}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {activity.resource?.title}
                      </p>
                    </div>
                  </div>
                  <div className={getStatusBadge(activity.verb)}>
                    {activity.verb}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export function OverviewTabSkeleton() {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-3 mb-6">
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

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="dark:bg-[#1a202c] dark:border-[#3f444e] md:col-span-2">
          <CardContent className="p-6">
            <Skeleton className="h-[300px] w-full" />
          </CardContent>
        </Card>

        <Card className="dark:bg-[#1a202c] dark:border-[#3f444e]">
          <CardContent className="p-6">
            <Skeleton className="h-4 w-[200px] mb-4" />
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-4 w-[150px]" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
