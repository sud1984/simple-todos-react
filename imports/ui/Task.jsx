import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

// Task component - represents a single todo item
export default class Task extends Component {
  toggleChecked() {
    // Set the checked property to the opposite of its current value
    Meteor.call('tasks.setChecked', this.props.task._id, !this.props.task.checked);
  }

  deleteThisTask() {
    Meteor.call('tasks.remove', this.props.task._id);
  }

  togglePrivate() {
    Meteor.call('tasks.setPrivate', this.props.task._id, !this.props.task.private);
  }

  selectCategoryTask() {
    Meteor.call('tasks.setUserCategory', this.props.task._id, ' - category1');
  }

  render() {

    return (
      <div className="ui celled list">
        <div className="item">
          <div className="ui grid" >

            <div className="one wide column" >
              <div className="ui checkbox">
                <input type="checkbox" checked={!!this.props.task.checked} onChange={this.toggleChecked.bind(this)} />
                <label></label>
              </div>
            </div>

            <div className="ten wide column" >
              {this.props.task.username}: {this.props.task.text} {this.props.task.category}
            </div>

            <div className="center aligned three wide colum" >
              {this.props.isCurrentUser ? (
                <button className="ui primary button" onClick={this.togglePrivate.bind(this)}>
                  {this.props.task.private ? 'Private' : 'Public'}
                </button>
              ) : ''}
            </div>

            <div className="two wide column" >
              <button className="ui icon red button" onClick={this.deleteThisTask.bind(this)} >
                <i className="x icon" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
