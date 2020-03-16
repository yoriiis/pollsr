'use strict';

import PollsrTemplate from '../pollsr-template';
import datas from '../../../examples/datas.json';

let pollsrTemplate;

const getOptions = () => {
	return {
		element: document.querySelector('#pollsr-1'),
		datas: datas,
		hasVoted: false,
		onAction: answerId => {}
	};
};

const getInstance = () => {
	return new PollsrTemplate();
};

beforeEach(() => {
	document.body.innerHTML = '<div id="pollsr-1"></div>';
	pollsrTemplate = getInstance();
});

describe('PollsrTemplate function', () => {
	it('Should initialize the template', () => {
		pollsrTemplate.buildDOM = jest.fn();
		pollsrTemplate.addEvents = jest.fn();
		pollsrTemplate.updateTemplateAfterVote = jest.fn();

		pollsrTemplate.init({
			options: getOptions()
		});

		expect(pollsrTemplate.buildDOM).toHaveBeenCalled();
		expect(pollsrTemplate.addEvents).toHaveBeenCalled();
		expect(pollsrTemplate.updateTemplateAfterVote).not.toHaveBeenCalled();
	});

	it('Should build the DOM', () => {
		pollsrTemplate.init({
			options: getOptions()
		});
		pollsrTemplate.buildDOM();

		expect(pollsrTemplate.options.element.querySelectorAll('.pollsr-answerItem')).toHaveLength(
			3
		);
	});

	it('Should build the DOM without images', () => {
		const options = getOptions();
		options.datas.answers[0].image = null;
		pollsrTemplate.init({
			options: options
		});
	});

	it('Should click on the button', () => {
		pollsrTemplate.clickToRespond = jest.fn();

		pollsrTemplate.init({
			options: getOptions()
		});
		pollsrTemplate.options.element.querySelector('[data-pollsr-respond]').click();

		expect(pollsrTemplate.clickToRespond).toHaveBeenCalled();
	});

	it('Should click outside of button', () => {
		pollsrTemplate.clickToRespond = jest.fn();

		pollsrTemplate.init({
			options: getOptions()
		});
		pollsrTemplate.options.element.querySelector('.pollsr-picture').click();

		expect(pollsrTemplate.clickToRespond).not.toHaveBeenCalled();
	});

	it('Should click on the button without onAction function', async () => {
		pollsrTemplate.updateTemplateAfterVote = jest.fn();

		const options = getOptions();
		options.onAction = null;
		pollsrTemplate.init({
			options: options
		});
		pollsrTemplate.options.element.querySelector('[data-pollsr-respond]').click();

		expect(pollsrTemplate.updateTemplateAfterVote).not.toHaveBeenCalled();
	});

	it('Should click on a answer when user has not yet voted', async () => {
		pollsrTemplate.updateTemplateAfterVote = jest.fn();

		pollsrTemplate.init({
			options: getOptions()
		});
		pollsrTemplate.options.onAction = jest.fn();
		pollsrTemplate.options.element.querySelector('[data-pollsr-respond]').click();

		await expect(pollsrTemplate.options.onAction).toHaveBeenCalled();
		expect(pollsrTemplate.updateTemplateAfterVote).toHaveBeenCalled();
	});

	it('Should click on a answer when user has already voted', async () => {
		const options = getOptions();
		options.hasVoted = true;
		pollsrTemplate.init({
			options: options
		});
		pollsrTemplate.options.onAction = jest.fn();
		pollsrTemplate.options.element.querySelector('[data-pollsr-respond]').click();

		await expect(pollsrTemplate.options.onAction).not.toHaveBeenCalled();
	});

	it('Should update the template after the vote', async () => {
		pollsrTemplate.init({
			options: getOptions()
		});
		pollsrTemplate.options.onAction = jest.fn();
		pollsrTemplate.options.element.querySelector('[data-pollsr-respond]').click();

		await expect(pollsrTemplate.options.onAction).toHaveBeenCalled();

		const elementHasClass = pollsrTemplate.options.element
			.querySelector('.pollsr')
			.classList.contains('has-voted');
		expect(elementHasClass).toBe(true);
	});

	it('Should destroy the pollsrTemplate', () => {
		pollsrTemplate.init({
			options: getOptions()
		});
		pollsrTemplate.options.element.removeEventListener = jest.fn();
		pollsrTemplate.destroy();

		expect(pollsrTemplate.options.element.removeEventListener).toHaveBeenCalled();
	});
});
