import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

//common routes
import Navbar from "./components/navbar.component";
import NavbarSupervisor from "./components/navbarSupervisor.component";
import NavbarAdmin from "./components/navbarAdmin.component";
import HomePage from "./components/homePage.component";
// import FooterComponent from "./components/FooterComponent";

//admin routes
import AdminDocUpload from "./components/admin-components/admin-file-upload.component";
import AdminHome from "./components/admin-components/admin-home.component";
import EditAdminFile from "./components/admin-components/admin-file-edit.component";
import AdminFileList from "./components/admin-components/uploaded-files-admin.component";
import AddNewSubmissionType from "./components/admin-components/create-new-submission-type.component";
import SubmissionTypesList from "./components/admin-components/submission-types-admin.component";
import EditSubmissionType from "./components/admin-components/admin-submission-type-edit.component";
import MarkingSchemeUpload from "./components/admin-components/marking-scheme-upload.component";
import MarkingSchemeList from "./components/admin-components/uploaded-marking-schemes.component";
import EditMarkingScheme from "./components/admin-components/marking-scheme-edit.component";
import AdminStudentList from "./components/admin-components/registered-students.component";
import AdminUpdateStudentDetails from "./components/admin-components/admin-edit-student.component";
import AdminEmployeeList from "./components/admin-components/registered-employees.component";
import AdminUpdateEmployeeDetails from "./components/admin-components/admin-edit-employee.component";
import AdminGroupList from "./components/admin-components/admin-registered-groups.component";
import AllocatePanelMember from "./components/admin-components/allocate-panel-member.component";

import AddSubmission from "./components/admin-components/add-submission.component";

//supervisour routes
import SupervisorHome from './components/supervisor-components/supervisor-home.component';
import SupervisorTopicList from './components/supervisor-components/supervisor-topic-list.component';
import SupervisorEditTopics from './components/supervisor-components/supervisor-topic-edit.component';
import SuperrvisorStdGroupList from './components/supervisor-components/supervisor-stdGroup-list.component';
import SupervisorEditStdGroups from './components/supervisor-components/supervisor-stdGroup-edit.component';
import SupervisorChatPage from './components/supervisor-components/supervisor-chat-page';
import SupervisorMessage from './components/supervisor-components/supervisor-message';
import SuperrvisorResearchList from "./components/supervisor-components/supervisor-research-list.component";
import AddFeedback from "./components/supervisor-components/add-feedback.component";

//co-supervisor routes
import CoSupervisorHome from "./components/co-supervisor-components/co-supervisor-home.component";
import CoSupervisorGroupList from "./components/co-supervisor-components/co-supervisor-topic-list.components";
import CoSupervisorEditGroups from "./components/co-supervisor-components/co-supervisor-topic-list-edit.component";

//panel member routes
import PanelHome from "./components/panel-member-component/panel-home.component";

//userManagement routes
import userManagementHome from "./components/userManagement-components/userManagement-home.component";
import StudentDetailsList from "./components/userManagement-components/student-list.component";
import AddStudentDetails from "./components/userManagement-components/create-student.component";
import AddEmployeeDetails from "./components/userManagement-components/create-staff.component";
import EmployeeDetailsList from "./components/userManagement-components/employee-list.component";
import StudentRegistration from "./components/userManagement-components/registration/studentRegistration.component";
import StudentLogin from "./components/userManagement-components/login/studentLogin.component";
import EmployeeRegistration from "./components/userManagement-components/registration/employeeRegistration.component";
import EmployeeLogin from "./components/userManagement-components/login/employeeLogin.component";
import EmployeeProfile from "./components/userManagement-components/profile/employee-profile.component";
import PanelMemberProfile from "./components/userManagement-components/profile/panelMember-profile.component";
import StudentProfile from "./components/userManagement-components/profile/student-profile.component";

import UpdateStudentDetails from "./components/userManagement-components/editProfile/edit-student.component";
import UpdateEmployeeDetails from "./components/userManagement-components/editProfile/edit-employee.component";
import UpdatePanelMemberDetails from "./components/userManagement-components/editProfile/edit-PanelMember.component";
import StudentForgotPassword from "./components/userManagement-components/forgotPassword/StudentForgotPassword";
import StudentPasswordReset from "./components/userManagement-components/passwordReset/studentPasswordReset";
import EmployeeForgotPassword from "./components/userManagement-components/forgotPassword/EmployeeForgotPassword";
import EmployeePasswordReset from "./components/userManagement-components/passwordReset/EmployeePasswordReset";

//student routes
import CreateGroup from './components/student-components/create-group.component';
import studentHome from './components/student-components/student-home.component';
import regResearchTopic from './components/student-components/reg-researchtopic.component';
import reqCoSupervisor from './components/student-components/req-cosupervisor.component';
import StudentChat from './components/student-components/student-chat.component';
import StudentMessage from './components/student-components/student-message';
// import addSubmission from './components/student-components/add-submission.component';
import StuFileUpload from './components/student-components/stu-file-upload.component';
import MarkingSchemeDownload from "./components/student-components/markingSchemeDownload.component";
import TemplateDownload from "./components/student-components/templateDownload.component";

function App() {
  // console.log('app.js =>', JSON.parse(sessionStorage.getItem("loggeduser"))._id );
  // const [flag, setFlag] = useState('');
  // const [test , setTest] = useState('');
  // const [nav, setNav] = useState('');
  // let nav;

  // setFlag(JSON.parse(sessionStorage.getItem("loggeduser")));

  // useEffect(() => {
  //   setFlag(sessionStorage.getItem("navBarType"));
  //   console.log('abcd1234 =>',flag);
  //   // navBarSetter();

  // },[]);

  // console.log('flagprint =>',flag);

  // const navBarSetter = () => {
  //   console.log('abc',flag);
  //   if ( flag === "1") {
  //     // setNav({
  //       return <Navbar/>
  //     // });
  //   } else if (flag === '2'){
  //     // setNav({
  //       return <NavbarAdmin/>
  //     // });
  //   } else if  (flag === '3'){
  //     // setNav({
  //       return <NavbarSupervisor/>
  //     // });
  //   } else {
  //     return null;
  //   }

  // }
  // navBarSetter();
  // setTest('a');

  // let con =  <NavbarSupervisor/>

  return (

    <div className="bg-image" style={{
      backgroundImage: `url("https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=822&q=80")`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      height: '100vh',
    }}>

      <div className="container" style={{
        backgroundColor: 'white',
        width: '100%',
        height: '100vh',
        paddingLeft: "0px",
        paddingRight: "0px"
      }}>
        <Router>

          <Navbar />
          <br />
          <div style={{ padding: "20px" }}>
            {/* home page */}
            <Route path="/home" exact component={HomePage} />

            {/* admin paths */}
            <Route path="/admin-file-upload" component={AdminDocUpload} />
            <Route path="/admin-file-download" component={AdminFileList} />
            <Route path="/admin-file-edit/:id" component={EditAdminFile} />
            <Route
              path="/admin-add-new-submission-type"
              component={AddNewSubmissionType}
            />
            <Route
              path="/admin-submission-type-list"
              component={SubmissionTypesList}
            />
            <Route
              path="/admin-submission-type-edit/:id"
              component={EditSubmissionType}
            />
            <Route path="/add-submission" component={AddSubmission} />
            <Route path="/admin-home" component={AdminHome} />
            <Route path="/admin-marking-upload" component={MarkingSchemeUpload} />
            <Route path="/admin-marking-download" component={MarkingSchemeList} />
            <Route path="/admin-marking-edit/:id" component={EditMarkingScheme} />
            <Route path="/admin-all-students" component={AdminStudentList} />
            <Route
              path="/admin-update-student/:id"
              component={AdminUpdateStudentDetails}
            />
            <Route path="/admin-all-employees" component={AdminEmployeeList} />
            <Route
              path="/admin-update-employee/:id"
              component={AdminUpdateEmployeeDetails}
            />
            <Route path="/admin-group-list" component={AdminGroupList} />
            <Route
              path="/admin-allocate-panel-member/:id"
              component={AllocatePanelMember}
            />

            {/* supervisor paths */}
            <Route path="/supervisor-home" component={SupervisorHome} />
            <Route path="/supervisor-topics" component={SupervisorTopicList} />
            <Route path="/supervisor-topics/edit/:id" component={SupervisorEditTopics} />
            <Route path="/supervisor-std-groups" component={SuperrvisorStdGroupList} />
            <Route path="/supervisor-std-groups/edit/:id" component={SupervisorEditStdGroups} />
            <Route path="/supervisor-chat" component={SupervisorChatPage} />
            <Route path="/supervisor-chatGo/edit/:id" component={SupervisorMessage} />
            <Route path="/supervisor-research" component={SuperrvisorResearchList} />
            <Route path="/supervisor-research/add/:id" component={AddFeedback} />

            {/* co-supervisor paths */}
            <Route path="/co-supervisor-home" component={CoSupervisorHome} />
            <Route path="/co-supervisor-topics" component={CoSupervisorGroupList} />
            <Route path="/co-supervisor-topics/edit/:id" component={CoSupervisorEditGroups}
            />

            {/* panel member paths */}
            <Route path="/panel-home" component={PanelHome} />

            {/* userManagement paths */}
            <Route path="/user-management-home" component={userManagementHome} />
            <Route path="/student-details" component={StudentDetailsList} />
            <Route path="/add-student-details" component={AddStudentDetails} />
            <Route path="/update-student-details/:id" component={UpdateStudentDetails} />
            <Route path="/employee-details" component={EmployeeDetailsList} />
            <Route path="/add-employee-details" component={AddEmployeeDetails} />
            <Route path="/update-employee-details/:id" component={UpdateEmployeeDetails} />
            <Route path="/update-panelMember-details/:id" component={UpdatePanelMemberDetails} />
            <Route path="/student-profile/:id" component={StudentProfile} />
            <Route path="/student-registration" component={StudentRegistration} />
            <Route path="/student-login" component={StudentLogin} />
            <Route path="/employee-registration" component={EmployeeRegistration} />
            <Route path="/employee-profile/:id" component={EmployeeProfile} />
            <Route path="/panelMember-profile/:id" component={PanelMemberProfile} />
            <Route path="/employee-login" component={EmployeeLogin} />
            <Route path="/student-forgot-password" component={StudentForgotPassword} />
            <Route path="/student-password-reset/:id/:token" component={StudentPasswordReset} />
            <Route path="/employee-forgot-password" component={EmployeeForgotPassword} />
            <Route path="/employee-password-reset/:id/:token" component={EmployeePasswordReset} />

            {/* students paths */}
            <Route path="/add-group" component={CreateGroup} />
            <Route path="/student-home" component={studentHome} />
            <Route path="/reg-topic" component={regResearchTopic} />
            <Route path="/req-cosupervisor" component={reqCoSupervisor} />
            <Route path="/student-chat" component={StudentChat} />
            <Route path="/student-chatGo/edit/:id" component={StudentMessage} />
            {/* <Route path="/stu-submission" component={addSubmission} /> */}
            <Route path="/stu-submission1" component={StuFileUpload} />
            <Route path="/template-download" component={TemplateDownload} />
            <Route path="/mscheme-download" component={MarkingSchemeDownload} />
          </div>
          {/* <FooterComponent /> */}
        </Router>


      </div>
    </div>
  );
}

function callApi() {
  fetch("https://af-rmtp-backend.herokuapp.com/", { method: "GET" })
    .then((data) => data.json())
    .then((json) => alert(JSON.stringify(json)));
}

export default App;
