import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

//common routes
import Navbar from "./components/navbar.component"
import ExercisesList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";

//admin routes
import AdminDocUpload from './components/admin-components/admin-file-upload.component';
import AdminHome from './components/admin-components/admin-home.component';
import EditAdminFile from './components/admin-components/admin-file-edit.component';
import AdminFileList from './components/admin-components/uploaded-files-admin.component';
import AddNewSubmissionType from './components/admin-components/create-new-submission-type.component';
import SubmissionTypesList from './components/admin-components/submission-types-admin.component';
import EditSubmissionType from './components/admin-components/admin-submission-type-edit.component';

import AddSubmission from './components/admin-components/add-submission.component';

//supervisour routes
import SupervisorHome from './components/supervisor-components/supervisor-home.component';
import SupervisorTopicList from './components/supervisor-components/supervisor-topic-list.component';
import SupervisorEditTopics from './components/supervisor-components/supervisor-topic-edit.component';
import SuperrvisorStdGroupList from './components/supervisor-components/supervisor-stdGroup-list.component';
import SupervisorEditStdGroups from './components/supervisor-components/supervisor-stdGroup-edit.component';

//co-supervisor routes
import CoSupervisorHome from './components/co-supervisor-components/co-supervisor-home.component';
import CoSupervisorGroupList from './components/co-supervisor-components/co-supervisor-topic-list.components';
import CoSupervisorEditGroups from './components/co-supervisor-components/co-supervisor-topic-list-edit.component';

//panel member routes
import PanelHome from './components/panel-member-component/panel-home.component';

//usermanagement routes
import userManagementHome from './components/userManagement-components/userManagement-home.component';
import StudentDetailsList from './components/userManagement-components/student-list.component';
import AddStudentDetails from './components/userManagement-components/create-student.component';
import UpdateStudentDetails from './components/userManagement-components/edit-student.component';
import AddEmployeeDetails from './components/userManagement-components/create-staff.component';
import UpdateEmployeeDetails from './components/userManagement-components/edit-employee.component';
import EmployeeDetailsList from './components/userManagement-components/employee-list.component';
import StudentRegistration from './components/userManagement-components/student-registration.component';
import StudentProfile from './components/userManagement-components/studentProfile.component';

//studenet routes
import CreateGroup from './components/student-components/create-group.component';
import studentHome from './components/student-components/student-home.component';
import regResearchTopic from './components/student-components/reg-researchtopic.component';
import reqCoSupervisor from './components/student-components/req-cosupervisor.component';

function App() {
  return (
    <Router>
      <div className="container">

        <Navbar />
        <br />

        {/* admin paths */}
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
        <Route path="/add-submission" component={AddSubmission} />
        <Route path="/admin-home" component={AdminHome} />

        {/* supervisor paths */}
        <Route path="/supervisor-home" component={SupervisorHome} />
        <Route path="/supervisor-topics" component={SupervisorTopicList} />
        <Route path="/supervisor-topics/edit/:id" component={SupervisorEditTopics} />
        <Route path="/supervisor-std-groups" component={SuperrvisorStdGroupList} />
        <Route path="/supervisor-std-groups/edit/:id" component={SupervisorEditStdGroups} />

        {/* co-supervisor paths */}
        <Route path="/co-supervisor-home" component={CoSupervisorHome} />
        <Route path="/co-supervisor-topics" component={CoSupervisorGroupList} />
        <Route path="/co-supervisor-topics/edit/:id" component={CoSupervisorEditGroups} />

        {/* panel member paths */}
        <Route path="/panel-home" component={PanelHome} />

        {/* usermanagement paths */}
        <Route path="/user-management-home" component={userManagementHome} />
        <Route path="/student-details" component={StudentDetailsList} />
        <Route path="/add-student-details" component={AddStudentDetails} />
        <Route path="/update-student-details/:id" component={UpdateStudentDetails} />
        <Route path="/employee-details" component={EmployeeDetailsList} />
        <Route path="/add-employee-details" component={AddEmployeeDetails} />
        <Route path="/update-employee-details/:id" component={UpdateEmployeeDetails} />
        <Route path="/student-registration" component={StudentRegistration} />
        <Route path="/student-profile/:id" component={StudentProfile} />

        {/* students paths */}
        <Route path="/add-group" component={CreateGroup} />
        <Route path="/student-home" component={studentHome} />
        <Route path="/reg-topic" component={regResearchTopic} />
        <Route path="/req-cosupervisor" component={reqCoSupervisor} />

      </div>
    </Router>
  );
}

export default App;
