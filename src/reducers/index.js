import { combineReducers } from "redux";
import tasks from './tasks';
import isDisPlayForm from './isDisPlayForm';
import updateTask from "./updateTask";
import filterTable from "./filterTable";
import search from "./search";
import sort from "./sort";

const myReducer = combineReducers ({
    tasks, // tasks: tasks
    isDisPlayForm,
    updateTask,
    filterTable,
    search,
    sort,
});

export default myReducer;