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
            
      </div>
    </Router>
  );
}

export default App;
