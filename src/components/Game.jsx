import React, { useEffect, useState } from 'react'


function Game() {

    const [dice, setDice] = useState([]);
    const [gameStarted, setGameStarted] = useState(false);
    const [isOver, setIsOver] = useState(false);
    const [numberOfRolls, setNumberOfRolls] = useState(0);
    const [timer, setTimer] = useState(0);
    const [gameTime, setGameTime] = useState({hours:0,minutes:0,seconds:0});



    function initializeDice(){
        const numbers = [];
        for(var i=0; i<10; i++){
            numbers.push({
                id : i,
                value: Math.ceil(Math.random() * 6),
                isFrozen : false
            })
        }
        setIsOver(false);
        setDice(numbers);
    }
    
    function handleDiceClick(item) {
        if(!gameStarted) setGameStarted(true);
        setDice(prevDice => 
            prevDice.map(element => { 
                return element.id === item.id ? {...element, isFrozen :!element.isFrozen} : element
            }));     
    }

    function handleRoll() {
        setNumberOfRolls(prevNumberOfRolls => {return prevNumberOfRolls + 1;})
        setDice(prevDice => 
            prevDice.map(element => { 
                return !element.isFrozen ? {...element, value: Math.ceil(Math.random() * 6)} : element
            }));
    }

    function checkIsOver(){
        if(dice[0]){
            var first = dice[0].value;
            setIsOver(dice.every(function(element) {
                return element.value === first && element.isFrozen;
            }));            
        } else setIsOver(false);
    }

    function createDots(value){
        let diceDots = [];
        for(var i=0;i<value;i++){
            diceDots.push(<div className={`game--dice-dot dot${i+1}`} key={i+1}></div>)
        }
        return diceDots;
    }
    
    useEffect(()=>{
        initializeDice();
    },[])

    useEffect(() => {
        checkIsOver();
    }, [dice])

    useEffect(() => {
        if(isOver) setTimer(0); setGameTime({hours:0,minutes:0,seconds:0}); setGameStarted(false);
    }, [isOver])
    

    useEffect(() => {
        let interval;
        
        if(gameStarted){
            console.log("hello");
            interval = setInterval(() => { 
                setTimer(prevTimer => prevTimer + 1);
            }, 1000);            
        }
        
        return () => { clearInterval(interval) }
    }, [gameStarted])


    useEffect(()=>{
        let updHours = Math.floor(timer / 3600);
        let updMinutes = Math.floor((timer - gameTime.hours * 3600) / 60);
        let updSeconds = timer - (gameTime.hours * 3600 + gameTime.minutes * 60);
        if(updSeconds === 60) {updSeconds = 0, updMinutes + 1}
        setGameTime({hours:updHours, minutes:updMinutes, seconds: updSeconds});
    },[timer])
    

  return (
    <div className='game--game-wrapper'>
        <h3>Number of Rolls - {numberOfRolls}</h3>
        <h3>Game Time - <span>
            {` ${gameTime.hours < 10 ? '0' + gameTime.hours : gameTime.hours}
            : ${gameTime.minutes < 10 ? '0' + gameTime.minutes : gameTime.minutes}
            : ${gameTime.seconds < 10 ? '0' + gameTime.seconds : gameTime.seconds}`}
            </span>
        </h3>
        <div className="game--dice-wrapper">
            {
                dice?.map((item)=> 
                <button 
                    className={`game--dice-piece ${item.isFrozen ? "frozen" : "" } piece${item.value}`} 
                    key={item.id} 
                    onClick={() => {handleDiceClick(item)}}>
                    {createDots(item.value)}
                </button>)
            }
        </div>
        <button className='game--game-button' onClick={isOver ? initializeDice : handleRoll}>{isOver ? "Play Again!" : "Roll"}</button>
    </div>
  )
}

export default Game