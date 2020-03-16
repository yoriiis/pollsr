import { PollsrCore } from '../../dist/pollsr.js';
import datas from '../datas.json';

const pollsrCore = new PollsrCore({
	element: document.querySelector('#pollsr-1'),
	datas: datas,
	onAction: answerId => {
		console.log('PollsrCore::onAction', `answerId=${answerId}`);
	}
});

// Create the Pollsr from the instance
pollsrCore.create();
