import React from "react";
import { useParams, Route, Link, useRouteMatch } from "react-router-dom";
import Comments from "../comments/Comments";
import HighlightedQuote from "../quotes/HighlightedQuote";
import NoQuotesFound from "../quotes/NoQuotesFound";
import { getSingleQuote } from "../../lib/api";
import useHttp from "../../hook/useHttp";
import LoadingSpinner from "../UI/LoadingSpinner";
import {useEffect} from "react"

const QuoteDetail = () => {
  const {quoteId} = useParams();
  const match = useRouteMatch();
  const {
    sendRequest: loadQuote,
    data: loadedQuote,
    error,
    status,
  } = useHttp(getSingleQuote, true);

  useEffect(() => {
    loadQuote(quoteId)
  },[loadQuote,quoteId])

  if (!loadedQuote && status==='completed') {
    return <NoQuotesFound />;
  }

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

  return (
    <React.Fragment>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <Route path={match.path} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            View Comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </React.Fragment>
  );
};

export default QuoteDetail;
