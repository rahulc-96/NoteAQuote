import { useState } from 'react';
import {getAllComments} from "../../lib/api";
import useHttp from "../../hook/useHttp";
import LoadingSpinner from "../UI/LoadingSpinner";
import {useEffect, useCallback} from "react"
import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import { useParams } from 'react-router-dom';
import CommentsList from '../comments/CommentsList'

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const {quoteId} = useParams();
  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };
  const {sendRequest:getComments, status, error, data:loadedComments} = useHttp(getAllComments)
  const addedCommentHandler = useCallback(() => {
       getComments(quoteId)
       setIsAddingComment(false)
  }, [getComments, quoteId])

  useEffect(() => {
    getComments(quoteId)
    setIsAddingComment(false)
  }, [getComments, quoteId])
  
  let comments;

  if(status === 'error'){
    comments = <p>{error}</p>
  }

  if(status === 'pending'){
    comments=
      <div className='centered'>
        <LoadingSpinner />
      </div>
  }

  if(status==='completed' && (!loadedComments || loadedComments.length === 0)){
    comments = <p>No Comments Found</p>
  }

  if(status==='completed'&& loadedComments && loadedComments.length > 0){
    comments = <CommentsList comments={loadedComments}/>
  }

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm onAddComment={addedCommentHandler} quoteId={quoteId}/>}
     {comments}
     </section>
  );
};

export default Comments;
