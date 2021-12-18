import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import img from './redx.png';

const AllCampusesView = (props) => {
  const {deleteCampus} = props;

  if (!props.allCampuses.length) {
    return (
    <div>
      <p>There are no campuses.</p>
      <Link to={`newcampus`}>
        <button>Add New Campus</button>
      </Link>
    </div>
    );
  }

  return (
    <div>
      {props.allCampuses.map((campus) => (
        <div key={campus.id}>
          <Link to={`/campus/${campus.id}`}>
            <h1>{campus.name}</h1>
          </Link>
          <p>{campus.description}</p>
          <img src = {img} width={25} height={25}  onClick={() => deleteCampus(campus.id)}/>
        </div>
      ))}
      <Link to={`/newcampus`}>
        <button>Add New Campus</button>
      </Link>
      <br></br>
      <Link to={`/`}>Home</Link>
    </div>
  );
};

AllCampusesView.propTypes = {
  allCampuses: PropTypes.array.isRequired,
};

export default AllCampusesView;