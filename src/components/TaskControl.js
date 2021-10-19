import React, {Component} from 'react';
import Search from './TaskSearchControl';
import Sort from './TaskSortControl';

class Control extends Component {
    render() {
        return (
            <div className="row">
                <Search />
                <Sort />
            </div>
        );
    }

}

export default Control;
