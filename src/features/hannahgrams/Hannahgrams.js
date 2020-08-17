import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  newgame,
  rescramble,
  typeletter,
  submit,
  nextround,
  tic,
  deleteletter,
  selectTimer,
  selectAnswer,
  selectScore,
  selectRoundscore,
  selectScrambled,
  selectRound,
  selectMinscore,
} from './hannahgramsSlice';
import styles from './Hannahgrams.module.css';
import { getWordlist } from "./data";

export function Hannahgrams() {
	//const count = useSelector(selectCount);
	const dispatch = useDispatch();
	//const [incrementAmount, setIncrementAmount] = useState('2');
	const score = useSelector(selectScore);
	const round = useSelector(selectRound);
	const timer = useSelector(selectTimer);
	const scrambled = useSelector(selectScrambled);
	const answer = useSelector(selectAnswer);
	const roundscore = useSelector(selectRoundscore);
	const minscore = useSelector(selectMinscore);
	
	getWordlist();
	
	useEffect(() => {
		var x = setInterval(() => {
			dispatch(tic());
		}, 1000);
		return () => {
			clearInterval(x);
		};
	});
	

	const scrambledJSX = [];
	for (let i = 0; i < scrambled.length; i++) {
		const scrambledLetter = scrambled[i];
		scrambledJSX.push(
			<div key={i} className={styles.scrambledletter}>{scrambledLetter}</div>
		);
	}
	const answerlist = [];
	for (let i = 0; i < answer.length; i++) {
		answerlist.push(
			<div key={i} className={styles.answer}>{answer[i]}</div>
		);
	}

	const handleKeyPress = function(e) {
		console.log(e.keyCode);
		if (e.keyCode === 32) {
			dispatch(rescramble());
		} else if (e.keyCode >= 65 && e.keyCode <= 90) {
			dispatch(typeletter({
				key: e.key
			}));
		} else if (e.keyCode === 8) {
			dispatch(deleteletter());
		} else if (e.keyCode === 13) {
			dispatch(submit());
		}
	};

	var buttonJSX = [];
	if (timer === 0 && roundscore >= minscore){
		buttonJSX = <div id={styles.newgame} onClick={() => dispatch(nextround())}>NEXT ROUND</div>
	} else {
		buttonJSX = <div id={styles.newgame} onClick={() => dispatch(newgame())}>NEW GAME</div>
	}

	useEffect(() => {
		document.addEventListener("keydown", handleKeyPress, false);
		return () => { document.removeEventListener("keydown", handleKeyPress, false)};
	});

	return (
		<div>
			<div id={styles.title}>HANNAHGRAMS</div>
			<div id={styles.instructions}>
				<div className={styles.instruction}>Using the six letters given to you, create as many words that you can from them.</div>
				<div className={styles.instruction}>Based on the length of the word made, a certain amount of points is given.</div>
				<div className={styles.instruction}>A certain amount of points is needed to move on to the next round.</div>
				<div className={styles.instruction}>As the rounds progress, the amount of points needed to progress further increases.</div>
				<div className={styles.instruction}>Have fun!</div>
			</div>
			{buttonJSX}
			<div id={styles.scrambledletters}>
				{scrambledJSX}
			</div>
			<div id={styles.wordanswer}>
				{answerlist}
			</div>
			<div id={styles.roundscore}>ROUND SCORE: {roundscore}</div>
			<div id={styles.score}>SCORE: {score}</div>
			<div id={styles.round}>ROUND: {round}</div>
			<div id={styles.timer}>TIMER: {timer}</div>
		</div>
	);
}
