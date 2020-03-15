import PollsrTemplate from './pollsr-template'

export default class PollsrCore {
	/**
	 * @param {options}
	 */
	constructor (options) {
		this.events = {}

		const userOptions = options || {}
		const defaultOptions = {
			element: null,
			template: null,
			datas: null,
			onAction: null,
			hasVoted: false
		}

		// Merge default options with user options
		this.options = Object.assign(defaultOptions, userOptions)

		// Get element id in attribute "id"
		this.id = this.options.element.getAttribute('id').match(/[0-9]+/g)[0]
	}

	/**
	 * Create the Pollsr by get datas from the web service and initialize the template.
	 *
	 * @returns {Promise} with web service datas in parameter
	 */
	create () {
		// If user use the default template, load it by dynamic import
		if (this.options.template === null) {
			// Instanciate the default PollsrTemplate class
			this.options.template = new PollsrTemplate()
		}

		// Else, user use a custom template, check that the class has a function init
		if (typeof this.options.template.init === 'function') {
			// Init the template and resolve the create promise
			this.initTemplate()
		}
	}

	/**
	 * Init the PollsrTemplate and share options from PollsrCore
	 *
	 * @returns {Promise} without datas, to detect when is ready
	 */
	initTemplate () {
		this.options.template.init({
			options: this.options
		})
	}

	/**
	 * Destroy method to reset the Pollsr (events, class properties, template)
	 */
	destroy () {
		this.options.template.destroy()
		this.options.element.removeChild(this.options.element.querySelector('.pollsr'))
	}
}
