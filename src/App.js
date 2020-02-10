import React from 'react';
import config from './config';
import { Route } from 'react-router-dom';
import ClimbsContext from './ClimbsContext';
import Header from './Header/Header';
import ClimbList from './ClimbList/ClimbList';
import AddClimb from './AddClimb/AddClimb';

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

  addClimb = climb => {
    this.setState({
      climbs: [ ...this.state.climbs, climb ]
    })
  };

  deleteClimb = id => {
    const newClimb = this.state.climbs.filter(climb => climb.id !== id)
    this.setState({
      climbs: newClimb
    })
  };

  updateClimb = updatedClimb => {
    this.setState({
      climbs: this.state.climbs.map(climb =>
        (climb.id !== updatedClimb.id) ? climb : updatedClimb)
    })
  };

  editClimb = (climbId, climbData) => {
    this.setState({
      climbs: this.state.climbs.map(climb =>
        climb.id === Number(climbId) ? {...climb, ...climbData} : climb
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
      addClimb: this.addClimb,
      deleteClimb: this.deleteClimb,
      updatedClimb: this.updatedClimb,
      editClimb: this.editClimb
    };
    
    return (
      <main className='App'>
        <header className='App_header'>
          <Header />
        </header>

        <h2> Venga <br />
          A place to save all rock climbs for the community </h2>

        <ClimbsContext.Provider value={contextValue}>

          {['/', '/climbs/:id'].map(path =>
            <Route 
            exact
            key={path}
            path={path}
            component={ClimbList}
            />
          )}

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