import React from 'react';
import config from './config';
import { Route } from 'react-router-dom';
import ClimbsContext from './contexts/ClimbsContext';
import ClimbList from './components/ClimbList/ClimbList';
import ClimbItem from './components/ClimbItem/ClimbItem'
import AddClimb from './components/AddClimb/AddClimb';
import LandingPage from './components/LandingPage/LandingPage'
export default class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state={
      climbs: [],
      search: ''
    }
  };

  setClimbs = climbs => {
    this.setState({
      climbs
    })
  };

  AddClimb = climb => {
    this.setState({
      climbs: [ ...this.state.climbs, climb ]
    })
  };

  deleteClimb = id => {
    const newClimb = this.state.climbs.filter(cl => cl.id !== id)
    this.setState({
      climbs: newClimb
    })
  };

  updateClimb = updatedClimb => {
    this.setState({
      climbs: this.state.climbs.map(cl =>
        (cl.id !== updatedClimb.id) ? cl : updatedClimb)
    })
  };

  editClimb = (climbId, climbData) => {
    this.setState({
      climbs: this.state.climbs.map(c =>
        c.id === Number(climbId) ? {...c, ...climbData} : c
      )
    })
  };

  componentDidMount() {
    fetch(`${config.API_ENDPOINT}/climbs`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => {
        if(!res.ok) {
          return res.json().then(error => Promise.reject(error))
        }
        return res.json()
      })
      .then((climbs) => {
        this.setClimbs(climbs)
      })
      .catch(error => {
        this.setState({error})
      })
  };

  render() {
    const contextValue = {
      climbs: this.state.climbs,
      AddClimb: this.AddClimb,
      deleteClimb: this.deleteClimb,
      updatedClimb: this.updatedClimb,
      editClimb: this.editClimb
    };
    
    return (
      <main className='App'>

        <ClimbsContext.Provider value={contextValue}>

        <Route 
            exact
            path='/'
            component={LandingPage}
          />

          
          <Route 
            exact
            path={'/climbs'}
            component={ClimbList}
            />

        <Route 
            exact
            path={'/climbs:id'}
            component={ClimbItem}
            />
          

          <Route 
            exact
            path='/addclimb'
            component={AddClimb}
          />

        </ClimbsContext.Provider>
      </main>
    );
  };

};