//===============================================================================================================//

// Add ARIA Accessibility Helpers To Native Accordion

export const accordion = () => {

	if (document.querySelector('[data-accordion-group]')) {
		
		// Add All Accordion Containers To Array
		const accordionContainer = [].slice.call(document.querySelectorAll('[data-accordion-group]'));

		accordionContainer.forEach(function(accordion) {
			
			// Loop Though Each Accordion Container Adding Each Accordion Control Into Respective Array
			const accordionControls = [].slice.call(accordion.querySelectorAll('[data-accordion-control]'));
			
			// Add Event Listener To Each Accordion Control Which Switches ARIA-EXAPANDED Attribute Value
			accordionControls.forEach(function(control) {
				control.addEventListener('click', function(event) {
					control.getAttribute('aria-expanded') === 'false'
					? control.setAttribute('aria-expanded', 'true')
					: control.setAttribute('aria-expanded', 'false');
				})
			})
		})		
	}
}

//===============================================================================================================//
