import logo from './logo.svg';
import './App.css';

import News from './components/News';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
  state={
    progress:0
  }
  pagesize=10
  api="40cdea31bdfd4587a0693f7ec5b718e5"
  setProgress=(p)=>{
       this.setState({progress:p})
  }
  render() {
    return (
      <div>
      <BrowserRouter>
      <LoadingBar
        color='#f11946'
        progress={this.state.progress}
      />
      <Navbar/>
<Routes>
  <Route exact path='/' element={<News setProgress={this.setProgress}  apikey={this.api} key="general" pageSize={this.pagesize} country="in" category="general"/>}/>
  <Route exact path='/business' element={<News setProgress={this.setProgress}  apikey={this.api} key="business" pageSize={this.pagesize} country="in" category="business"/>}/>
  <Route exact path='/technology' element={<News setProgress={this.setProgress}  apikey={this.api} key="technology" pageSize={this.pagesize} country="in" category="technology"/>}/>
  <Route exact path='/health' element={<News setProgress={this.setProgress}  apikey={this.api} key="health" pageSize={this.pagesize} country="in" category="health"/>}/>
  <Route exact path='/sports' element={<News setProgress={this.setProgress}  apikey={this.api} key="sports" pageSize={this.pagesize} country="in" category="sports"/>}/>
  <Route exact path='/science' element={<News setProgress={this.setProgress}  apikey={this.api} key="science" pageSize={this.pagesize} country="in" category="science"/>}/>
  <Route exact path='/entertainment' element={<News setProgress={this.setProgress} apikey={this.api} key="entertainment"  pageSize={this.pagesize} country="in" category="entertainment"/>}/>

</Routes>
      </BrowserRouter>
      </div>
    )
  }
}
