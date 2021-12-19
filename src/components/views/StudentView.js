import { Link } from "react-router-dom";

const StudentView = (props) => {
  const { student } = props;
  return (
    <div>
      <h1>{student.firstname + " " + student.lastname}</h1>
      <img width="10%" height="10%" alt="student" src={student.imageURL}/>
      {student.campus === null 
      ? <h3>Not enrolled in a campus!</h3>
      : <Link to={`/campus/${student.campus.id}`}>
        <h3>{student.campus.name}</h3>
      </Link>
      }
      <h3>GPA: {student.gpa}</h3>
      <h3>Email: {student.email}</h3>
      <br/>
      <Link to ={'/students'}>Back</Link>
    </div>
  );

};

export default StudentView;