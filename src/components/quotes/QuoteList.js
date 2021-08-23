import { Fragment } from 'react';
import { useHistory, useLocation} from 'react-router-dom';

import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';


const QuoteList = (props) => {
  const sortQuotes = (quotes, ascending) => {
    return quotes.sort((quoteA, quoteB) => {
      if (ascending) {
        return quoteA.id > quoteB.id ? 1 : -1;
      } else {
        return quoteA.id < quoteB.id ? 1 : -1;
      }
    });
  };
  const history = useHistory();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search)
  const isAscending = queryParams.get('sort') === 'asc' ? true: false;
  const sortedQuotes = sortQuotes(props.quotes, isAscending);
  const sortingHandler = () => {
    history.push(`${location.pathname}?sort=${!isAscending  ? 'asc': 'desc'}`);
  }
  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={sortingHandler}>
          Sort {!isAscending ? "Ascending" : "Descending"} 
        </button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
