import { PollsrCore, PollsrTemplate } from '../../dist/pollsr.js'
import datas from '../datas.json'

class CustomTemplate extends PollsrTemplate {
	updateTemplateAfterVote () {
		super.updateTemplateAfterVote()
		console.log('updateTemplateAfterVote')
	}
}

const firstPollsr = datas.pollsr[0]
const pollsrCore = new PollsrCore({
	element: document.querySelector('#pollsr-1'),
	template: new CustomTemplate(),
	datas: firstPollsr,
	onAction: answerId => {
		console.log('Voted', answerId)
	}
})

// Create the Pollsr from the instance
pollsrCore.create()
