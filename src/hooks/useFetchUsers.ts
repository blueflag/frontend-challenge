import React, { useState, useEffect } from "react";

import { fetchUsers } from "../api";
import { User } from "../types";

export const useFetchUsers = (): [User[], boolean, Error | null] => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getUsers = async () => {
      setIsLoading(true);
      try {
        const fetchedUsers = await fetchUsers();
        setUsers(fetchedUsers);
      } catch (error: any) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    getUsers();
  }, []);

  return [users, isLoading, error];
};
