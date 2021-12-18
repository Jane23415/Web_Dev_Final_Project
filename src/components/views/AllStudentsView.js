import { Link } from "react-router-dom";
import img from './redx.png';

const AllStudentsView = (props) => {
  const {students, deleteStudent} = props;

  if (!students.length) {
    return (
    <div>
      <p>There are no students.</p>
      <Link to={`newstudent`}>
        <button>Add New Student</button>
      </Link>
    </div>
    );
  }
  
  return (
    <div>
      {students.map((student) => {
        let name = student.firstname + " " + student.lastname;
        return (
          <div key={student.id}>
          <Link to={`/student/${student.id}`}>
            <h1>{name}</h1>
          </Link>
          <img src = {img} width={25} height={25}  onClick={() => deleteStudent(student.id)}/>
          </div>
        );
      }
      )}
      <Link to={`/newstudent`}>
        <button>Add New Student</button>
      </Link>
      <br></br>
      <Link to={`/`}>Home</Link>
    </div>
  );
};


export default AllStudentsView;