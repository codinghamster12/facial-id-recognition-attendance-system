import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAttendance } from '../../../actions'
import Table from '../../../components/Table'
import { makeStyles } from '@material-ui/core/styles'
import { CChartDoughnut } from '@coreui/react-chartjs'
import Modal from '../../../components/Modals'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { CButton } from '@coreui/react'
import CIcon from '@coreui/icons-react'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}))

const Attendance = (res) => {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.attendance)
  const classes = useSelector((state) => state.class)
  const id = res.match.params['id']
  const [show, setShow] = useState(false)
  let obj = {}

  // var course,course_credit,stclass;
  // var prof;
  // console.log(classes)
  // const id=res.match.params['id']
  // // for(let i=0;i<classes.classes.length;i++)
  // // {
  // //   if(classes.classes[i].id==id)
  // //   {
  // //     course = classes.classes[i].crs_id.crs_title;
  // //     course_credit = classes.classes[i].crs_id.crs_credit;
  // //     var section = classes.classes[i].class_section;
  // //     var semester = classes.classes[i].class_semester;
  // //     stclass = semester+" "+section;
  // //     var prof_firstname = classes.classes[i].prof_id.first_name;
  // //     var prof_lastname = classes.classes[i].prof_id.last_name;
  // //     prof= prof_firstname+" "+prof_lastname;

  // //   }
  // // }
  // // function createData(name, calories, fat, carbs, protein) {
  // //   return { name, calories, fat, carbs, protein };
  // // }

  const classInfo = () => {
    const c = classes.classes.find((x) => x.id == id)

    // for (let c in classes.classes) {

    //   if (c.id === id) {

    obj['title'] = c.crs_id.crs_title
    obj['crs_credit'] = c.crs_id.crs_credit
    obj['prof_name'] = `${c.prof_id.first_name} ${c.prof_id.last_name}`
    obj['section'] = c.class_section
    obj['semester'] = c.class_semester

    //   }
    // }
    console.log(obj)
  }

  const user = localStorage.getItem('user')

  useEffect(() => {
    console.log(id)

    dispatch(getAttendance(user, id))
    console.log(data)
  }, [])

  const columns = [
    { id: 'date', label: 'Date', minWidth: 170 },

    {
      id: 'totalHours',
      label: 'Total Hours',
      minWidth: 170,
      align: 'right',
    },
    {
      id: 'presentHours',
      label: 'Present Hours',
      minWidth: 170,
      align: 'right',
    },
    {
      id: 'absentHours',
      label: 'Absent Hours',
      minWidth: 170,
      align: 'right',
    },
  ]

  let counta = 0
  let countb = 0
  let count = []
  const createRows = (date, totalHours, presentHours, absentHours) => {
    counta += presentHours
    countb += absentHours

    return { date, totalHours, presentHours, absentHours }
  }

  const doughnut = {
    labels: ['Present Hours', 'Absent Hours'],
    datasets: [
      {
        data: count,

        backgroundColor: ['#FF6384', '#36A2EB'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB'],
      },
    ],
  }

  const rows = []

  const makeRows = () => {
    data.attendance.map((row) => {
      const { currDate, isEntered } = row
      const totalHours = 1
      const presentHours = isEntered ? 1 : 0
      const absentHours = isEntered ? 0 : 1

      rows.push(createRows(currDate, totalHours, presentHours, absentHours))
    })
  }

  const countfn = () => {
    count.push(counta)
    count.push(countb)
    console.log(count)
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

  // const datarows = [
  //   {
  //     id: 1,
  //     Title: course,
  //     Professor : prof,
  //     Credit_Hours: course_credit,
  //     Class: stclass
  //   },
  // ];

  // const makesRows = () => {
  //     const course_name = course;
  //     const crs_credit= course_credit;
  //     const prof = prof_fullname;
  //     const sem= class_semester;
  //     const sec= class_section;
  //     const stclass= sem+" "+sec;

  //     classrows.push("Title",course_name,"Teacher Name",prof)
  //     classrows.push("Credit Hours",crs_credit,"Class",stclass)

  //   }

  return (
    <>
      <div className="table">
        <table className="table table-hover">
          <tbody>
            <tr>
              <th>Key</th>
              <th>Value</th>
            </tr>

            {/* {obj.map(({ key, value }) => (
              <tr className="table-row">
                <td key={`tablevalue-${key}`}>{key}</td>
                <td key={`tablevalue-${value}`}>{value}</td>
              </tr>
            ))} */}
            {console.log('object print', obj)}

            {Object.entries(obj).forEach(([key, value]) => {
              console.log(`Key value pairs ${key} ${value}`) // "a 5", "b 7", "c 9"
            })}
          </tbody>
        </table>
      </div>
      <br />
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
      <Table columns={columns} rows={rows}></Table>

      {/* <CRow>
        <CCol xs="12" lg="12">
          <CCard>
            <CCardHeader>
              Student Attendance
             
            </CCardHeader>

            <CCardBody>
              <table className="table table-hover table-outline mb-0 d-none d-sm-table">
                <thead className="thead-light">
                  <tr color="gradient-primary">
                    <th>Date</th>
                    <th>Attendance</th>
                   
                   
                  </tr>
                </thead>

                <tbody>
                  {data.attendance.map(({ id,currDate,isEntered }) => (
                    <tr key={id}>
                      <td>
                        <div>{currDate}</div>
                      </td>
                      <td>
                        <div>{isEntered?1:0}</div>
                      </td>
                     
                     
                    </tr>
                  ))}
                </tbody>
              </table>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow> */}

      {makeRows()}
      {classInfo()}
      {countfn()}
      {displayModal()}
    </>
  )
}

export default Attendance
