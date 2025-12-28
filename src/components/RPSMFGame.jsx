import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GESTURES = {
  ROCK: 'rock',
  PAPER: 'paper',
  SCISSORS: 'scissors',
  MIDDLE_FINGER: 'middleFinger'
};

const GESTURE_DISPLAY = {
  rock: { name: 'Rock', emoji: '🪨' },
  paper: { name: 'Paper', emoji: '📄' },
  scissors: { name: 'Scissors', emoji: '✂️' },
  middleFinger: { name: 'Middle Finger', emoji: '🖕' }
};

const RPSMFGame = ({ isExpanding = false, showRules = false }) => {
  const [playerScore, setPlayerScore] = useState(0);
  const [botScore, setBotScore] = useState(0);
  const [targetWins, setTargetWins] = useState(2);
  const [playerMiddleFingerAvailable, setPlayerMiddleFingerAvailable] = useState(true);
  const [botMiddleFingerAvailable, setBotMiddleFingerAvailable] = useState(true);
  const [lastPlayerMove, setLastPlayerMove] = useState(null);
  const [lastBotMove, setLastBotMove] = useState(null);
  const [roundResult, setRoundResult] = useState(null);
  const [specialEvent, setSpecialEvent] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [showScoreboard, setShowScoreboard] = useState(false);

  useEffect(() => {
    if (isExpanding) {
      setShowScoreboard(true);
    } else {
      const timer = setTimeout(() => setShowScoreboard(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [isExpanding]);

  useEffect(() => {
    if (playerScore >= targetWins) {
      setGameOver(true);
      setWinner('player');
    } else if (botScore >= targetWins) {
      setGameOver(true);
      setWinner('bot');
    }
  }, [playerScore, botScore, targetWins]);

  const determineWinner = (playerMove, botMove) => {
    // Middle finger vs middle finger - reset scores
    if (playerMove === GESTURES.MIDDLE_FINGER && botMove === GESTURES.MIDDLE_FINGER) {
      return { outcome: 'draw', event: 'reset' };
    }

    // Middle finger vs paper - instant win
    if (playerMove === GESTURES.MIDDLE_FINGER && botMove === GESTURES.PAPER) {
      return { outcome: 'player', event: 'instantWin' };
    }
    if (botMove === GESTURES.MIDDLE_FINGER && playerMove === GESTURES.PAPER) {
      return { outcome: 'bot', event: 'instantWin' };
    }

    // Middle finger vs scissors - scissors cuts finger (disable)
    if (playerMove === GESTURES.MIDDLE_FINGER && botMove === GESTURES.SCISSORS) {
      return { outcome: 'bot', event: 'fingerCut-player' };
    }
    if (botMove === GESTURES.MIDDLE_FINGER && playerMove === GESTURES.SCISSORS) {
      return { outcome: 'player', event: 'fingerCut-bot' };
    }

    // Middle finger vs rock - rock wins
    if (playerMove === GESTURES.MIDDLE_FINGER && botMove === GESTURES.ROCK) {
      return { outcome: 'bot', event: null };
    }
    if (botMove === GESTURES.MIDDLE_FINGER && playerMove === GESTURES.ROCK) {
      return { outcome: 'player', event: null };
    }

    // Classic RPS
    if (playerMove === botMove) return { outcome: 'draw', event: null };

    const wins = {
      [GESTURES.ROCK]: GESTURES.SCISSORS,
      [GESTURES.PAPER]: GESTURES.ROCK,
      [GESTURES.SCISSORS]: GESTURES.PAPER
    };

    return {
      outcome: wins[playerMove] === botMove ? 'player' : 'bot',
      event: null
    };
  };

  const playRound = (playerMove) => {
    if (gameOver) return;

    // Get available bot moves
    const availableMoves = [GESTURES.ROCK, GESTURES.PAPER, GESTURES.SCISSORS];
    if (botMiddleFingerAvailable) {
      availableMoves.push(GESTURES.MIDDLE_FINGER);
    }

    const botMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];

    setLastPlayerMove(playerMove);
    setLastBotMove(botMove);

    const { outcome, event } = determineWinner(playerMove, botMove);

    // Handle events
    if (event === 'reset') {
      setPlayerScore(0);
      setBotScore(0);
      setTargetWins(prev => prev + 1);
      setSpecialEvent('🔄 Double Middle Finger! Score reset and target increased!');
      setRoundResult('draw');
    } else if (event === 'instantWin') {
      if (outcome === 'player') {
        setPlayerScore(targetWins);
        setSpecialEvent('💥 Instant Set Win! Middle Finger crushes Paper!');
      } else {
        setBotScore(targetWins);
        setSpecialEvent('💥 Bot wins instantly! Middle Finger crushes Paper!');
      }
      setRoundResult(outcome);
    } else if (event && event.startsWith('fingerCut')) {
      const cutPlayer = event.split('-')[1];
      if (cutPlayer === 'player') {
        setPlayerMiddleFingerAvailable(false);
        setSpecialEvent('✂️ Your Middle Finger was cut off! No longer available.');
      } else {
        setBotMiddleFingerAvailable(false);
        setSpecialEvent('✂️ Bot\'s Middle Finger was cut off!');
      }
      if (outcome === 'player') {
        setPlayerScore(prev => prev + 1);
      } else {
        setBotScore(prev => prev + 1);
      }
      setRoundResult(outcome);
    } else {
      // Regular outcome
      if (outcome === 'player') {
        setPlayerScore(prev => prev + 1);
      } else if (outcome === 'bot') {
        setBotScore(prev => prev + 1);
      }
      setRoundResult(outcome);
      setSpecialEvent(null);
    }

    // Clear messages after delay
    setTimeout(() => {
      setSpecialEvent(null);
    }, 5000);
  };

  const resetGame = () => {
    setPlayerScore(0);
    setBotScore(0);
    setTargetWins(2);
    setPlayerMiddleFingerAvailable(true);
    setBotMiddleFingerAvailable(true);
    setLastPlayerMove(null);
    setLastBotMove(null);
    setRoundResult(null);
    setSpecialEvent(null);
    setGameOver(false);
    setWinner(null);
  };

  return (
    <div className="w-full h-full relative flex flex-col">
      {/* Rules Modal Overlay */}
      <AnimatePresence>
        {showRules && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-white dark:bg-zinc-900 z-50 rounded-xl flex items-center justify-center p-8"
          >
            <div className="max-w-2xl">
              <h3 className="text-2xl font-bold mb-4 text-center">Game Rules</h3>
              <ul className="space-y-3 text-base">
                <li><strong>Classic RPS:</strong> Rock beats Scissors, Scissors beats Paper, Paper beats Rock</li>
                <li><strong>Middle Finger Power:</strong> Instantly wins the set if thrown against Paper</li>
                <li><strong>Middle Finger Weakness:</strong> Loses to Rock and Scissors</li>
                <li><strong>Scissors Cuts Finger:</strong> If Middle Finger loses to Scissors, that finger is cut off for the rest of the set</li>
                <li><strong>Double Middle Finger:</strong> Both throw Middle Finger? Score resets and target wins increases by 1!</li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notifications - Top overlay */}
      <AnimatePresence>
        {specialEvent && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-2 left-2 right-2 z-40 p-3 bg-yellow-100 dark:bg-yellow-900/90 border border-yellow-300 dark:border-yellow-700 rounded-lg shadow-lg"
          >
            <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-200 text-center">
              {specialEvent}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Score and Last Round Combined */}
      <AnimatePresence>
        {showScoreboard && (
          <motion.div
            key="scoreboard"
            initial={{ height: 0, opacity: 0, paddingTop: 0, paddingBottom: 0 }}
            animate={{ 
              height: 100, 
              opacity: 1, 
              paddingTop: 16, 
              paddingBottom: 16,
              transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
            }}
            exit={{ 
              height: 0, 
              opacity: 0, 
              paddingTop: 0, 
              paddingBottom: 0,
              transition: { duration: 2.5, ease: [0.4, 0, 0.2, 1] }
            }}
            className="flex items-center justify-between bg-white dark:bg-zinc-800 overflow-hidden px-4"
          >
        {/* Player Choice - Left */}
        <div className="flex-1 flex justify-center">
          {lastPlayerMove && (
            <div className="text-center">
              <div className="text-4xl">{GESTURE_DISPLAY[lastPlayerMove].emoji}</div>
            </div>
          )}
        </div>

        {/* Score Counter - Center */}
        <div className="flex items-center gap-3">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-orange-600">{playerScore}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">You</div>
            {!playerMiddleFingerAvailable && (
              <div className="text-xs text-red-500">🚫</div>
            )}
          </div>
          <div className="text-center">
            <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              First to {targetWins}
            </div>
            {roundResult && lastPlayerMove && lastBotMove && (
              <div className="text-center">
                <div className={`text-xs font-semibold ${
                  roundResult === 'draw' ? 'text-gray-500' :
                  roundResult === 'player' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {roundResult === 'draw' ? 'Draw' :
                   roundResult === 'player' ? 'You Win' : 'Bot Wins'}
                </div>
                <button
                  onClick={resetGame}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 text-xs underline mt-1"
                >
                  Reset
                </button>
              </div>
            )}
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{botScore}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Bot</div>
            {!botMiddleFingerAvailable && (
              <div className="text-xs text-red-500">🚫</div>
            )}
          </div>
        </div>

        {/* Bot Choice - Right */}
        <div className="flex-1 flex justify-center">
          {lastBotMove && (
            <div className="text-center">
              <div className="text-4xl">{GESTURE_DISPLAY[lastBotMove].emoji}</div>
            </div>
          )}
        </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Game Over */}
      <AnimatePresence>
        {gameOver && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-green-500 to-blue-600 dark:from-orange-500 dark:to-blue-600 p-6"
          >
            <div className="text-6xl mb-4">
              {winner === 'player' ? '🎉' : '🤖'}
            </div>
            <h3 className="text-3xl font-bold text-white mb-6">
              {winner === 'player' ? 'You Win!' : 'Bot Wins!'}
            </h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetGame}
              className="bg-white text-green-600 dark:text-orange-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg"
            >
              Play Again
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Move Buttons */}
      {!gameOver && (
        <div className="grid grid-cols-2 gap-0 flex-1">
          {Object.entries(GESTURE_DISPLAY).map(([key, { name, emoji }], index) => {
            const isDisabled = key === 'middleFinger' && !playerMiddleFingerAvailable;
            const colorMap = {
              rock: 'bg-yellow-500 hover:bg-yellow-600',
              paper: 'bg-blue-600 hover:bg-blue-700',
              scissors: 'bg-green-600 hover:bg-green-700',
              middleFinger: 'bg-red-600 hover:bg-red-700'
            };
            return (
              <button
                key={key}
                onClick={() => !isDisabled && playRound(key)}
                disabled={isDisabled}
                className={`h-full flex flex-col items-center justify-center font-semibold text-sm transition-all ${
                  isDisabled
                    ? 'bg-gray-200 dark:bg-zinc-700 text-gray-400 cursor-not-allowed opacity-50'
                    : `${colorMap[key]} text-white`
                }`}
              >
                <div className="text-8xl">{emoji}</div>
              </button>
            );
          })}
        </div>
      )}

    </div>
  );
};

export default RPSMFGame;
