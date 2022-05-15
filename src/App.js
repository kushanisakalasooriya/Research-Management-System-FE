import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/navbar.component"
import ExercisesList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";
import AdminDocUpload from './components/admin-doc-upload.component';
import AdminHome from './components/admin-home.component';
import EditAdminFile from './components/admin-doc-edit.component';
import AdminFileList from './components/uploaded-files-admin.component';
import AddNewSubmissionType from './components/create-new-submission.component';
import SubmissionTypesList from './components/submission-types-admin.component';
import EditSubmissionType from './components/admin-submission-type-edit.component';

import SupervisorHome from './components/supervisor-components/supervisor-home.component';

import userManagementHome from './components/userManagement-components/userManagement-home.component';
import StudentDetailsList from './components/userManagement-components/student-list.component';
import AddStudentDetails from './components/userManagement-components/create-student.component';
import UpdateStudentDetails from './components/userManagement-components/edit-student.component';
import AddEmployeeDetails from './components/userManagement-components/create-staff.component';
import UpdateEmployeeDetails from './components/userManagement-components/edit-employee.component';
import EmployeeDetailsList from './components/userManagement-components/employee-list.component';
import StudentRegistration from './components/userManagement-components/student-registration.component';
import StudentProfile from './components/userManagement-components/studentProfile.component';


function App() {
  return (
    <Router>
      <div className="container">

        <Navbar />
        <br />
          <Route path="/" exact component={ExercisesList} />
          <Route path="/edit/:id" component={EditExercise} />
          <Route path="/create" component={CreateExercise} />
          <Route path="/user" component={CreateUser} />
          <Route path="/admin-file-upload" component={AdminDocUpload} />
          <Route path="/admin-file-download" component={AdminFileList} />
          <Route path="/admin-file-edit/:id" component={EditAdminFile} />
          <Route path="/admin-add-new-submission-type" component={AddNewSubmissionType} />
          <Route path="/admin-submission-type-list" component={SubmissionTypesList} />
          <Route path="/admin-submission-type-edit/:id" component={EditSubmissionType} />
          <Route path="/admin-home" component={AdminHome} />
        
          <Route path="/supervisor-home" component={SupervisorHome} />

          <Route path="/user-management-home" component={userManagementHome} />
          <Route path="/student-details" exact component={StudentDetailsList} />
          <Route path="/add-student-details" component={AddStudentDetails} />
          <Route path="/update-student-details/:id" component={UpdateStudentDetails} />
          <Route path="/employee-details" exact component={EmployeeDetailsList} />
          <Route path="/add-employee-details" component={AddEmployeeDetails} />
          <Route path="/update-employee-details/:id" component={UpdateEmployeeDetails} />
          <Route path="/student-registration" component={StudentRegistration} />
          <Route path="/student-profile/:id" component={StudentProfile} />
            
      </div>
    </Router>
  );
}

export default App;
