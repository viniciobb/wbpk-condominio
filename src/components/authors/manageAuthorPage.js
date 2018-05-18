"use strict";
var React = require('react');
var createReactClass = require('create-react-class');
var Router = require('react-router');
var AuthorForm = require('./authorForm');
var AuthorStore = require("../../stores/authorStore");
var AuthorActions = require("../../actions/authorActions");

var Toastr = require("toastr");

var ManageAuthorPage = createReactClass({
    mixins: [
        Router.Navigation
    ],

    statics: {

        willTransitionFrom: function(transition, component){
            if( component.state.dirty && !confirm("Leave without saving ?")){
                transition.abort();
            }    
        }

    },

    getInitialState: function(){
        
        return {
            author: { id: '', firstName: '', lastName: ''},
            errors: {},
            dirty: false
        };
    },

    componentWillMount: function(){
       
        
       
        var authorId = this.props.params.id; // from the path /author/:id
        
        

        if(authorId){
            this.setState({author: AuthorStore.getAuthorById(authorId)});
        }

    },
        
    setAuthorState: function(event){ // called for every key press
        var field = event.target.name;
        var value = event.target.value;
        this.state.author[field] = value;
        console.log("typed : " + value);
        this.setState({ dirty: true });
        return this.setState({ author: this.state.author});
    },
    authorFormIsValid: function(){
        var formIsValid = true;
        this.state.errors = {}; // clear any previous errors
        if(this.state.author.firstName.length < 3){
            this.state.errors.firstName = "First Name must be at least 3 characters.";
            formIsValid = false;
        }

        if(this.state.author.lastName.length < 3){
            this.state.errors.lastName = "Last Name must be at least 3 characters.";
            formIsValid = false;
        }

        this.setState({errors: this.state.errors});
        return formIsValid;

    },

    saveAuthor: function(event){
        event.preventDefault();
        if(!this.authorFormIsValid()){
            return;
        }

        if(this.state.author.id)
        {
            AuthorActions.updateAuthor(this.state.author);

        }else{
            AuthorActions.createAuthor(this.state.author);
        }
            
        
        this.setState({ dirty: false });
        Toastr.success('Author saved.');
        this.transitionTo('authors');

    },
    /**
     * creating reusable inputs
     * 
     */
    render: function(){
        return (
            <AuthorForm 
             author={this.state.author} 
             onChange={this.setAuthorState}
             onSave={this.saveAuthor}
             errors={this.state.errors} />
        ); 
    }

});

module.exports = ManageAuthorPage; 