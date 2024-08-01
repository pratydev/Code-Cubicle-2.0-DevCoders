import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store.js';
import AuthLayout from './components/AuthLayout';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './pages/Home.jsx';
import GestureCar from './pages/GestureCar.jsx';
import GestureMath from './pages/GestureMath.jsx';
import MindFusion from './pages/MindFusion.jsx';

import App from './App.jsx';
import './index.css';
import GestureCarGame from './pages/game/GestureCarGame.jsx';
import GestureMathGame from './pages/game/GestureMathGame.jsx';
import MindFusionGame from './pages/game/MindFusionGame.jsx';
import TeacherDashboard from './pages/dashboard/TeacherDashboard.jsx';
import StudentDashboard from './pages/dashboard/StudentDashboard.jsx';
import StudentsStatus from './pages/dashboard/StudentsStatus.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/gestureMath",
        element: <GestureMath />,
      },
      {
        path: "/gestureMathGame",
        element: <GestureMathGame />,
      },
      {
        path: "/gestureCar",
        element: <GestureCar />,
      },
      {
        path: "/gestureCarGame",
        element: <GestureCarGame />,
      },
      {
        path: "/mindFusion",
        element: <MindFusion />,
      },
      {
        path: "/mindFusionGame",
        element: <MindFusionGame />,
      },
      {
        path: "/teacherDashboard",
        element: <TeacherDashboard />,
      },
      {
        path: "/studentsStatus",
        element: <StudentsStatus />,
      },
      {
        path: "/studentDashboard",
        element: (
          <AuthLayout authentication={true}>
            <StudentDashboard />
          </AuthLayout>
        ),
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
