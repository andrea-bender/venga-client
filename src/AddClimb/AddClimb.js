import React, {Component} from 'react';
import ClimbsContext from '../ClimbsContext';
import config from '../config';
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
      rating.value = 0
      this.context.AddClimb(data)
      this.props.history.push('/')
    })
    .catch(error => {
      this.setState({error})
    })

  };

  render() {
    return(
      <section className='AddClimb'>
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
            <input type="text" id="location" name="location" required />
          </div>

          <div>
            <label htmlFor="Description"> Description: {' '} <Required /></label> <br />
            <textarea id="description" name="description" rows="6" cols="45" required></textarea>
          </div>

          <div>
            <label htmlFor="Grade">Grade: {' '} <Required /></label> <br />
            <input type="text" id="grade" name="grade" required />
          </div>

          <div>
            <label for="type">Type</label>
              <select id="type">
                <option value="Boulder">Boulder</option>
                <option value="Sport">Sport</option>
                <option value="Traditional">Traditional</option>
                <option value="Ice">Ice</option>
                <option value="Other">Other</option>
              </select>
          </div>

          <div className='rating'>
            <label>
              <input type="radio" name="stars" value="1" />
              <span class="icon">★</span>
            </label>
            <label>
              <input type="radio" name="stars" value="2" />
              <span class="icon">★</span>
              <span class="icon">★</span>
            </label>
            <label>
              <input type="radio" name="stars" value="3" />
              <span class="icon">★</span>
              <span class="icon">★</span>
              <span class="icon">★</span>   
            </label>
            <label>
              <input type="radio" name="stars" value="4" />
              <span class="icon">★</span>
              <span class="icon">★</span>
              <span class="icon">★</span>
              <span class="icon">★</span>
            </label>
            <label>
              <input type="radio" name="stars" value="5" />
              <span class="icon">★</span>
              <span class="icon">★</span>
              <span class="icon">★</span>
              <span class="icon">★</span>
              <span class="icon">★</span>
            </label>
          </div>

          <div>
            <button type="submit"> Add your climb </button>
          </div>
        </form>
      </section>
    )
  }
  
};