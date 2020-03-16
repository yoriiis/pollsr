import { PollsrCore, PollsrTemplate } from '../../dist/pollsr.js';
import datas from '../datas.json';

const answerId = window.sessionStorage.getItem('pollsr-answer');

class CustomTemplate extends PollsrTemplate {
	updateTemplateAfterVote () {
		super.updateTemplateAfterVote();
		this.options.element
			.querySelector(`.pollsr-button[data-answer-id="${answerId}"]`)
			.parentNode.classList.add('active');
	}

	getTemplate (datas) {
		return `<div class="pollsr${this.options.hasVoted ? ' has-voted' : ''}">
					<p class="pollsr-question">Hey, ${datas.question}</p>
					<ul class="pollsr-answers">
						${this.getAnswersList(datas.answers)}
					</ul>
					<a href="https://www.themoviedb.org" class="pollsr-footer">Source: TMDb</a>
				</div>`;
	}
}

const pollsrCore = new PollsrCore({
	element: document.querySelector('#pollsr-1'),
	template: new CustomTemplate(),
	datas: datas,
	hasVoted: answerId,
	onAction: answerId => {
		console.log('PollsrCore::onAction', `answerId=${answerId}`);
		window.sessionStorage.setItem('pollsr-answer', answerId);
	}
});

// Create the Pollsr from the instance
pollsrCore.create();
