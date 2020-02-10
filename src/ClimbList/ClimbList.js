import React, { Component } from 'react';
import ClimbsContext from '../ClimbsContext';
import ClimbItem from '../ClimbItem/ClimbItem';

export default class ClimbList extends Component {
  static defaultProps = {
    climbs: []
  }

  static contextType = ClimbsContext;
  
  render() {
    const { climbs } = this.context;

    return(
      <section className='ClimbList'>
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