import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';

import swal from 'sweetalert';

function Admin() {
  const dispatch = useDispatch();
  const history = useHistory();
  const adminReducer = useSelector(store => store.adminReducer)

  useEffect(() => {
    getFeedback();
  }, []);

  const getFeedback = () => {
    axios.get('/feedback')
    .then(response => {
      console.log(response.data);
      dispatch({
        type: 'GET_FEEDBACK',
        payload: response.data
      })
    })
  }
  return(
    <div>
      <h1>Admin Portal</h1>
      <table>
        <thead>
            <tr>
                <th>Feeling?</th>
                <th>Understanding?</th>
                <th>Supported?</th>
                <th>Comments</th>
                <th>Delete</th>
            </tr>
        </thead>
        <tbody>
            {adminReducer.map(feedback => {
                return (
                    <tr key={feedback.id} className={feedback.flagged.toString()}>
                        <td>{feedback.feeling}</td>
                        <td>{feedback.understanding}</td>
                        <td>{feedback.support}</td>
                        <td>{feedback.comments}</td>
                    </tr>
                )
            })}
        </tbody>
      </table>
    </div>
  )
}

export default Admin;