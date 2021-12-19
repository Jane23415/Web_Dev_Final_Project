import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import EditStudentView from '../views/EditStudentView';
import { editStudentThunk, fetchStudentThunk} from '../../store/thunks'; 


class NewStudentContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
          firstname: "", 
          lastname: "",
          imageURL: "",
          email: "",
          gpa: "",
          campusId: "", 
          redirect: false, 
          redirectId: null
        };
    }
    
    componentDidMount() {
        //getting student ID from url
        console.log(this.props.match.id)
        this.props.fetchStudent(this.props.match.params.id);
        console.log(this.props.student)
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
            student = {this.props.student}
            handleChange = {this.handleChange} 
            handleSubmit={this.handleSubmit}      
          />
        );
    }
}

const mapState = (state) => {
    console.log("inside mapstate:", state)
    return {
      student: state.student,
    };
}


const mapDispatch = (dispatch) => {
    return({
        fetchStudent: (id) => dispatch(fetchStudentThunk(id)),
        editStudent: (student) => dispatch(editStudentThunk(student)),
    })
}

export default connect(null, mapDispatch, mapState)(NewStudentContainer);