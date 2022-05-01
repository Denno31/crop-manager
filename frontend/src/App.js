import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import FieldScreen from "./screens/FieldScreen";
import HomeScreen from "./screens/HomeScreen";
import SignIn from "./screens/LoginScreen";
import CropScreen from "./screens/CropScreen";
import IncomeCategoryScreen from "./screens/IncomeCategoryScreen";
import ExpenseCategoryScreen from "./screens/ExpenseCategoryScreen";
import IncomeScreen from "./screens/incomeScreen";
import ExpenseScreen from "./screens/ExpenseScreen";
import VarietyScreen from "./screens/VarietyScreen";
import PlantingScreen from "./screens/PlantingScreen";
import HarvestScreen from "./screens/harvestScreen";
import TreatmentScreen from "./screens/TreatmentScreen";
import TaskScreen from "./screens/TaskScreen";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import UsersScreen from "./screens/UsersScreen";
import AddUserScreen from "./screens/AddUserScreen";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/signin" element={<SignIn />}></Route>
        <Route
          exact
          path="/dashboard"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        ></Route>
        <Route
          exact
          path="/home"
          element={
            <AdminRoute>
              <HomeScreen />
            </AdminRoute>
          }
        ></Route>
        <Route
          exact
          path="/fields/"
          element={
            <PrivateRoute>
              <FieldScreen />
            </PrivateRoute>
          }
        ></Route>
        <Route
          exact
          path="/fields/:id"
          element={
            <PrivateRoute>
              <FieldScreen />
            </PrivateRoute>
          }
        ></Route>
        <Route
          exact
          path="/crops/"
          element={
            <PrivateRoute>
              <CropScreen />
            </PrivateRoute>
          }
        ></Route>
        <Route
          exact
          path="/crops/:id"
          element={
            <PrivateRoute>
              <CropScreen />
            </PrivateRoute>
          }
        ></Route>
        <Route
          exact
          path="/incomecategories/"
          element={
            <AdminRoute>
              <IncomeCategoryScreen />
            </AdminRoute>
          }
        ></Route>
        <Route
          exact
          path="/incomecategories/:id"
          element={
            <AdminRoute>
              <IncomeCategoryScreen />
            </AdminRoute>
          }
        ></Route>
        <Route
          exact
          path="/expensecategories/"
          element={
            <AdminRoute>
              <ExpenseCategoryScreen />
            </AdminRoute>
          }
        ></Route>
        <Route
          exact
          path="/expensecategories/:id"
          element={
            <AdminRoute>
              <ExpenseCategoryScreen />
            </AdminRoute>
          }
        ></Route>
        <Route
          exact
          path="/income/"
          element={
            <AdminRoute>
              <IncomeScreen />
            </AdminRoute>
          }
        ></Route>
        <Route
          exact
          path="/income/:id"
          element={
            <AdminRoute>
              <IncomeScreen />
            </AdminRoute>
          }
        ></Route>
        <Route
          exact
          path="/expense/"
          element={
            <AdminRoute>
              <ExpenseScreen />
            </AdminRoute>
          }
        ></Route>
        <Route
          exact
          path="/expense/:id"
          element={
            <AdminRoute>
              <ExpenseScreen />
            </AdminRoute>
          }
        ></Route>
        <Route
          exact
          path="/variety/"
          element={
            <PrivateRoute>
              <VarietyScreen />
            </PrivateRoute>
          }
        ></Route>
        <Route
          exact
          path="/variety/:id"
          element={
            <PrivateRoute>
              <VarietyScreen />
            </PrivateRoute>
          }
        ></Route>
        <Route
          exact
          path="/planting/"
          element={
            <PrivateRoute>
              <PlantingScreen />
            </PrivateRoute>
          }
        ></Route>
        <Route
          exact
          path="/planting/:id"
          element={
            <PrivateRoute>
              <PlantingScreen />
            </PrivateRoute>
          }
        ></Route>
        <Route
          exact
          path="/harvest/"
          element={
            <PrivateRoute>
              <HarvestScreen />
            </PrivateRoute>
          }
        ></Route>
        <Route
          exact
          path="/harvest/:id"
          element={
            <PrivateRoute>
              <HarvestScreen />
            </PrivateRoute>
          }
        ></Route>
        <Route
          exact
          path="/treatment/"
          element={
            <PrivateRoute>
              <TreatmentScreen />
            </PrivateRoute>
          }
        ></Route>
        <Route
          exact
          path="/treatment/:id"
          element={<TreatmentScreen />}
        ></Route>
        <Route
          exact
          path="/task/"
          element={
            <PrivateRoute>
              <TaskScreen />
            </PrivateRoute>
          }
        ></Route>
        <Route
          exact
          path="/task/:id"
          element={
            <PrivateRoute>
              <TaskScreen />
            </PrivateRoute>
          }
        ></Route>
        <Route
          exact
          path="/users/"
          element={
            <PrivateRoute>
              <UsersScreen />
            </PrivateRoute>
          }
        ></Route>
        <Route
          exact
          path="/users/create"
          element={
            <PrivateRoute>
              <AddUserScreen />
            </PrivateRoute>
          }
        ></Route>
        <Route
          exact
          path="/users/:id/edit"
          element={
            <PrivateRoute>
              <AddUserScreen />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="*"
          element={
            <AdminRoute>
              <HomeScreen />
            </AdminRoute>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
