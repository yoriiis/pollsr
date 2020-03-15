import '../styles/base.css'

export default class PollsrTemplate {
	/**
	 * Function to instanciate the template
	 *
	 * @param {Object} core Context of the Core instance
	 */
	init ({ options }) {
		this.options = options

		// Build DOM with the template function
		this.buildDOM(this.getTemplate(this.options.datas))

		this.addEvents()

		// Update template only if user has already vote
		if (this.options.hasVoted) {
			this.updateTemplateAfterVote()
		}
	}

	/**
	 * Function to build the HTML template depending on datas
	 *
	 * @param {Object} datas Pollsr datas
	 */
	getTemplate (datas) {
		return `<div class="pollsr${this.options.hasVoted ? ' has-voted' : ''}">
					<p class="pollsr-question">${datas.question}</p>
					<ul class="pollsr-answers">
						${this.getAnswersList(datas.answers)}
					</ul>
				</div>`
	}

	getAnswersList (answers) {
		let html = ''
		answers.forEach(answer => {
			let image = ''
			if (answer.image) {
				image = `<div class="pollsr-picture">
							<img src="${answer.image}" alt="" />
						</div>`
			}
			html += `<li class="pollsr-listAnswers">
						<button class="pollsr-button" data-answer-id="${answer.id}" data-pollsr-respond>
							<figure>
								${image}
								<figcaption>
									<p>${answer.title}</p>
								</figcaption>
							</figure>
						</button>
					</li>`
		})

		return html
	}

	/**
	 * Insert result of the template function in the DOM
	 *
	 * @param {Function} template Function to return the template
	 */
	buildDOM (template) {
		this.options.element.insertAdjacentHTML('beforeend', template)
	}

	/**
	 * Add event listeners
	 */
	addEvents () {
		// Add callback listener on property class for the destroy method
		this.onClickToRespond = e => {
			this.clickToRespond(e)
		}

		// Add click event listener on all answers
		const answers = [...this.options.element.querySelectorAll('[data-pollsr-respond]')]
		answers.forEach(answer => {
			answer.addEventListener('click', this.onClickToRespond, false)
		})
	}

	/**
	 * Callback click event listener to trigger a vote
	 *
	 * @param {Event} e Event listener parameter
	 */
	clickToRespond = async e => {
		e.preventDefault()

		// Check if user has not yet voted
		if (!this.options.hasVoted) {
			this.options.hasVoted = true
			if (typeof this.options.onAction === 'function') {
				await this.options.onAction()
				this.updateTemplateAfterVote()
			}
		}
	}

	/**
	 * Update the template after the vote (counter, state, progress bar)
	 */
	updateTemplateAfterVote () {
		if (this.options.element.querySelector('.pollsr') !== null) {
			this.options.element.querySelector('.pollsr').classList.add('has-voted')
		}
	}

	/**
	 * Destroy method to reset the Pollsr (events, class properties)
	 */
	destroy () {
		const answers = [...this.options.element.querySelectorAll('.pollsr-button')]
		answers.forEach(answer => {
			answer.removeEventListener('click', this.onClickToRespond)
		})
	}
}
