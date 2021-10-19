import React, {Component} from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import Control from './components/TaskControl';
import TaskList from './components/TaskList';
import {connect} from 'react-redux';
import * as actions from './actions/index';

class App extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
        };

        this.onGenerateData = this.onGenerateData.bind(this);
        this.onToggleForm = this.onToggleForm.bind(this);
        this.onShowForm = this.onShowForm.bind(this);
        this.findIndex = this.findIndex.bind(this);
    }

    findIndex(id) {
        var {tasks} = this.state;
        var result;
        tasks.forEach((task, index) => {
            if(task.id === id) {
                result = index;
            }
        });
        return result;
    }


    onGenerateData() {
        var randomstring = require("randomstring");

        var tasks = [
            {
                id: randomstring.generate(),
                name: "Khóa học HTML/CSS",
                status: true
            },
            {
                id: randomstring.generate(),
                name: "Khóa học JavaScript",
                status: false
            },
            {
                id: randomstring.generate(),
                name: "Khóa học React JS",
                status: true
            },
        ];

        this.setState({
            tasks: tasks
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    onToggleForm() {
        var {updateTask} = this.props;
        if(updateTask && updateTask.id !== "") {
            this.props.onOpenForm();
        } else {
            this.props.onToggleForm();
        }
        this.props.onClearTask({
            id: '',
            name: '',
            status: false
        });
    }

    onShowForm() {
        this.setState({
            isDisPlayForm: true
        })
    }
        

    render() {     
        var {isDisPlayForm} = this.props;

        return (
            <div>
                <div className="App">
                    <div className="container">
                    <div className="text-center">
                        <h1>Quản Lý Công Việc</h1>
                        <hr />
                    </div>
                    <div className="row">
                        <div className={isDisPlayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ""}>
                            <TaskForm/>
                        </div>
                        
                        <div className={isDisPlayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
                            <button 
                            type="button" 
                            className="btn btn-primary"
                            onClick={this.onToggleForm}
                            >
                                <span className="fa fa-plus mr-5" />Thêm Công Việc
                            </button>
                            <button
                                type="button" 
                                className="btn btn-danger ml-5"
                                onClick={this.onGenerateData}
                                >
                                Generate Data
                            </button>

                            <Control 
                             />
                            
                            <div className="row mt-15">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <TaskList />
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div> 
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isDisPlayForm: state.isDisPlayForm,
        updateTask: state.updateTask,
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onToggleForm: () => {
            dispatch(actions.toggleForm());
        },
        onClearTask: (task) => {
            dispatch(actions.updateTask(task));
        },
        onOpenForm: () => {
            dispatch(actions.openForm());
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
