import React, {
  useState,
  useEffect,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";
import { UsersTypes } from "../types/UsersTypes";
import { ResourcesTypes } from "../types/ResourcesTypes";
import { RecordsTypes } from "../types/RecordsTypes";

interface ContextType {
  users: UsersTypes[];
  resources: ResourcesTypes[];
  records: RecordsTypes[];
  setUsers: Dispatch<SetStateAction<UsersTypes[]>>;
  setResources: Dispatch<SetStateAction<ResourcesTypes[]>>;
  setRecords: Dispatch<SetStateAction<RecordsTypes[]>>;
}
const DatasContext = createContext<ContextType | null>(null);

const DatasContextProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [users, setUsers] = useState<UsersTypes[]>([]);
  const [resources, setResources] = useState<ResourcesTypes[]>([]);
  const [records, setRecords] = useState<RecordsTypes[]>([]);

  // users fetch
  useEffect(() => {
    async function fetchUsers(url: string) {
      const response = await fetch(url);

      if (response.ok) {
        return response.json();
      }
    }

    fetchUsers("http://localhost:3000/users.json").then((res) => setUsers(res));
  }, []);

  // resources fetch
  useEffect(() => {
    async function fetchResources(url: string) {
      const response = await fetch(url);

      if (response.ok) {
        return response.json();
      }
    }

    fetchResources("http://localhost:3000/learning-resources.json").then(
      (res) => setResources(res)
    );
  }, []);

  // records fetch
  useEffect(() => {
    async function fetchResources(url: string) {
      const response = await fetch(url);

      if (response.ok) {
        return response.json();
      }
    }

    fetchResources("http://localhost:3000/learning-records.json").then((res) =>
      setRecords(res)
    );
  }, []);

  const datasObj = {
    users: users,
    resources: resources,
    records: records,
    setUsers: setUsers,
    setResources: setResources,
    setRecords: setRecords,
  };

  return (
    <DatasContext.Provider value={datasObj}>{children}</DatasContext.Provider>
  );
};

export { DatasContext, DatasContextProvider };
