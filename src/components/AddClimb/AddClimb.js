import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import ClimbsContext from '../../contexts/ClimbsContext';
import config from '../../config';
import './AddClimb.css';

const Required = () => (
  <span className='AddClimb_required'> * </span>
);
export default class AddClimb extends Component {
  static defaultProps = {
    history: {
      push: () => { }
    }
  };

  static contextType = ClimbsContext;

  handleSubmit = e => {
    e.preventDefault();

    const { name, location, description, type, grade, rating } = e.target; 
    const newClimb = {
      name: name.value,
      location: location.value,
      description: description.value,
      type: type.value,
      grade: grade.value,
      rating: rating.value
    };
    fetch(`${config.API_ENDPOINT}/climbs`, {
      method: 'POST',
      body: JSON.stringify(newClimb),
      headers: {
        'content-type': 'application/json',
      }
    })
    .then(res => {
      if(!res.ok) {
        return res.json().then(error => Promise.reject(error))
      }
      return res.json()
    })
    .then(data => {
      name.value = ''
      location.value = ''
      description.value = ''
      type.value = ''
      grade.value = ''
      rating.value = ''
      this.context.AddClimb(data)
      this.props.history.push('/climbs')
    })
    .catch(error => {
      this.setState({error})
    })

  };

  render() {
    return(
      <section className='AddClimb'>
        <div className='add-climb-top'>
        <Link className="logo-img" to="/">
          <img
                className="logo-img"
                src={require('../../assets/logo1.png')}
                alt={'venga logo'}
                width={'200px'}
            />
            </Link>
        </div>
        <h3> Add a new climb! </h3>
        
        <form
          className='AddClimb_form'
          onSubmit={this.handleSubmit}
        >
          <div>
            <label htmlFor="Name">Name: {' '} <Required /></label> <br />
            <input type="text" id="name" name="Name" placeholder="Name of climb" required />
          </div>

          <div>
            <label htmlFor="Location">Location: {' '} <Required /></label> <br />
            <input type="text" id="location" name="location" placeholder="Where is it located"required />
          </div>

          

          <div>
            <label htmlFor="Grade">Grade: {' '} <Required /></label> <br />
            <input type="text" id="grade" name="grade" placeholder="Difficulty"required />
          </div>

          <div>
            <label htmlFor="type">Type:</label>
              <select id="type">
                <option value='0'>Select Type</option>
                <option value="Boulder">Boulder</option>
                <option value="Sport">Sport</option>
                <option value="Traditional">Traditional</option>
                <option value="Ice">Ice</option>
                <option value="Other">Other</option>
              </select>
          </div>
          <div>
            <label htmlFor="rating">Rating:</label>
              <select id="rating">
                <option value="0">Select Rating</option>
                <option value="1">★☆☆☆☆</option>
                <option value="2">★★☆☆☆</option>
                <option value="3">★★★☆☆</option>
                <option value="4">★★★★☆</option>
                <option value="5">★★★★★</option>
              </select>
          </div>
          <div>
            <label htmlFor="Description"> Description: {' '} <Required /></label> <br />
            <textarea id="description" name="description" rows="6" cols="40" placeholder="Write your opinion..."required></textarea>
          </div>
          <div>
            <button type="submit"> Add Climb </button>
            <Link to={'/'}><button type='button'> Back </button></Link>

          </div>
        </form>
      </section>
    )
  }
  
};