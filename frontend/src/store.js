import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import thunk from "redux-thunk";
import {
  addUserReducer,
  deleteUserReducer,
  fetchUserReducer,
  fetchUsersReducer,
  updateUserReducer,
  userReducer,
  userSigninReducer,
} from "./reducers/userReducer";
import {
  addFieldReducer,
  fieldsReducer,
  fieldReducer,
  updateFieldReducer,
  deleteFieldReducer,
} from "./reducers/fieldReducer";
import {
  addCropReducer,
  cropReducer,
  cropsReducer,
  deleteCropReducer,
  updateCropReducer,
} from "./reducers/cropReducers";
import {
  addIncomeCategoryReducer,
  deleteIncomeCateogryReducer,
  incomeCategoriesReducer,
  incomeCategoryReducer,
  updateIncomeCategroyReducer,
} from "./reducers/incomeCategoryReducer";
import {
  addExpenseCategoryReducer,
  deleteExpenseCateogryReducer,
  expenseCategoriesReducer,
  updateExpenseCategroyReducer,
} from "./reducers/expenseCategoryReducer";
import {
  addIncomeReducer,
  deleteIncomeReducer,
  incomeReducer,
  incomesReducer,
  updateIncomeReducer,
} from "./reducers/incomeReducer";
import {
  addVarietyReducer,
  deleteVarietyReducer,
  updateVarietyReducer,
  varietiesReducer,
  varietyReducer,
} from "./reducers/varietyReducers";
import {
  addExpenseReducer,
  deleteExpenseReducer,
  expenseReducer,
  expensesReducer,
  updateExpenseReducer,
} from "./reducers/expenseReducers";
import {
  addPlantingReducer,
  deletePlantingReducer,
  plantingReducer,
  plantingsReducer,
  updatePlantingReducer,
} from "./reducers/PlantingReducer";
import {
  addHarvestReducer,
  deleteHarvestReducer,
  harvestReducer,
  harvestsReducer,
  updateHarvestReducer,
} from "./reducers/harvestReducers";
import {
  addTreatmentReducer,
  deleteTreatmentReducer,
  treatmentReducer,
  treatmentsReducer,
  updateTreatmentReducer,
} from "./reducers/treatmentReducers";
import {
  addTaskReducer,
  deleteTaskReducer,
  taskReducer,
  tasksReducer,
  updateTaskReducer,
} from "./reducers/taskReducers";
import { transactionSummaryReducer } from "./reducers/transactionsReducer";

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};

const reducer = combineReducers({
  userSignin: userSigninReducer,
  users: fetchUsersReducer,
  userCreate: addUserReducer,
  user: fetchUserReducer,
  userUpdate: updateUserReducer,
  userDelete: deleteUserReducer,

  fields: fieldsReducer,
  fieldCreate: addFieldReducer,
  field: fieldReducer,
  fieldUpdate: updateFieldReducer,
  fieldDelete: deleteFieldReducer,

  crops: cropsReducer,
  cropCreate: addCropReducer,
  crop: cropReducer,
  cropUpdate: updateCropReducer,
  cropDelete: deleteCropReducer,

  incomeCategories: incomeCategoriesReducer,
  incomeCategoryCreate: addIncomeCategoryReducer,
  incomeCategory: incomeCategoryReducer,
  incomeCategoryUpdate: updateIncomeCategroyReducer,
  incomeCategoryDelete: deleteIncomeCateogryReducer,

  expenseCategories: expenseCategoriesReducer,
  expenseCategoryCreate: addExpenseCategoryReducer,
  expenseCategory: addExpenseCategoryReducer,
  expenseCategoryUpdate: updateExpenseCategroyReducer,
  expenseCategoryDelete: deleteExpenseCateogryReducer,

  incomes: incomesReducer,
  incomeCreate: addIncomeReducer,
  income: incomeReducer,
  incomeUpdate: updateIncomeReducer,
  incomeDelete: deleteIncomeReducer,

  expenses: expensesReducer,
  expenseCreate: addExpenseReducer,
  expense: expenseReducer,
  expenseUpdate: updateExpenseReducer,
  expenseDelete: deleteExpenseReducer,

  varieties: varietiesReducer,
  varietyCreate: addVarietyReducer,
  variety: varietyReducer,
  varietyUpdate: updateVarietyReducer,
  varietyDelete: deleteVarietyReducer,

  plantings: plantingsReducer,
  plantingCreate: addPlantingReducer,
  planting: plantingReducer,
  plantingUpdate: updatePlantingReducer,
  plantingDelete: deletePlantingReducer,

  harvests: harvestsReducer,
  harvestCreate: addHarvestReducer,
  harvest: harvestReducer,
  harvestUpdate: updateHarvestReducer,
  harvestDelete: deleteHarvestReducer,

  treatments: treatmentsReducer,
  treatmentCreate: addTreatmentReducer,
  treatment: treatmentReducer,
  treatmentUpdate: updateTreatmentReducer,
  treatmentDelete: deleteTreatmentReducer,

  tasks: tasksReducer,
  taskCreate: addTaskReducer,
  task: taskReducer,
  taskUpdate: updateTaskReducer,
  taskDelete: deleteTaskReducer,

  transactionSummary: transactionSummaryReducer,
});
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
