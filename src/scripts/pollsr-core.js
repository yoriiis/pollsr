import PollsrTemplate from './pollsr-template';

/**
 * @license MIT
 * @name Pollsr
 * @version 1.0.1
 * @author: Yoriiis aka Joris DANIEL <joris.daniel@gmail.com>
 * @description: Pollsr library to dynamically create polls with a minimalist elegant theme
 * {@link https://github.com/yoriiis/pollsr}
 * @copyright 2020 Joris DANIEL
 **/

export default class PollsrCore {
	/**
	 * @param {options}
	 */
	constructor (options) {
		const userOptions = options || {};
		const defaultOptions = {
			element: null,
			template: null,
			datas: null,
			hasVoted: false,
			onAction: null
		};

		// Merge default options with user options
		this.options = Object.assign(defaultOptions, userOptions);
	}

	/**
	 * Create the Pollsr with datas and initialize the template.
	 *
	 * @returns {Promise} with web service datas in parameter
	 */
	create () {
		// If user use the default template, inject it
		if (this.options.template === null) {
			// Instanciate the default PollsrTemplate class
			this.options.template = new PollsrTemplate();
		}

		// Initialize the template
		if (typeof this.options.template.init === 'function') {
			// Init the template and resolve the create promise
			this.initTemplate();
		} else {
			throw new Error('Pollsr::PollsrTemplate need an "init" function.');
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
		});
	}

	/**
	 * Destroy method to reset the Pollsr (events, class properties, template)
	 */
	destroy () {
		this.options.template.destroy();
	}
}
