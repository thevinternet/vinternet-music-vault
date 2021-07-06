import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Footer from './Footer';

configure({adapter: new Adapter()});

describe('<Footer />', () => {			
	it('should render the correct text in footer', () => {
			const wrapper = shallow(<Footer />);
			expect(wrapper.contains(<p>&copy; The Vinternet</p>)).toEqual(true);
	});
});
