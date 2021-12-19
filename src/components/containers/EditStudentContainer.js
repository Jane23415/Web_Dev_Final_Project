import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";


import EditStudentView from '../views/EditStudentView';
import { editStudentThunk, fetchStudentThunk} from '../../store/thunks'; 


class EditStudentContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
          student: this.props.student,
          redirect: false, 
          redirectId: null
        };
    }
    
    componentDidMount() {
        //getting student ID from url

        const studentId = this.props.match.params.id;
        this.props.fetchStudent(studentId);
        
        
    }

    handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        });
    }


    handleSubmit = async event => {
        event.preventDefault();
        let student = {
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          imageURL: this.state.imageURL,
          email: this.state.email,
          gpa: this.state.gpa,
          campusId: this.state.campusId
        };

        if (student.imageURL.length === 0) {
          student.imageURL = "https://pwco.com.sg/wp-content/uploads/2020/05/Generic-Profile-Placeholder-v3.png"
        }
        
        let newStudent = await this.props.editStudent(student);

        this.setState({
          firstname: "", 
          lastname: "", 
          imageURL: "",
          email: "",
          gpa: "",
          campusId: null, 
          redirect: true, 
          redirectId: newStudent.id
        });
    }

    componentWillUnmount() {
        this.setState({redirect: false, redirectId: null});
    }

    render() {
        return (
          <EditStudentView 
            studentInfo = {this.state}
            handleChange = {this.handleChange} 
            handleSubmit={this.handleSubmit}      
          />
        );
    }
}



const mapState = (state) => {
    return {
      student: state.student,
    };
  };
  

const mapDispatch = (dispatch) => {
    return({
        fetchStudent: (id) => dispatch(fetchStudentThunk(id)),
        editStudent: (student) => dispatch(editStudentThunk(student)),
    })
}

EditStudentContainer.propTypes = {
    fetchStudent: PropTypes.func.isRequired,
    editStudent: PropTypes.func.isRequired,
};

export default connect(mapState, mapDispatch)(EditStudentContainer);