import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import FacultyLogin from "./pages/FacultyLogin";
import StudentLogin from "./pages/StudentLogin";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FacultyDashboard from "./pages/FacultyDashboard";
import StudentCreate from "./pages/StudentCreate";
import ViewStudents from "./pages/ViewStudents";
import AssignStudent from "./pages/AssignStudent";
import StudentDashboard from "./pages/StudentDashboard";
import StudentProfile from "./pages/StudentProfile";
import ChangePassword from "./pages/ChangePassword";
import EnrollInSubjects from "./pages/EnrollInSubjects";
import EditByFaculty from "./pages/EditByFaculty";
import ViewEnrolledSubjects from "./pages/ViewEnrolledSubjects";
import AssignedStudentFaculty from "./pages/AssignedStudents";
import StudentEdit from "./pages/StudentEdit";
import Notfound from "./pages/NotFound";

// Author: Kanishkumar
// Project: College Management System

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Notfound />} />  
          <Route path="/login" element={<Login />} />
          <Route path="/login/faculty" element={<FacultyLogin />} />
          <Route path="/login/student" element={<StudentLogin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/student/create" element={<StudentCreate />} />
          <Route path="/student/view" element={<StudentProfile />} />
          <Route path="/student/edit" element={<StudentEdit />} />
          <Route path="/faculty/students" element={<ViewStudents />} />
          <Route path="/faculty/edit" element={<EditByFaculty />} />
          <Route
            path="/faculty/student/mystudent"
            element={<AssignStudent />}
          />
          <Route path="/dashboard/faculty" element={<FacultyDashboard />} />
          <Route
            exact
            path="/dashboard/student"
            element={<StudentDashboard />}
          />
          <Route exact path="/student/enroll" element={<EnrollInSubjects />} />
          <Route
            exact
            path="/student/view-enroll"
            element={<ViewEnrolledSubjects />}
          />
          <Route
            exact
            path="/faculty/assigned-students"
            element={<AssignedStudentFaculty />}
          />
          <Route
            exact
            path="/student/password/change"
            element={<ChangePassword />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
