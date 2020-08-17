import { createSlice } from '@reduxjs/toolkit';
import { getWordlist } from "./data"

const scramble = function (str) {
	var answer = str.split(""),
		n = answer.length;
	for(var i = n - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var holder = answer[i];
		answer[i] = answer[j];
		answer[j] = holder;
	}
	return answer.join("");
};
const removeletter = function (str, index) {
	return str.slice(0, index) + str.slice(index + 1, str.length);
};


const getRandomWord = function () {
	const wordList = getWordlist().filter(function (word) {
		if (word.length === 6) {
			return true;
		} else {
			return false;
		}
	});
	const index = Math.floor(Math.random()*wordList.length);
	return wordList[index];
};

export const hannahgramsSlice = createSlice({
  name: 'hannahgrams',
  initialState: {
	score: 0,
	round: 0,
	answer: "",
	scrambled: "",
	timer: 30,
	usedwords: [],
	roundscore: 0,
	minscore: 5000,
  },
  reducers: {
    rescramble: (state, action) => {
		//scramble the letters
		state.scrambled = scramble(state.scrambled);
	},
	typeletter: (state, action) => {
		//add letter to typed answer
		if (state.scrambled.indexOf(action.payload.key)>= 0 && state.timer > 0){
			state.scrambled = removeletter(state.scrambled, state.scrambled.indexOf(action.payload.key));
			state.answer = state.answer + action.payload.key;
		}
	},
    submit: (state, action) => {
		//submit ur answer
		if (state.timer > 0) {
			state.scrambled = state.scrambled + state.answer;
			let wordentered = state.answer;
			state.answer = "";
			let f = (str) => {
				if (str === wordentered) {
					return true;
				} else {
					return false;
				}
			};
			if (typeof getWordlist().find(f) !== "undefined" && !state.usedwords.includes(wordentered)) {
				if (wordentered.length === 3) {
					state.score = state.score + 250;
					state.roundscore = state.roundscore + 250;
				} else if (wordentered.length === 4) {
					state.score = state.score + 500;
					state.roundscore = state.roundscore + 500;
				} else if (wordentered.length === 5) {
					state.score = state.score + 1000;
					state.roundscore = state.roundscore + 1000;
				} else if (wordentered.length === 6) {
					state.score = state.score + 2000;
					state.roundscore = state.roundscore + 2000;
				}
				state.usedwords = state.usedwords.concat(wordentered);
			}
		}
    },
    nextround: (state, action) => {
		//advance to next round
		state.round = state.round + 1;
		state.scrambled = scramble(getRandomWord());
		state.timer = 30;
		state.answer = "";
		state.roundscore = 0;
		state.minscore = state.minscore + 500;
	},
	newgame: (state, action) => {
		state.score = 0;
		state.round = 1;
		state.answer = "";
		state.scrambled = scramble(getRandomWord());
		state.timer = 30;
		state.roundscore = 0;
		state.minscore = 5000;
	},
	tic: (state, action) => {
		//count down
		if (state.round > 0 && state.timer > 0){
			state.timer = state.timer - 1;
		}
	},
	deleteletter: (state, action) => {
		//deletes letters that you type
		state.scrambled = state.scrambled + state.answer.charAt(state.answer.length-1)
		state.answer = state.answer.slice(0, state.answer.length - 1);
	}
  },
});

export const { rescramble, typeletter, submit, nextround, newgame, deleteletter, tic} = hannahgramsSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
/*export const incrementAsync = amount => dispatch => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};*/

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectScore = state => state.hannahgrams.score;
export const selectTimer = state => state.hannahgrams.timer;
export const selectAnswer = state => state.hannahgrams.answer;
export const selectScrambled = state => state.hannahgrams.scrambled;
export const selectRound = state => state.hannahgrams.round;
export const selectRoundscore = state => state.hannahgrams.roundscore;
export const selectMinscore = state => state.hannahgrams.minscore;

export default hannahgramsSlice.reducer;
