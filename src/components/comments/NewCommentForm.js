import { useRef } from 'react';
import {addComment} from "../../lib/api";
import useHttp from "../../hook/useHttp";
import LoadingSpinner from "../UI/LoadingSpinner";
import {useEffect} from "react"
import classes from './NewCommentForm.module.css';

const NewCommentForm = (props) => {
  const commentTextRef = useRef();
  const {sendRequest, status} = useHttp(addComment);
  const submitFormHandler = (event) => {
    event.preventDefault();
    const comment = commentTextRef.current.value;
    sendRequest({comment:{text:comment}, quoteId:props.quoteId})
  };

  const { onAddComment } = props;

  useEffect(()=> {
    if(status === 'completed'){
      onAddComment()
    }
  }, [status, onAddComment])

  if(status === 'pending'){
    return (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor='comment'>Your Comment</label>
        <textarea id='comment' rows='5' ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className='btn'>Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
