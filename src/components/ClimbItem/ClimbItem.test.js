import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import ClimbItem from './ClimbItem'

describe(`ClimbItem component`, () => {
  const props = {
    id: 'a11114yjfj',
    name: 'test-class-name',
    location: 'test-location',
    description: 'test-description',
    grade: 'test-grade',
    type: 'Traditional',
    rating:'4'
  }

  it('renders climbs by default', () => {
    const wrapper = shallow(<ClimbItem />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('renders climbs given props', () => {
    const wrapper = shallow(<ClimbItem {...props} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})