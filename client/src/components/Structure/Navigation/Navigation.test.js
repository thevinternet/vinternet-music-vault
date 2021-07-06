import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Navigation from './Navigation';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()});

describe('<Navigation />', () => {
	let wrapper;

	beforeEach(() => {
			wrapper = shallow(<Navigation />);
	});

	it('should render six <NavigationItem /> elements if not authenticated', () => {
			expect(wrapper.find(NavigationItem)).toHaveLength(6);
	});

	it('should render seven <NavigationItem /> elements if authenticated', () => {
			wrapper.setProps({isAuth: true});
			expect(wrapper.find(NavigationItem)).toHaveLength(7);
	});

	it('should render the correct profile link element if authenticated', () => {
			wrapper.setProps({isAuth: true});
			expect(wrapper.contains(<NavigationItem link="/profile">Profile</NavigationItem>)).toEqual(true);
	});
});
