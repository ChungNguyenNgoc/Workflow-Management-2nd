import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from './../actions/index'

class TaskItem extends Component {

    constructor(props) {
        super(props);
        this.onUpdateStatus = this.onUpdateStatus.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onUpdateTask = this.onUpdateTask.bind(this);
    }

    onUpdateStatus() {
        this.props.onUpdateStatus(this.props.task.id); 
    }

    onDelete() {
        this.props.onDeleteTask(this.props.task.id);
        this.props.onCloseForm();
    }

    onUpdateTask() {
        this.props.onOpenForm();
        this.props.onUpdateTask(this.props.task);
    }

    render() {

        var {task, index} = this.props;
        return (
            <tr>
                <td>{index + 1}</td>
                <td>{task.name}</td>
                <td className="text-center">
                <span 
                    className={task.status === true ? "badge badge-success" : "badge badge-danger"}
                    onClick={this.onUpdateStatus}
                >
                    {task.status === true ? "Đã đăng ký" : "Chưa đăng ký"}
                </span>
                </td>
                <td className="text-center">
                <button 
                    type="button" 
                    className="btn btn-warning"
                    onClick={this.onUpdateTask}
                >
                    <span className="fa fa-pencil mr-5" />Sửa
                </button>
                &nbsp;
                <button 
                type="button" 
                className="btn btn-danger"
                onClick={this.onDelete}
                >
                    <span className="fa fa-trash mr-5" />Xóa
                </button>
                </td>
            </tr>
        
        );
    }

}

const mapStateToProps = (state) => {
    return {
        
    }
}

const mapDispathchToProps = (dispatch, props) => {
    return {
        onUpdateStatus: (id) => {
            dispatch(actions.updateStatus(id));
        },
        onDeleteTask: (id) => {
            dispatch(actions.deleteTask(id));
        },
        onCloseForm: () => {
            dispatch(actions.closeForm());
        },
        onOpenForm: () => {
            dispatch(actions.openForm());
        },
        onUpdateTask: (task) => {
            dispatch(actions.updateTask(task));
        },
    }
}

export default connect(mapStateToProps, mapDispathchToProps)(TaskItem);
