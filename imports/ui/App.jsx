import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';

import Task from './Task.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.js';
import { Categories } from '../api/categories.js';

// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
    };
  }

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Meteor.call('tasks.insert', text);

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }

  renderTasks() {
    let filteredTasks = this.props.tasks;
    if (this.state.hideCompleted) {
      filteredTasks = filteredTasks.filter(task => !task.checked);
    }
    return filteredTasks.map((task) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const isCurrentUser = task.owner === currentUserId;

      return (
        <Task
          key={task._id}
          task={task}
          isCurrentUser={isCurrentUser}
        />
      );
    });
  }

  render() {
    return (
      <div className="ui container" style={{ backgroundColor: '#315481', backgroundImage: 'linear-gradient(to bottom, #315481, #918e82 100%)', marginTop: '3em' }}>
        <h1 className="ui header" style={{ margin: '1em' }}>
          Todo List ({this.props.incompleteCount})
        </h1>

        <div className="ui grid" style={{ margin: '0.5em', paddingButton: '2em' }}>
          <div className="five wide column">

            <div className="ui checkbox" >
              <input type="checkbox" checked={this.state.hideCompleted} onChange={this.toggleHideCompleted.bind(this)} />
              <label>Hide Completed Tasks</label>
            </div>
            {this.props.currentUser ?
              <form className="ui form" onSubmit={this.handleSubmit.bind(this)} style={{ marginTop: '1em' }}>
                <div className="field" >
                  <input ref="textInput" placeholder="Type to add new tasks" />
                </div>
              </form> : ''
            }

          </div>
          <div className="nine wide column">
          </div>
          <div className="two wide column" style={{ paddingLeft: '4em' }}>
            <AccountsUIWrapper />
          </div>
        </div>
        <div>
          <div  className="ui attached tabular menu">
            <a className="active item">Tab 1</a>
            <a className="item">Tab 2</a>
            <a className="item">Tab 3</a>
          </div>
          <div className="ui bottom attached segment active tab">Tab 1 Content</div>
          <div className="ui bottom attached segment tab">Tab 2 Content</div>
          <div className="ui bottom attached segment tab">Tab 3 Content</div>
        </div>
        {/* <div className="ui menu top">
          <a className="active item" data-tab="bio">
            Bio
          </a>
          <a className="item" data-tab="photos">
            Photos
          </a>          
        </div>
        <div className="ui tab" data-tab="bio">
          <p>Hola</p>
        </div>
        <div className="ui tab" data-tab="photos">
          <p>Holas</p>
        </div> */}

        {/* <div className="ui segment" style={{ margin: '1em' }}>
          {this.renderTasks()}
        </div> */}
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('tasks');

  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    categories: Categories.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
    currentUser: Meteor.user(),
  };
})(App);
