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
	document.body.innerHTML = `<div id="pollsr-1">
									<div class="pollsr">
										<div class="pollsr-picture"></div>
										<button class="pollsr-button" data-answer-id="1" data-pollsr-respond>
									</div>
								</div>`;
	pollsrTemplate = getInstance();
	pollsrTemplate.options = getOptions();
});

describe('PollsrTemplate init', () => {
	it('Should call the init function', () => {
		pollsrTemplate.buildDOM = jest.fn();
		pollsrTemplate.getTemplate = jest.fn();
		pollsrTemplate.addEvents = jest.fn();
		pollsrTemplate.updateTemplateAfterVote = jest.fn();

		pollsrTemplate.init(getOptions());

		expect(pollsrTemplate.options).toEqual({
			element: expect.any(HTMLDivElement),
			datas: datas,
			hasVoted: false,
			onAction: expect.any(Function)
		});
		expect(pollsrTemplate.buildDOM).toHaveBeenCalled();
		expect(pollsrTemplate.getTemplate).toHaveBeenCalledWith(datas);
		expect(pollsrTemplate.addEvents).toHaveBeenCalled();
		expect(pollsrTemplate.updateTemplateAfterVote).not.toHaveBeenCalled();
	});

	it('Should call the init function with already a vote', () => {
		pollsrTemplate.buildDOM = jest.fn();
		pollsrTemplate.getTemplate = jest.fn();
		pollsrTemplate.addEvents = jest.fn();
		pollsrTemplate.updateTemplateAfterVote = jest.fn();

		const options = getOptions();
		options.hasVoted = true;
		pollsrTemplate.init(options);

		expect(pollsrTemplate.updateTemplateAfterVote).toHaveBeenCalled();
	});
});

describe('PollsrTemplate getTemplate', () => {
	it('Should call the getTemplate function', () => {
		expect(pollsrTemplate.getTemplate(datas)).toEqual(expect.any(String));
	});
});

describe('PollsrTemplate getAnswersList', () => {
	it('Should call the getAnswersList function', () => {
		expect(pollsrTemplate.getAnswersList(datas.answers)).toEqual(expect.any(String));
	});
});

describe('PollsrTemplate buildDOM', () => {
	it('Should call the buildDOM function', () => {
		const template = '<div>template</div>';

		pollsrTemplate.options.element.insertAdjacentHTML = jest.fn();

		pollsrTemplate.buildDOM(template);

		expect(pollsrTemplate.options.element.insertAdjacentHTML).toHaveBeenCalledWith(
			'beforeend',
			template
		);
	});
});

describe('PollsrTemplate addEvents', () => {
	it('Should call the addEvents function', () => {
		pollsrTemplate.options.element.addEventListener = jest.fn();

		pollsrTemplate.addEvents();

		expect(pollsrTemplate.options.element.addEventListener).toHaveBeenCalled();
		expect(pollsrTemplate.onClickToElement).toEqual(expect.any(Function));
	});

	it('Should click on a response button', () => {
		pollsrTemplate.clickToRespond = jest.fn();

		pollsrTemplate.addEvents();
		pollsrTemplate.options.element.querySelector('[data-pollsr-respond]').click();

		expect(pollsrTemplate.clickToRespond).toHaveBeenCalled();
	});

	it('Should click elsewhere than on the response button', () => {
		pollsrTemplate.clickToRespond = jest.fn();

		pollsrTemplate.addEvents();
		pollsrTemplate.options.element.querySelector('.pollsr-picture').click();

		expect(pollsrTemplate.clickToRespond).not.toHaveBeenCalled();
	});

	it('Should call the clickToRespond function', async () => {
		pollsrTemplate.updateTemplateAfterVote = jest.fn();
		pollsrTemplate.options.onAction = jest.fn();

		await pollsrTemplate.clickToRespond({
			preventDefault: () => {},
			target: {
				getAttribute: () => '1'
			}
		});

		expect(pollsrTemplate.options.hasVoted).toBe(true);
		expect(pollsrTemplate.currentAnswer).toBe('1');
		expect(pollsrTemplate.options.onAction).toHaveBeenCalledWith('1');
		expect(pollsrTemplate.updateTemplateAfterVote).toHaveBeenCalled();
	});

	it('Should call the clickToRespond function with already a vote', async () => {
		pollsrTemplate.updateTemplateAfterVote = jest.fn();
		pollsrTemplate.options.onAction = jest.fn();

		pollsrTemplate.options.hasVoted = true;
		await pollsrTemplate.clickToRespond({
			preventDefault: () => {},
			target: {
				getAttribute: () => '1'
			}
		});

		expect(pollsrTemplate.options.onAction).not.toHaveBeenCalledWith();
		expect(pollsrTemplate.updateTemplateAfterVote).not.toHaveBeenCalled();
	});

	it('Should call the clickToRespond function without onAction function', async () => {
		pollsrTemplate.updateTemplateAfterVote = jest.fn();

		pollsrTemplate.options.onAction = null;
		await pollsrTemplate.clickToRespond({
			preventDefault: () => {},
			target: {
				getAttribute: () => '1'
			}
		});

		expect(pollsrTemplate.updateTemplateAfterVote).not.toHaveBeenCalled();
	});
});

describe('PollsrTemplate updateTemplateAfterVote', () => {
	it('Should call the updateTemplateAfterVote', () => {
		pollsrTemplate.updateTemplateAfterVote();

		expect(document.querySelector('.pollsr').classList.contains('has-voted')).toBe(true);
	});
});

describe('PollsrTemplate destroy', () => {
	it('Should call the destroy function', () => {
		pollsrTemplate.options.element.removeEventListener = jest.fn();
		pollsrTemplate.options.element.removeChild = jest.fn();

		pollsrTemplate.destroy();

		expect(pollsrTemplate.options.element.removeEventListener).toHaveBeenCalled();
		expect(pollsrTemplate.options.element.removeChild).toHaveBeenCalledWith(
			document.querySelector('.pollsr')
		);
	});
});
