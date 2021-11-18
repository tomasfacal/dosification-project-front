import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
  selectCount,
  setId2 // Action del reducer para setear el id
} from './counterSlice';
import styles from './Counter.module.css';

export function Counter(props: any) {
  const { name } = props
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');
  const [id, setId] = useState(''); //setId setea el id en el estado del componente 


  const incrementValue = Number(incrementAmount) || 0;
  const type_id = String(id) || "";

  return (
    <div>
      Soy el componente de {name}
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() => dispatch(incrementByAmount(incrementValue))}
        >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
          onClick={() => dispatch(incrementAsync(incrementValue))}
        >
          Add Async
        </button>
        <button
          className={styles.button}
          onClick={() => dispatch(incrementIfOdd(incrementValue))}
        >
          Add If Odd
        </button>
        <input
          className={styles.textbox}
          aria-label="Set CI"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() => dispatch(setId2(id))}
        >
          
        </button>
      </div>
    </div>
  );
}
