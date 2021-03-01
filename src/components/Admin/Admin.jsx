import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

// set up for styling
import swal from 'sweetalert';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import FlagIcon from '@material-ui/icons/Flag';

function Admin() {
  const dispatch = useDispatch();
  // to switch color of flag when clicked in local state
  const adminReducer = useSelector(store => store.adminReducer)

  // on page load 
  useEffect(() => {
    getFeedback();
  }, []);

  // get feedback from DB
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

  // delete one feedback from DB
  // and alert to confirm deletion
  const handleDelete = (deleteId) => {
    const id = Number(deleteId);
    swal({
      title: "Are you sure?",
      text: "This will remove the feedback forever",
      icon: "warning",
      button: "OK",
    })
    .then(remove => {
      if (remove) {
        console.log('delete', id);
        axios.delete(`/feedback/${id}`)
        .then(response => {
          console.log(response)
          getFeedback()
        })
        .catch(err => {
          console.log(err)
        })
      }
      else {
        console.log('unable to delete')
        return
      }
    })
  }

  // flag feedback for review
  const flagged = (editId) => {
    const id = Number(editId);
    axios.put(`/feedback/${id}`, id )
    .then(response => {
      console.log(response)
      getFeedback()
    })
    .catch(err => {
      console.log(err)
    })
  }

  return(
    <div>
      <h1>Admin Portal</h1>
      <table>
        <thead>
            <tr>
                <th>Flag</th>
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
                        <td><IconButton
                              color={ feedback.flagged ? "secondary" : "primary" }
                              variant="outlined"
                              onClick={() => flagged(feedback.id)}>
                              <FlagIcon />
                            </IconButton>
                        </td>
                        <td>{feedback.feeling}</td>
                        <td>{feedback.understanding}</td>
                        <td>{feedback.support}</td>
                        <td>{feedback.comments}</td>
                        <td><IconButton
                              variant="contained"
                              color="secondary"
                              onClick={() => handleDelete(feedback.id)}>
                              <ClearIcon />
                            </IconButton></td>
                    </tr>
                )
            })}
        </tbody>
      </table>
    </div>
  )
}

export default Admin;