'use strict'

import PollsrCore from '../pollsr-core'
import PollsrTemplate from '../pollsr-template'
import datas from '../../../examples/datas.json'

let pollsrCore
const firstPollsr = datas.pollsr[0]

const getOptions = () => {
	return {
		element: document.querySelector('#pollsr-1'),
		hasVoted: false,
		datas: firstPollsr,
		onAction: answerId => {}
	}
}

const getInstance = () => {
	return new PollsrCore(getOptions())
}

beforeEach(() => {
	document.body.innerHTML = '<div id="pollsr-1"></div>'
	pollsrCore = getInstance()
})

describe('PollsrCore function', () => {
	it('Should initialize the constructor', () => {
		expect(pollsrCore.options).toMatchObject({
			element: expect.any(HTMLDivElement),
			datas: firstPollsr,
			hasVoted: false,
			template: null,
			onAction: expect.any(Function)
		})
	})

	it('Should initialize the constructor without options', () => {
		const instance = new PollsrCore()
		expect(instance.options).toMatchObject({
			element: null,
			template: null,
			datas: null,
			onAction: null,
			hasVoted: false
		})
	})

	it('Should create the pollsr', () => {
		pollsrCore.initTemplate = jest.fn()

		pollsrCore.create()

		expect(pollsrCore.initTemplate).toHaveBeenCalled()
	})

	it('Should create the pollsr without init method inside the template', () => {
		pollsrCore.initTemplate = jest.fn()

		pollsrCore.options.template = {}
		pollsrCore.options.template.init = null

		expect(() => {
			pollsrCore.create()
		}).toThrow(new Error('Pollsr::PollsrTemplate need an "init" function.'))
	})

	it('Should initialize the template', () => {
		pollsrCore.options.template = new PollsrTemplate()
		pollsrCore.options.template.init = jest.fn()

		pollsrCore.create()

		expect(pollsrCore.options.template.init).toHaveBeenCalled()
	})

	it('Should destroy the pollsrCore', () => {
		pollsrCore.options.template = new PollsrTemplate()
		pollsrCore.options.template.destroy = jest.fn()

		pollsrCore.create()
		pollsrCore.destroy()

		expect(pollsrCore.options.template.destroy).toHaveBeenCalled()
	})
})
