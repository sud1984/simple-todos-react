import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

export default class Task extends Component {

  updateCategory(){
    Meteor.call('categories.update', this.props.category._id, '');
  }

  deleteCategory(){
    Meteor.call('categories.delete', this.props.category._id);
  }

  render() {
    return (
      <div className="ui celled list">
        <div className="item">
          <div className="ui grid" >            

            <div className="twelve wide column" >
              {this.props.categories}
            </div>

            <div className="two wide column" >
              <button className="ui icon red button" onClick={this.updateCategory.bind(this)} >
                <i className="edit icon" />
              </button>
            </div>

            <div className="two wide column" >
              <button className="ui icon blue button" onClick={this.deleteCategory.bind(this)} >
                <i className="x icon" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}