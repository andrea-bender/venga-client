import React from 'react';
import ClimbsContext from '../../contexts/ClimbsContext';
import config from '../../config';
import './ClimbItem.css';

function deleteClimbRequest(id, cb) {
  fetch(config.API_ENDPOINT + `/climbs/${id}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(res => {
      if(!res.ok) {
        return res.json().then(error => Promise.reject(error))
      }
    })
    .then(() => {
      cb(id)
    })
    .catch(error => {
      console.error(error)
    })
};

export default function ClimbItem(props) {
  return (
    <ClimbsContext.Consumer>
      { (context) => (
        <div className ='climbItem'>
          <div className = 'climbItem_info'>
            <h3>{props.name}</h3>
              
            <ul>
              <li>Location: {props.location}</li>
              <li>Grade: {props.grade} </li>
              <li>Type:{props.type}</li>
              <li>Description: {props.description}</li>
              <li>Rating: {props.rating} Stars</li>
            </ul>
          </div>

          <div className='climbsButton'>
            <button className='delete'
              onClick={() => {
              deleteClimbRequest(
                props.id,
                context.deleteClimb
              )
              }}> 
                Delete Climb
            </button>
          </div>
        </div>
      )}
    </ClimbsContext.Consumer>
  )

};