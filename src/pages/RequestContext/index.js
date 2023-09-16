import React, { createContext, useContext, useState } from 'react';

const RequestContext = createContext();

export const RequestProvider = ({ children }) => {
  const [requests, setRequests] = useState([]);
  const [completedRequests, setCompletedRequests] = useState([]);

  const handleNewRequest = (newRequest) => {
    if (newRequest.status === 'finalizado') {
      setCompletedRequests([...completedRequests, newRequest]);
      setRequests(
        requests.filter(
          (request) => request.numeroPatrimonio !== newRequest.numeroPatrimonio,
        ),
      );
    } else {
      setRequests([...requests, newRequest]);
    }
  };

  return (
    <RequestContext.Provider
      value={{ requests, completedRequests, handleNewRequest }}
    >
      {children}
    </RequestContext.Provider>
  );
};

export const useRequest = () => {
  return useContext(RequestContext);
};
