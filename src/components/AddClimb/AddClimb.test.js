import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import AddClimb from './AddClimb'

describe(`AddClimb component`, () => {
  const stubAddClimb = [
    {
      "id": "b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1",
      "name": "climb1",
      "location": "Test location",
      "description": "test desc",
      "grade": 'test grade',
      'type':'Boulder',
      'rating':'5'
    },
    {
      "id": "b07161a6-ffaf-11e8-8eb2-f2801f1b9fd1",
      "name": "climb2",
      "location": "Test location 2",
      "description": "test desc 2",
      "grade": 'test grade 2',
      'type':'Sport',
      'rating':'3'
    }
  ]

  it('renders the complete form', () => {
    const context = { rescipes: stubAddClimb }
    const wrapper = shallow(<AddClimb />, context)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  
})