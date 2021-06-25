import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import Modal from '../../../components/Modals'
import { useSelector, useDispatch } from 'react-redux'
import { getTodayAttendance, Updateattendance } from '../../../actions'
import axios from '../../../helpers/axios'

const TodayAttendance = (res) => {
  const data = useSelector((state) => state.classAttendance)
  const [show, setShow] = useState(false)

  console.log(data)
  const [targets, setTargets] = React.useState({})
  const dispatch = useDispatch()
  const id = res.match.params['id']
  var attendance_list = []

  const handleChange = (e, id) => {
    // setTargets({
    //   ...targets,
    //   [`${e.target.name}`]: e.target.value,
    var obj = {}
    var isEntered = e.target.value == `present${id}` ? true : false
    obj['id'] = id
    obj['isEntered'] = isEntered
    attendance_list.push(obj)
    console.log(attendance_list)
  }

  const handleClickOpen = () => {
    setShow(true)
  }

  const displayModal = () => {
    return (
      <Modal show={show} setShow={setShow} color={'success'} title={'SUCCESS'}>
        Attendance updated successfully
      </Modal>
    )
  }

  const updateAttendance = () => {
    const token = localStorage.getItem('token')

    const headers = {
      Authorization: `Token ${token}`,
    }

    axios
      .put(`/classes/updateattendance/`, attendance_list, { headers: headers })
      .then((res) => {
        console.log(res)
        if (res.status == 200) {
          handleClickOpen()
        }
      })
      .catch((err) => console.log(err))

    axios
      .get(`/classes/sendemail/${id}/`, { headers: headers })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    console.log(id)
    dispatch(getTodayAttendance(id))
    console.log(data)
  }, [])

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  })

  const classes = useStyles()

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              {/* <TableCell>Registration Number</TableCell> */}
              <TableCell>Attendance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.attendance.map(({ id, student_id, isEntered }) => {
              return (
                <TableRow key={id}>
                  <TableCell component="th" scope="row">
                    {`${student_id.first_name} ${student_id.last_name}`}
                  </TableCell>
                  {/* <TableCell>{row.calories}</TableCell> */}
                  <TableCell>
                    <RadioGroup
                      row
                      aria-label={`attendance${id}`}
                      name={`attendance${id}`}
                      value={targets[`attendance${id}`]}
                      onChange={(e) => handleChange(e, id)}
                      defaultValue={isEntered ? `present${id}` : `absent${id}`}
                    >
                      <FormControlLabel
                        value={`present${id}`}
                        control={<Radio />}
                        label="Present"
                      />
                      <FormControlLabel
                        value={`absent${id}`}
                        control={<Radio />}
                        label="Absent"
                      />
                    </RadioGroup>
                  </TableCell>
                  {/* <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell> */}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <CButton
        type="submit"
        size="md"
        color="primary"
        onClick={updateAttendance}
        style={{ float: 'right', marginTop: '10px' }}
      >
        <CIcon name="cil-scrubber" /> Submit
      </CButton>{' '}
      {displayModal()}
    </>
  )
}

export default TodayAttendance
