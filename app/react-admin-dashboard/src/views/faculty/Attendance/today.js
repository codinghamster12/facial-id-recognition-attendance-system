import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { CButton } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import Modal from "../../../components/Modals";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  getClasses,
  getTodayAttendance,
  Updateattendance,
} from "../../../actions";
import axios from "../../../helpers/axios";

const TodayAttendance = (res) => {
  const data = useSelector((state) => state.classAttendance);
  const [show, setShow] = useState(false);

  console.log(data);
  const [targets, setTargets] = React.useState({});
  const dispatch = useDispatch();
  const id = res.match.params["id"];
  var attendance_list = [];
  let history = useHistory();

  const goBack = () => {
    let path = "/faculty/classes/";
    history.push(path);
  };

  function refreshPage() {
    window.location.reload();
  }

  const handleChange = (e, id, classatd) => {
    // setTargets({
    //   ...targets,
    //   [`${e.target.name}`]: e.target.value,
    var obj = {};
    var isEntered = e.target.value == `present${id}` ? true : false;
    obj["id"] = id;
    obj["isEntered"] = isEntered;
    if (isEntered) {
      obj["classatd"] = 100;
    } else {
      obj["classatd"] = 0;
    }
    attendance_list.push(obj);
    console.log(attendance_list);
  };

  const handleClickOpen = () => {
    setShow(true);
  };

  const handleClickClose = () => {
    setShow(false);
  };

  const displayModal = () => {
    return (
      <Modal
        show={show}
        setShow={setShow}
        color={"success"}
        title={"SUCCESS"}
        onClick={refreshPage}
      >
        Attendance updated successfully
      </Modal>
    );
  };

  const updateAttendance = () => {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `Token ${token}`,
    };

    axios
      .put(`/classes/updateattendance/`, attendance_list, { headers: headers })
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          handleClickOpen();
        }
      })
      .catch((err) => console.log(err));

    axios
      .get(`/classes/sendemail/${id}/`, { headers: headers })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    console.log(id);
    dispatch(getTodayAttendance(id));
    console.log(data);
  }, []);

  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

  const classes = useStyles();

  return (
    <>
      <div>
        <CButton
          type="submit"
          size="md"
          color="secondary"
          onClick={goBack}
          style={{ float: "left" }}
        >
          <CIcon name="cil-arrow-thick-left" />
        </CButton>
      </div>
      <br />
      <div></div>
      <br />
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
            {data.today && data.today.length > 0
              ? data.today.map(({ id, student_id, classatd, isEntered }) => {
                  return (
                    <TableRow key={id}>
                      <TableCell component="th" scope="row">
                        <p style={{ fontSize: "12px", color: "red" }}>
                          {classatd > 0 && classatd < 34
                            ? "Student was present in only one of the snaps."
                            : null}
                        </p>
                        {`${student_id.first_name} ${student_id.last_name}`}
                      </TableCell>
                      <TableCell>
                        <RadioGroup
                          row
                          aria-label={`attendance${id}`}
                          name={`attendance${id}`}
                          value={targets[`attendance${id}`]}
                          onChange={(e) => handleChange(e, id, classatd)}
                          defaultValue={
                            isEntered ? `present${id}` : `absent${id}`
                          }
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
                  );
                })
              : null}
          </TableBody>
        </Table>
      </TableContainer>
      <CButton
        type="submit"
        size="md"
        color="primary"
        onClick={updateAttendance}
        style={{ float: "right", marginTop: "10px", letterSpacing: '0.2rem' }}
        
   
      >
        SUBMIT
      </CButton>{" "}
      {displayModal()}
    </>
  );
};

export default TodayAttendance;
