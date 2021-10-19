import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from './../actions/index'
  
class TaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            status: false
        };

        this.onCloseForm = this.onCloseForm.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onClear = this.onClear.bind(this);
    }

    componentWillMount() {
        if(this.props.updateTask && this.props.updateTask.id !== null) {
            this.setState({
                id: this.props.updateTask.id,
                name: this.props.updateTask.name,
                status: this.props.updateTask.status
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.updateTask) {
            this.setState({
                id: nextProps.updateTask.id,
                name: nextProps.updateTask.name,
                status: nextProps.updateTask.status
            })
        } else {
            this.onClear();
        }
    }

    onSubmit(event) {
        event.preventDefault();
        this.props.onSubmitTask(this.state);

        this.onClear();
        this.onCloseForm();
    }

    onClear() {
        this.setState({
            name: "",
            status: false
        });
    }

    onChange(event) {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if(name === 'status') value = target.value === 'true' ? true : false
        this.setState({
            [name] : value
        })
    }
    
    onCloseForm() {
        this.props.onCloseForm();
    }


    render() {
        if(!this.props.isDisPlayForm) return null;
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">{ this.props.updateTask.id ? "Cập nhật công việc" : "Thêm công việc"}</h3>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.onCloseForm}>
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div className="panel-body">
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                    <label>Tên :</label>
                    <input 
                    type="text" 
                    className="form-control" 
                    name = "name"
                    value = {this.state.name}
                    onChange = {this.onChange}
                    />
                    </div>
                    <label>Trạng Thái :</label>
                    <select 
                    className="form-control" 
                    required="required" 
                    name="status"
                    value = {this.state.status}
                    onChange = {this.onChange}
                    >
                    
                    <option value={true}>Đã đăng ký</option>
                    <option value={false}>Chưa đăng ký</option>
                    </select>
                    <br />
                    <div className="text-center">
                    <button 
                    type="submit" 
                    className="btn btn-warning"><span className="fa fa-plus mr5">Thêm</span></button>&nbsp;
                    <button 
                    type="reset" 
                    className="btn btn-danger"
                    onClick={this.onClear}
                    ><span className="fa fa-close mr5">Hủy Bỏ</span></button>
                    </div>
                </form>
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        isDisPlayForm: state.isDisPlayForm,
        updateTask: state.updateTask,
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSubmitTask: (task) => {
            dispatch(actions.submitTask(task));
        },
        onCloseForm: () => {
            dispatch(actions.closeForm());
        }
    }
}

// tham so thu 2 cua connect la action truyen vao tu Store
export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
