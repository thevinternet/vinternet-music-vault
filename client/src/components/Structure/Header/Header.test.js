import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Header from './Header';
import Navigation from '../Navigation/Navigation';


configure({adapter: new Adapter()});

describe('<Header />', () => {			
	it('should render the Navigation component in header', () => {
			const wrapper = shallow(<Header />);
			expect(wrapper.contains(<Navigation />)).toEqual(true);
	});
});
