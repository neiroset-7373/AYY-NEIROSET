import React, { useState } from 'react';

const CalcApp: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const clear = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (prevValue === null) {
      setPrevValue(inputValue);
    } else if (operator) {
      const currentValue = prevValue || 0;
      let newValue = currentValue;

      if (operator === '+') newValue = currentValue + inputValue;
      else if (operator === '-') newValue = currentValue - inputValue;
      else if (operator === '×') newValue = currentValue * inputValue;
      else if (operator === '÷') newValue = currentValue / inputValue;

      setPrevValue(newValue);
      setDisplay(String(newValue));
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const btnClass = "w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold transition-all active:scale-90 shadow-sm";
  const numBtn = `${btnClass} bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white`;
  const opBtn = `${btnClass} bg-orange-500 text-white`;
  const fnBtn = `${btnClass} bg-zinc-400 dark:bg-zinc-600 text-black dark:text-white`;

  return (
    <div className="flex flex-col h-full bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white p-6">
      <div className="flex-1 flex flex-col justify-end items-end p-4 mb-8">
        <div className="text-zinc-500 text-sm mb-2 uppercase tracking-widest font-black opacity-50">Standard Calculator</div>
        <div className="text-6xl font-light tracking-tighter truncate w-full text-right">{display}</div>
      </div>
      
      <div className="grid grid-cols-4 gap-4 mb-12">
        <button onClick={clear} className={fnBtn}>AC</button>
        <button onClick={() => setDisplay(String(-parseFloat(display)))} className={fnBtn}>+/-</button>
        <button onClick={() => setDisplay(String(parseFloat(display) / 100))} className={fnBtn}>%</button>
        <button onClick={() => performOperation('÷')} className={opBtn}>÷</button>

        {[7, 8, 9].map(n => <button key={n} onClick={() => inputDigit(String(n))} className={numBtn}>{n}</button>)}
        <button onClick={() => performOperation('×')} className={opBtn}>×</button>

        {[4, 5, 6].map(n => <button key={n} onClick={() => inputDigit(String(n))} className={numBtn}>{n}</button>)}
        <button onClick={() => performOperation('-')} className={opBtn}>-</button>

        {[1, 2, 3].map(n => <button key={n} onClick={() => inputDigit(String(n))} className={numBtn}>{n}</button>)}
        <button onClick={() => performOperation('+')} className={opBtn}>+</button>

        <button onClick={() => inputDigit('0')} className={`${numBtn} col-span-2 w-full px-8 justify-start`}>0</button>
        <button onClick={() => !display.includes('.') && setDisplay(display + '.')} className={numBtn}>.</button>
        <button onClick={() => performOperation('=')} className={opBtn}>=</button>
      </div>
    </div>
  );
};

export default CalcApp;
