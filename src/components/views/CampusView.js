import { Link } from "react-router-dom";

const CampusView = (props) => {
  const {campus} = props;
  return (
    <div>      
      <h1>{campus.name}</h1>
      {/* <p>ImageURL: </p> */}
      <img width="25%" height="25%" alt= "campus" src={campus.imageURL}/>
      <p>Description: {campus.description}</p>
      <p>Address: {campus.address}</p>
      <p>Students:
        {campus.students.length === 0 && <p>There are no students.</p> }
        <ul>
        {campus.students.map( student => {
          let name = student.firstname + " " + student.lastname;
          return (
            <Link to={`/student/${student.id}`}>
              <li key={student.id}>{name}</li>
            </Link>
          );
        })}
        </ul>
      </p>
      <Link to ={'/campuses'}>Back</Link>
    </div>
  );

};

export default CampusView;