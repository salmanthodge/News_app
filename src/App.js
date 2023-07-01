import './App.css';
import React, { Component } from 'react'
import Nav from './components/Nav';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
// import NewItem from './components/NewItem';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


export class App extends Component {
  pageSize = 6;
  apikey=process.env.REACT_APP_NEWS_API

  state = {
    progress:0
  }
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  render() {
    return (
      <div>
        <Router>
        <Nav/>
        <LoadingBar
        height={3}
        color='#f11946'
        progress={this.state.progress}
        
      />
        <Routes>
          <Route exact path="/"element={<News setProgress={this.setProgress}  apikey={this.apikey}   key="general" pageSize={this.pageSize} country="in" category="general"/>}></Route>
          <Route exact path="/business" element={<News setProgress={this.setProgress}  apikey={this.apikey}   key="business" pageSize={this.pageSize} country="in" category="business"/>}></Route>
          <Route exact path="/entertainment" element={<News setProgress={this.setProgress}  apikey={this.apikey}   key="entertainment" pageSize={this.pageSize} country="in" category="entertainment"/>}></Route>
          <Route exact path="/general" element={<News setProgress={this.setProgress}  apikey={this.apikey}   key="general" pageSize={this.pageSize} country="in" category="general"/>}></Route>
          <Route exact path="/health" element={<News setProgress={this.setProgress}  apikey={this.apikey}   key="health" pageSize={this.pageSize} country="in" category="health"/>}></Route>
          <Route exact path="/science" element={<News setProgress={this.setProgress}  apikey={this.apikey}   key="science" pageSize={this.pageSize} country="in" category="science"/>}></Route>
          <Route exact path="/sports" element={<News setProgress={this.setProgress}  apikey={this.apikey}   key="sports" pageSize={this.pageSize} country="in" category="sports"/>}></Route>
          <Route exact path="/technology" element={<News setProgress={this.setProgress}  apikey={this.apikey}   key="technology" pageSize={this.pageSize} country="in" category="technology"/>}></Route>
        </Routes>
        </Router>
        {/* <NewItem/> */}
      </div>
    )
  }
}


export default App;
