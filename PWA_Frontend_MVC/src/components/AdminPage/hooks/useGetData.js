
import { useEffect, useState, useCallback } from "react";

export const useGetData = (service, pageSize, current) => {
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [data, setData] = useState({
    data: [],
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0,
    },
  });

  const fetchingData = useCallback(() => {
    setLoading(true);
    setError(false);

    service({ pageSize, current })
      .then((response) => {
        const items =
          response.data ?? response.users ?? response.games ?? [];

        const pagination = response.pagination ?? {};

        if (response.auth !== false) {
          setData({
            data: items,
            pagination: {
              current: current || 1,
              pageSize: pagination.pageSize || 10,
              total: pagination.total ?? items.length,
            },
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [service, pageSize, current]);

  useEffect(() => {
    fetchingData();
  }, [fetchingData]);

  return {
    data,
    isError,
    isLoading,
    load: fetchingData,
  };
};
