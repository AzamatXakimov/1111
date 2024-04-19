const readline = require('readline');
const crypto = require('crypto');
const rules = require('./rules');

function generateKey() {
	const key = crypto.randomBytes(32);
	return key.toString('hex');
}

function generateHmac(key, message) {
	const hmac = crypto.createHmac('sha256', key);
	hmac.update(message);
	return hmac.digest('hex');
}

function playGame(hands) {
	const key = generateKey();
	const hmac = generateHmac(key, hands.join(' '));
	console.log(`HMAC: ${hmac}`);

	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});
	console.log('Available moves:\n 1 - rock \n 2 - Spock \n 3 - paper \n 4 - lizard \n 5 - scissors \n 0 - exit \n ? - help');
	rl.question('Enter your move:', (answer) => {
		const move = parseInt(answer);
		if (isNaN(move) || move < 0 || move > hands.length) {
			console.log('Invalid move. Please try again.');
			rl.close();
			playGame(hands);
			return;
		}

		const computerMove = Math.floor(Math.random() * hands.length) + 1;
		const result = rules.getWinner(
			hands[move - 1],
			hands[computerMove - 1],
		);

		console.log(`Your move: ${hands[move - 1]}`);
		console.log(`Computer move: ${hands[computerMove - 1]}`);
		console.log(`Result: ${result}`);

		rl.close();
	});
}

function main() {
	const args = process.argv.slice(2);
	if (args.length < 3 || args.length % 2 !== 1) {
		console.error('Usage: node game.js hand1 hand2 ... handN');
		process.exit(1);
	}

	const hands = args.map((hand) => hand.trim());
	playGame(hands);
}

main();
