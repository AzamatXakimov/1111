module.exports = {
	getWinner: (hand1, hand2) => {
		const rulesTable = [
			['rock', 'scissors', 'paper', 'lizard', 'Spock'],
			['scissors', 'paper', 'lizard', 'Spock', 'rock'],
			['paper', 'lizard', 'Spock', 'rock', 'scissors'],
			['lizard', 'Spock', 'rock', 'scissors', 'paper'],
			['Spock', 'rock', 'scissors', 'paper', 'lizard'],
		];

		const index1 = rulesTable[0].indexOf(hand1);
		const index2 = rulesTable[0].indexOf(hand2);

		if (index1 === -1 || index2 === -1) {
			throw new Error(`Invalid hand: ${hand1} or ${hand2}`);
		}

		if (index1 === index2) {
			return 'Draw';
		} else if ((index1 + 1) % 5 === index2) {
			return 'You win!';
		} else {
			return 'Computer wins!';
		}
	},
};
