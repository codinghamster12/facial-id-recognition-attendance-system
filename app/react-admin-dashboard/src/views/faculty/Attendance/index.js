import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getClassAttendance } from '../../../actions'
import { CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { CChartDoughnut } from '@coreui/react-chartjs'
import 'react-datepicker/dist/react-datepicker.css'
import { useHistory } from 'react-router-dom'
import Moment from 'moment'
import Table from '../../../components/Table'
import Dropdown from 'src/components/Dropdown'
import Modal from '../../../components/Modals'

const Attendance = (res) => {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.classAttendance)
  const [filteredRows, setFilteredRows] = useState([])
  let history = useHistory()
  const [show, setShow] = useState(false)

  useEffect(() => {
    const id = res.match.params['id']
    // console.log(id);

    dispatch(getClassAttendance(id))
    // console.log(data);
  }, [])

  const columns = [
    { id: "fullName", label: "NAME", minWidth: 170 },

    {
      id: "totalHours",
      label: "TOTAL HOURS",
      minWidth: 170,
      align: 'right',
    },
    {
      id: "presentHours",
      label: "PRESENT HOURS",
      minWidth: 170,
      align: 'right',
    },
    {
      id: "absentHours",
      label: "ABSENT HOURS",
      minWidth: 170,
      align: 'right',
    },
    {
      id: "percent_attd",
      label: "PERCENTAGE ATTENDANCE",
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
  ]

  const createRows = (
    firstName,
    lastName,
    totalHours,
    presentHours,
    absentHours,
  ) => {
    const fullName = `${firstName} ${lastName}`

    const percent_attd = totalHours != 0 ? (presentHours / totalHours) * 100 : 0
    return { fullName, totalHours, presentHours, absentHours, percent_attd }
  }

  const rows = []

  const makeRows = (data) => {
    data.map((row) => {
      const { firstName, lastName, totalHours, presentHours, absentHours } = row

      rows.push(
        createRows(firstName, lastName, totalHours, presentHours, absentHours),
      )
    })
  }
  const chartdata = []
  const count = () => {
    let above = []
    let below = []
    above = rows.filter((row) => row.percent_attd >= 75)
    below = rows.filter((row) => row.percent_attd < 75)
    let counta = above.length
    let countb = below.length
    console.log(counta)
    console.log(countb)
    chartdata.push(counta)
    chartdata.push(countb)
    console.log(chartdata)
  }

  const doughnut = {
    labels: ['Attendance is 75% or above', 'Attendance is below 75%'],
    datasets: [
      {
        data: chartdata,

        backgroundColor: ['#FF6384', '#36A2EB'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB'],
      },
    ],
  }
  const handleClickOpen = () => {
    setShow(true)
  }

  const displayModal = () => {
    return (
      <Modal show={show} setShow={setShow} color={'secondary'} title={'Chart'}>
        <CChartDoughnut datasets={doughnut.datasets} labels={doughnut.labels} />
      </Modal>
    )
  }

  const filter = (val) => {
    let filtered = []
    if (val == 'gte75') {
      filtered = rows.filter((row) => row.percent_attd >= 75)
    } else if (val == 'lt75') {
      filtered = rows.filter((row) => row.percent_attd < 75)
    } else if (val == 'all') {
      filtered = []
    }
    console.log(filtered)
    setFilteredRows(filtered)
  }

  const items = [
    {
      label: 'Attendance is 75% or above',
      path: '#',
      val: 'gte75',
    },
    {
      label: 'Attendance is below 75%',
      path: '#',
      val: 'lt75',
    },
    {
      label: 'All Attendance',
      path: '#',
      val: 'all',
    },
  ]

  return (
    <>
      <Dropdown
        label={'Filter Pupils'}
        icon={'cil-filter'}
        items={items}
        filter={filter}
        style={{ float: 'right' }}
      ></Dropdown>
      <CButton
        type="submit"
        size="md"
        color="secondary"
        onClick={handleClickOpen}
        style={{ float: 'left' }}
      >
        <CIcon name="cil-scrubber" />
        View Chart
      </CButton>
      {filteredRows.length > 0 ? (
        <Table columns={columns} rows={filteredRows}></Table>
      ) : (
        <Table columns={columns} rows={rows}></Table>
      )}
    <div className="d-flex justify-content-around">
    <Dropdown
        label={"FILTER"}
        icon={"cil-filter"}
        items={items}
        filter={filter}
        
      ></Dropdown>
      
    </div>
    <br/>
    <br/>
  
       
      {filteredRows.length > 0 ?<Table columns={columns} rows={filteredRows}></Table> :<Table columns={columns} rows={rows}></Table>}
      {makeRows(data.attendance)}
      {count()}
      {displayModal()}
    </>
  )
}

export default Attendance
