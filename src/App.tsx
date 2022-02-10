import React, { useEffect, useState } from "react";
import RecordRankingSection from "./sections/RecordRankingSection";
import UserSearchSection from "./sections/UserSearchSection";
import UserRankingSection from "./sections/UserRankingSection";

// Has user X attempted or completed learning resource Y?
// Which job position does user X belong to?
// requirement user descriptions

// Who has completed a lot of the learning resources? Who hasn't?
// requirement: aggregate activities by user

// Which learning resources have been completed the most?
// Which learning resources have not been interacted with at all yet?
// requirement: aggregate learning records per resource

export default function App(): React.ReactElement {
  const [sortedUsersAsc, setSortedUsersAsc] = useState<IBlueflagModdedUser[]>(
    []
  );
  const [moddedResources, setModdedResources] = useState<
    IBlueflagModdedResource[]
  >([]);
  const [sortedUsersDesc, setSortedUsersDesc] = useState<IBlueflagModdedUser[]>(
    []
  );
  const [searchResults, setSearchResults] = useState<IBlueflagModdedUser[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    // load data
    async function fetchData() {
      const userResponse = await fetch("/users.json");
      const userData: IBlueflagUser[] = await userResponse.json();
      const recordResponse = await fetch("/learning-records.json");
      const recordData: IBlueflagLearningRecord[] = await recordResponse.json();

      const resourceResponse = await fetch("/learning-resources.json");
      const resourceData: IBlueflagLearningResource[] =
        await resourceResponse.json();

      const moddedResources: IBlueflagModdedResource[] = resourceData.map(
        (x) => {
          // get all records
          const records = recordData.filter(
            (r) => r.learning_resource_id === x.masterId
          );
          const records_completed = records.filter(
            (x) => x.learning_record_verb === "COMPLETE"
          ).length;
          const enrolled_records = records.filter(
            (r) => r.learning_record_verb === "ENROL"
          );
          return {
            ...x,
            has_enrolled_only: enrolled_records.length > 0,
            records,
            records_completed,
          };
        }
      );
      const sortedModdedResources = moddedResources.sort(
        (a, b) => b.records_completed - a.records_completed
      );
      setModdedResources(sortedModdedResources);

      // get copy of users with activities
      const moddedUserData: IBlueflagModdedUser[] = userData.map((u) => {
        const learning_records: IBlueflagLearningModdedRecord[] = recordData
          .filter((x) => x.user_id === u.id)
          .map((y) => {
            const learning_resource = resourceData.find(
              (r) => r.masterId === y.learning_resource_id
            );
            return {
              ...y,
              resource_code: learning_resource?.code,
              resource_title: learning_resource?.title,
            };
          });

        const completed_records_length = learning_records.filter(
          (x) => x.learning_record_verb === "COMPLETE"
        ).length;
        return {
          ...u,
          learning_records: [...learning_records],
          total_records: learning_records.length,
          completed_records: completed_records_length,
        };
      });

      const sortedModdedUserDataAscending = moddedUserData.sort(
        (a, b) => b.completed_records - a.completed_records
      );
      const sortedModdedUserDataDescending = [
        ...sortedModdedUserDataAscending,
      ].reverse();

      setSortedUsersAsc(sortedModdedUserDataAscending);
      setSortedUsersDesc(sortedModdedUserDataDescending);
    }
    fetchData();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (!e.target.value) {
      setSearchResults([]);
      return;
    }

    const results = sortedUsersAsc.filter((u) => {
      const fullname = u.givenName + u.familyName;
      const searchTerm = e.target.value.toLocaleLowerCase();
      if (fullname.toLocaleLowerCase().includes(searchTerm)) {
        return u;
      }
    });
    setSearchResults(results);
  };
  return (
    <div>
      <header className="Header">
        <img
          src="https://blueflag.com.au/assets/logos/blueflag-logo.svg"
          width="130"
          alt="logo"
        />
      </header>
      <main className="Main">
        <h1>Search for users</h1>
        <div className="container">
          <UserSearchSection
            searchTerm={searchTerm}
            searchResults={searchResults}
            handleSearch={handleSearch}
          />
          <RecordRankingSection moddedResources={moddedResources} />
          <UserRankingSection
            sortedUsersAsc={sortedUsersAsc}
            sortedUsersDesc={sortedUsersDesc}
          />
        </div>
      </main>
    </div>
  );
}
