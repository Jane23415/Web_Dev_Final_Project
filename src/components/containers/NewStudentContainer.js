import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import NewStudentView from '../views/NewStudentView';
import { addStudentThunk } from '../../store/thunks';


class NewStudentContainer extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        console.log("student :", student)
        console.log("length: ", student.imageURL.length)
        if (student.imageURL.length === 0) {
          student.imageURL = "https://pwco.com.sg/wp-content/uploads/2020/05/Generic-Profile-Placeholder-v3.png"
        }
        
        let newStudent = await this.props.addStudent(student);

        console.log("student id:", newStudent.id)
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
        if(this.state.redirect) {
          return (<Redirect to={`/student/${this.state.redirectId}`}/>)
        }
        return (
          <NewStudentView 
            student = {this.state}
            handleChange = {this.handleChange} 
            handleSubmit={this.handleSubmit}      
          />
        );
    }
}

const mapDispatch = (dispatch) => {
    return({
        addStudent: (student) => dispatch(addStudentThunk(student)),
    })
}

export default connect(null, mapDispatch)(NewStudentContainer);