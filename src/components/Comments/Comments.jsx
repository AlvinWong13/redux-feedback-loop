import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';

function Comments() {
  const dispatch = useDispatch();
  const history = useHistory();

  // capture local state
  const [comments, setComments] = useState('')

  const toSubmit = () => {
    dispatch({
      type: 'COMMENTS',
      payload: comments
    })
    history.push('/submit')
  }

  return(
    <div>
      <h1>Any comments you want to leave?</h1>
      <textarea
        id="comments"
        name="comments"
        placeholder="comments"
        onChange={event => setComments(event.target.value)}>  
      </textarea>
      <button onClick={() => toSubmit()}>Next</button>
    </div>
  )
}

export default Comments;