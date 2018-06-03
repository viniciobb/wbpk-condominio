import React from 'react';
import Home from './homePage';
import About from './about/aboutPage';
import ManageCondominioPage from './condominios/manageCondominioPage';
import ManageEnderecoPage from './enderecos/manageEnderecoPage';
import ManageFacilitiesPage from './facilities/manageFacilitiesPage';
import CondominiosPage from './condominios/condominiosPage';
import CondominioList from './condominios/condominioList';

// import CondominiosPage from './condominios/condominiosPage';
import NotFoundPage from './notFoundPage';
import { Switch, Route } from 'react-router-dom';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/about' component={About}/>
      {/* <Route exact path="/condominio/:id" component={ManageCondominioPage}/> */}
      <Route exact path="/condominio" component={ManageCondominioPage}/>
      <Route path="/condominio/:idCondominio/endereco/:idEndereco" component={ManageEnderecoPage}/>
      <Route exact path="/condominio/endereco" component={ManageEnderecoPage}/>
      <Route exact path="/condominio/facility" component={ManageFacilitiesPage}/>
      <Route exact path="/condominios" component={CondominiosPage}/>
      <Route exact path="/condominioList" component={CondominioList}/>
      <Route component={NotFoundPage}/>
    </Switch>
  </main>
)

module.exports = Main;  

/*
{/*<Route name="authors" handler={require('./components/authors/authorPage')}/>
        
        <Route name="addCondominio" path="condominio" handler={require('./components/condominios/manageCondominioPage')}/>
        <Route name="addEndereco" path="condominio/:idCondominio/endereco"  handler={require('./components/enderecos/manageEnderecoPage')}/>
        <Route name="addFacility" path="condominio/:idCondominio/facility"  handler={require('./components/facilities/manageFacilitiesPage')}/>
        <Route name="manageAuthor" path="author/:id" handler={require('./components/authors/manageAuthorPage')}/>
        <Route name="manageCondominio" path="condominio/:id" handler={require('./components/condominios/manageCondominioPage')}/>
        <Route name="manageEndereco" path="condominio/:idCondominio/endereco/:idEndereco" handler={require('./components/enderecos/manageEnderecoPage')}/>
        <Route name="manageFacility" path="condominio/:idCondominio/facility/:idFacility" handler={require('./components/facilities/manageFacilitiesPage')}/>
        <Route name="about" handler={require('./components/about/aboutPage')}/>
        <Route name="condominios" handler={require('./components/condominios/condominiosPage')}/>
        <NotFoundRoute handler={require('./components/notFoundPage')}/>
        <Redirect from="about-us" to="about"/>
        <Redirect from="awthors" to="authors"/>
        <Redirect from="about*" to="about"/> */