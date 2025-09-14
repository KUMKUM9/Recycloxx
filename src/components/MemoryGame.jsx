import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useGamePoints } from '../context/GamePointsContext';
import { toast } from 'react-toastify';

const GameContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin: 20px 0;
`;

const Card = styled.div`
  aspect-ratio: 1;
  background: ${props => props.isFlipped ? '#fff' : '#338a86'};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  cursor: pointer;
  transition: transform 0.3s;
  transform-style: preserve-3d;
  transform: ${props => props.isFlipped ? 'rotateY(180deg)' : 'none'};
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);

  &:hover {
    box-shadow: 0 6px 12px rgba(0,0,0,0.15);
  }
`;

const ScoreBoard = styled.div`
  text-align: center;
  margin: 20px 0;
  padding: 15px;
  background: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
`;

const Button = styled.button`
  background: #338a86;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin: 10px;

  &:hover {
    background: #2a726f;
  }
`;

// Recycling-themed emojis
const emojis = ['♻️', '🌱', '🌿', '🍃', '🌲', '🌳', '🌍', '🌎'];

const MAX_MOVES = 20;

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const { points, addPoints } = useGamePoints(); // Use context instead of local state

  // Initialize or reset game
  const initializeGame = () => {
    const shuffledCards = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false
      }));
    
    setCards(shuffledCards);
    setFlippedIndices([]);
    setMatchedPairs([]);
    setMoves(0);
    setGameOver(false);
    toast.info(`You have ${MAX_MOVES} moves to match all pairs! Good luck! 🍀`);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  // Handle card click
  const handleCardClick = (index) => {
    if (
      gameOver || // Don't allow clicks if game is over
      flippedIndices.length === 2 || // Don't allow more than 2 cards flipped
      flippedIndices.includes(index) || // Don't allow same card
      matchedPairs.includes(cards[index].emoji) // Don't allow matched cards
    ) {
      return;
    }

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    // If we have 2 cards flipped, check for match
    if (newFlippedIndices.length === 2) {
      const newMoves = moves + 1;
      setMoves(newMoves);
      const [firstIndex, secondIndex] = newFlippedIndices;
      
      if (cards[firstIndex].emoji === cards[secondIndex].emoji) {
        // Match found
        const newMatchedPairs = [...matchedPairs, cards[firstIndex].emoji];
        setMatchedPairs(newMatchedPairs);
        setFlippedIndices([]);
        
        // Check if game is complete
        if (newMatchedPairs.length === emojis.length) {
          const movesLeft = MAX_MOVES - newMoves;
          const earnedPoints = Math.max(200 - (newMoves * 8), 20) + (movesLeft * 5);
          addPoints(earnedPoints);
          setGameOver(true);
          toast.success(`🎉 Congratulations! You won with ${newMoves} moves! You earned ${earnedPoints} points!`);
        }
      } else {
        // No match - flip cards back after delay
        setTimeout(() => {
          setFlippedIndices([]);
        }, 1000);
      }

      // Check if max moves reached
      if (newMoves >= MAX_MOVES && !gameOver) {
        setGameOver(true);
        const matchedCount = matchedPairs.length;
        const earnedPoints = Math.max(matchedCount * 10, 5);
        addPoints(earnedPoints);
        toast.info(`Game Over! You matched ${matchedCount} pairs and earned ${earnedPoints} points!`);
      }
    }
  };

  return (
    <GameContainer>
      <h1>Recycling Memory Game</h1>
      <ScoreBoard>
        <h3>Score Board</h3>
        <p>Total Points: {points}</p>
        <p>Moves: {moves} / {MAX_MOVES}</p>
        <p style={{ color: moves > MAX_MOVES - 5 ? '#ff4444' : '#338a86' }}>
          Moves Remaining: {Math.max(MAX_MOVES - moves, 0)}
        </p>
        <p>Matches Found: {matchedPairs.length} of {emojis.length}</p>
      </ScoreBoard>
      <Grid>
        {cards.map((card, index) => (
          <Card
            key={card.id}
            isFlipped={flippedIndices.includes(index) || matchedPairs.includes(card.emoji)}
            onClick={() => handleCardClick(index)}
          >
            {(flippedIndices.includes(index) || matchedPairs.includes(card.emoji)) ? card.emoji : ''}
          </Card>
        ))}
      </Grid>
      <Button onClick={initializeGame}>New Game</Button>
    </GameContainer>
  );
};

export default MemoryGame;