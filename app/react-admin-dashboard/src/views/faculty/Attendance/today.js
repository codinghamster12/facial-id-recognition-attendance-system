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

import { useSelector, useDispatch } from "react-redux";
import { getTodayAttendance } from "../../../actions";

const TodayAttendance = (res) => {
  const data = useSelector((state) => state.classAttendance);

  console.log(data);
  const [targets, setTargets] = React.useState({});
  const dispatch = useDispatch();


  const handleChange = (e) => {
    setTargets({...targets, [`${e.target.name}`]: e.target.value});
    console.log('Targets',targets)

  };

  useEffect(() => {
    const id = res.match.params["id"];
    console.log(id)
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
          {data.attendance.map(({id,student_id,isEntered}) => {
            return(
          
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
                  onChange = {handleChange}
                  defaultValue={isEntered ? `present${id}` : `absent${id}`}
                >
                  <FormControlLabel
                    value= {`present${id}`}
                    control={<Radio />}
                    label="Present"
                    
                  />
                  <FormControlLabel
                    value= {`absent${id}`}
                    control={<Radio />}
                    label="Absent"

                  />
                </RadioGroup>
              </TableCell>
              {/* <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell> */}
            </TableRow>
          )})}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TodayAttendance;
