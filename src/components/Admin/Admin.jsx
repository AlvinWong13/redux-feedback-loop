import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';

import swal from 'sweetalert';
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import FlagIcon from '@material-ui/icons/Flag';

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

  const flag = (editId) => {
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
                        <td><Button
                              startIcon={<FlagIcon />}
                              variant="contained"
                              color="primary"
                              onClick={() => flag(feedback.id)}>
                            </Button>
                        </td>
                        <td>{feedback.feeling}</td>
                        <td>{feedback.understanding}</td>
                        <td>{feedback.support}</td>
                        <td>{feedback.comments}</td>
                        <td><Button
                              startIcon={<DeleteForeverIcon />}
                              variant="contained"
                              color="secondary"
                              onClick={() => handleDelete(feedback.id)}>
                            Delete</Button></td>
                    </tr>
                )
            })}
        </tbody>
      </table>
    </div>
  )
}

export default Admin;