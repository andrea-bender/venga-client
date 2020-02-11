import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ClimbsContext from '../../contexts/ClimbsContext';
import ClimbItem from '../ClimbItem/ClimbItem';
import './ClimbList.css';

export default class ClimbList extends Component {
  static defaultProps = {
    climbs: []
  }

  static contextType = ClimbsContext;
  
  render() {
    const { climbs } = this.context;

    return(
      <section className='ClimbList'>
        <div className='climb-list-top'>
        <Link className="logo-img" to="/">
          <img
                className="logo-img"
                src={require('../../assets/logo1.png')}
                alt={'venga logo'}
                width={'200px'}
            />
            </Link>
        </div>
        <Link className='add-climb' to='/addclimb'>
          <h2>+ Add Climb</h2>
        </Link>
        <ul className='climb_list'>
          {climbs.map(climb => 
            <ClimbItem
              key={climb.id}
              id={climb.id}
              {...climb}
            />
          )}
        </ul>
      </section>
    )
  }

};