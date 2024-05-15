import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminColleges from "./pages/admin/Colleges";
import AdminDepartments from "./pages/admin/Departments";
import Users from "./pages/admin/Users";
import AssignRole from "./pages/admin/assignRole";
import AddCollege from "./pages/admin/addCollege";
import AddDepartment from "./pages/admin/addDepartment";
import UserInfo from "./pages/user/userinfo";
import UpdatePasswordForm from "./features/authentication/UpdatePasswordForm";
import ForgotPassword from "./pages/ForgotPassword";

import HRDashboard from "./pages/hr/dashboard";
import AddUser from "./pages/hr/user";
import Criteria from "./pages/hr/criteria";
import AddCriteria from "./pages/hr/addCriteria";

import TeamleaderDashboard from "./pages/teamleader/dashboard";
import TmApprove from "./pages/teamleader/TmApprove";
import TmEvaluate from "./pages/teamleader/TmEvaluate";
import Tmeval from "./pages/teamleader/tmeval";
import Userss from "./pages/teamleader/Userss";

import Complaint from "./pages/admin/Complaint";

// Import your Head pages here
import HeadDashboard from "./pages/head/dashboard";
import AddCourse from "./pages/head/addCourse";
import Courses from "./pages/head/courses";
import Evaluate from "./pages/head/evaluate";
import Approve from "./pages/head/approve";
import ProtectedRoute from "./ui/ProtectedRoute";
// Import other pages here
import StudentDashboard from "./pages/student/Dashboard";
import PageNotFound from "./pages/PageNotFound";

import Login from "./pages/Login";
import Cycle from "./pages/hr/cycle";
import Account from "./pages/Account";
import Register from "./pages/Register";
import Peer from "./pages/Evaluate/peer";
import Self from "./pages/Evaluate/self";
import Subordinate from "./pages/Evaluate/subordinate";
import Course from "./pages/student/Course";
import TmResult from "./pages/teamleader/TmResult";
import Selfresult from "./pages/Result/selfresult";
import Subbordinateresult from "./pages/Result/subbordinateresult";
import DepartmentUser from "./pages/head/departmentUser";
import AppLayout from "./ui/AppLayout";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { DarkModeProvider } from "./context/DarkModeContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <DarkModeProvider>
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route path="admin">
                <Route index element={<AdminDashboard />} />
                <Route path="colleges" element={<AdminColleges />} />
                <Route path="departments" element={<AdminDepartments />} />
                <Route path="users" element={<Users />} />
                <Route path="assignRole" element={<AssignRole />} />
                <Route path="addCollege" element={<AddCollege />} />
                <Route path="addDepartment" element={<AddDepartment />} />
                <Route path="compalint" element={<Complaint />} />
              </Route>

              <Route path="hr">
                <Route path="dashboard" element={<HRDashboard />} />
                <Route path="user" element={<AddUser />} />
                <Route path="criteria" element={<Criteria />} />
                <Route path="cycle" element={<Cycle />} />
                <Route path="users" element={<Users />} />
                <Route path="addCriteria" element={<AddCriteria />} />
              </Route>

              <Route path="settings" />
              <Route path="account" element={<Account />} />

              <Route path="head">
                <Route path="dashboard" element={<HeadDashboard />} />
                <Route path="user" element={<DepartmentUser />} />
                <Route path="addCourse" element={<AddCourse />} />
                <Route path="courses" element={<Courses />} />
                <Route path="evaluate" element={<Evaluate />} />

                <Route path="report" element={<Approve />} />
              </Route>
              <Route path="student">
                <Route path="dashboard" element={<StudentDashboard />} />
                <Route path="course" element={<Course />} />
              </Route>
              <Route path="teamleader">
                <Route path="dashboard" element={<TeamleaderDashboard />} />
                <Route path="userss" element={<Userss />} />

                <Route path="TmEvaluate" element={<TmEvaluate />} />
                <Route path="TmResult" element={<TmResult />} />
                <Route path="approve" element={<TmApprove />} />
              </Route>
              <Route path="evaluate">
                <Route path="peer" element={<Peer />} />
                <Route path="self" element={<Self />} />
                <Route path="subordinate" element={<Subordinate />} />
                <Route path="user" element={<Tmeval />} />
              </Route>
              <Route path="result">
                <Route path="self-result" element={<Selfresult />} />
                <Route
                  path="subbordinate-result"
                  element={<Subbordinateresult />}
                />
              </Route>
              <Route path="user">
                <Route path="userinfo/:id" element={<UserInfo />} />
              </Route>
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />

            <Route
              path="reset-Password/:token"
              element={<UpdatePasswordForm />}
            />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </DarkModeProvider>
    </QueryClientProvider>
  );
};

export default App;
