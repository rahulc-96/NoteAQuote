import { useHistory } from "react-router-dom";
import useHttp from "../../hook/useHttp";
import QuoteForm from "../quotes/QuoteForm";
import {addQuote} from "../../lib/api"
import { useEffect } from "react";
const NewQuote = () => {
  const history = useHistory();
  const {sendRequest,status} = useHttp(addQuote);

  useEffect(() => {
    if(status === 'completed'){
        history.push('/quotes')
    }
  },[status, history])
  const addNewQuoteHandler = (quote) => {
    sendRequest(quote)
  };
  return <QuoteForm isLoading ={status==='pending'} onAddQuote={addNewQuoteHandler} />;
};

export default NewQuote;
