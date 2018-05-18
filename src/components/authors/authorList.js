"use strict";
var React = require('react');
var PropTypes = require('prop-types');
var createReactClass = require('create-react-class');
var Router = require('react-router');
var Link = Router.Link;
var AuthorActions = require("../../actions/authorActions");
var Toastr = require("toastr");

var AuthorList = createReactClass({
    

    deleteAuthor: function(id, event){
        event.preventDefault();
        AuthorActions.deleteAuthor(id);
        Toastr.success("Author Deleted");
    },
    
    render: function(){
        
        var createAuthorRow = function(author){
            return (
                <tr key={author.id}>
                    <td><a href="#" onClick={this.deleteAuthor.bind(this, author.id)}>Delete</a></td>
                    <td><Link to="manageAuthor" params={{id: author.id}}>{author.id}</Link></td>
                    <td>{author.firstName} {author.lastName}</td>
                </tr>
            );
        };
        
        return (
            <div>
                <table className="table">
                <thead>
                    <th>Delete</th>
                    <th>ID</th>
                    <th>Name</th>
                </thead>    
                <tbody>
                    {this.props.authors.map(createAuthorRow, this)}
                </tbody>
                </table>    
            </div>    
        );
    }
});

AuthorList.propTypes =  {
    authors: PropTypes.array.isRequired
}, !!!! todo everywhere !!!!

module.exports = AuthorList;