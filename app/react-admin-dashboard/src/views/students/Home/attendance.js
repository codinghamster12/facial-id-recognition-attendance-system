import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAttendance } from "../../../actions";
import Table from "../../../components/Table";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  tableRow:{
    fontSize: '16px',
    letterSpacing: '0.1rem'
    
  }
 
}));

const Attendance = (res) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.attendance);
  const classes = useSelector((state) => state.class);
  const id = res.match.params["id"];
  const [classObj, setClassObj] = useState({});
  const styles= useStyles();


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

  // useEffect(async () => {
  //   await classInfo()
  //  }, [])

  const user = localStorage.getItem("user");

  useEffect(() => {
    console.log(user);
    console.log(id);
    dispatch(getAttendance(user, id));
    classInfo();


  }, []);



  const classInfo =  () => {
    let classObj={}
    const c = classes.classes.find((x) => x.id == id);

    // for (let c in classes.classes) {

    //   if (c.id === id) {

    classObj["TITLE"] = c.crs_id.crs_title;
    classObj["COURSE CREDIT"] = c.crs_id.crs_credit;
    classObj["PROFESSOR"] = `${c.prof_id.first_name} ${c.prof_id.last_name}`;
    classObj["CLASS"] = `BSE ${c.class_semester} ${c.class_section}`
  

    setClassObj(classObj)


    //   }
    // }
    // console.log(obj);
  };


  // useEffect(() => {
    
  //   console.log(id);

  //   dispatch(getAttendance(user, id));
  //   console.log(data);
  // }, []);

  const columns = [
    { id: "date", label: "DATE", minWidth: 170 },

    {
      id: "totalHours",
      label: "TOTAL HOURS",
      minWidth: 170,
      align: "right",
    },
    {
      id: "presentHours",
      label: "PRESENT HOURS",
      minWidth: 170,
      align: "right",
    },
    {
      id: "absentHours",
      label: "ABSENT HOURS",
      minWidth: 170,
      align: "right",
    },
  ];
  const createRows = (date, totalHours, presentHours, absentHours) => {
    return { date, totalHours, presentHours, absentHours };
  };

  const rows = [];

  const makeRows = () => {
    data.attendance.map((row) => {
      const { currDate, isEntered } = row;
      const totalHours = 1;
      const presentHours = isEntered ? 1 : 0;
      const absentHours = isEntered ? 0 : 1;

      rows.push(createRows(currDate, totalHours, presentHours, absentHours));
    });
  };

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
      <div style={{background: '#ffe9ec'}} className="table">
        <table className="table table-hover">
          <tbody>
            
            {Object.keys(classObj).map((key) => {
              return(
                
                <tr className={styles.tableRow}>
                  <th key={`tablevalue-${key}`}>{key}</th>
                  <td key={`tablevalue-${classObj[key]}`}>{classObj[key]}</td>
                </tr>
              )

            })}
            
            {/* {classObj.title} */}
        
           
          </tbody>
        </table>
      </div>
      <br />
      <Table columns={columns} rows={rows}></Table>
      {/* {classInfo()} */}
      {makeRows()}
    
    </>
  );
};

export default Attendance;
