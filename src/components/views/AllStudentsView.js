import { Link } from "react-router-dom";

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
          <button onClick={() => deleteStudent(student.id)}>X - Delete</button>

          <br/>
          <Link to={`/student/${student.id}/edit`}>
            <button>Edit</button>
          </Link>
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