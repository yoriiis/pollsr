'use strict';

import PollsrCore from '../pollsr-core';
import PollsrTemplate from '../pollsr-template';
import datas from '../../../examples/datas.json';

let pollsrCore;

const getOptions = () => {
	return {
		element: document.querySelector('#pollsr-1'),
		datas: datas,
		hasVoted: false,
		onAction: answerId => {}
	};
};

const getInstance = () => {
	return new PollsrCore(getOptions());
};

beforeEach(() => {
	document.body.innerHTML = '<div id="pollsr-1"></div>';
	pollsrCore = getInstance();
});

describe('PollsrCore constructor', () => {
	it('Should initialize the constructor with custom options', () => {
		expect(pollsrCore.options).toEqual({
			element: expect.any(HTMLDivElement),
			datas: datas,
			hasVoted: false,
			template: null,
			onAction: expect.any(Function)
		});
	});

	it('Should initialize the constructor function without options', () => {
		const instance = new PollsrCore();

		expect(instance.options).toEqual({
			element: null,
			template: null,
			datas: null,
			onAction: null,
			hasVoted: false
		});
	});
});

describe('PollsrCore create', () => {
	it('Should call the create function', () => {
		pollsrCore.initTemplate = jest.fn();

		pollsrCore.create();

		expect(pollsrCore.initTemplate).toHaveBeenCalled();
		expect(pollsrCore.options.template).toBeInstanceOf(PollsrTemplate);
	});

	it('Should call the create function without already a template', () => {
		const template = {
			init: () => true
		};
		pollsrCore.options.template = template;

		pollsrCore.create();

		expect(pollsrCore.options.template).toEqual(template);
	});

	it('Should call the create function without init method inside the template', () => {
		pollsrCore.options.template = {
			init: null
		};

		expect(() => {
			pollsrCore.create();
		}).toThrow(new Error('Pollsr::PollsrTemplate need an "init" function.'));
	});
});

describe('PollsrCore initTemplate', () => {
	it('Should call the initTemplate function', () => {
		pollsrCore.options.template = {
			init: () => {}
		};

		pollsrCore.options.template.init = jest.fn();

		pollsrCore.initTemplate();

		expect(pollsrCore.options.template.init).toHaveBeenCalled();
	});
});

describe('PollsrCore destroy', () => {
	it('Should call the destroy function', () => {
		pollsrCore.options.template = {
			destroy: () => true
		};

		pollsrCore.options.template.destroy = jest.fn();

		pollsrCore.destroy();

		expect(pollsrCore.options.template.destroy).toHaveBeenCalled();
	});
});
