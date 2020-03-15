import { PollsrCore } from '../../dist/index.js'
import datas from '../datas.json'

const firstPollsr = datas.pollsr[0]
const pollsrCore = new PollsrCore({
	element: document.querySelector('#pollsr-1'),
	datas: firstPollsr,
	onAction: () => {
		console.log('Voted')
	}
})

// Create the Pollsr from the instance
pollsrCore.create()
