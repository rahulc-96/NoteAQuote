import QuoteList from "../quotes/QuoteList";
import { getAllQuotes } from "../../lib/api";
import useHttp from "../../hook/useHttp";
import LoadingSpinner from "../UI/LoadingSpinner";
import React, { useEffect } from "react";
import NoQuotesFound from "../quotes/NoQuotesFound";

const AllQuotes = () => {
  const {
    sendRequest: loadQuotes,
    data: loadedQuotes,
    error,
    status,
  } = useHttp(getAllQuotes, true);
  useEffect(() => {
    loadQuotes();
  }, [loadQuotes]);

  if (error) {
    return (
      <div className="centered">
        <h3>{error}</h3>
      </div>
    );
  }

  if (status === "pending") {
    return (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedQuotes || loadedQuotes.length === 0) {
    return <NoQuotesFound />;
  }

  return <QuoteList quotes={loadedQuotes} />;
};

export default AllQuotes;
