import React, { useReducer } from 'react';

function Reducer() {
    const [count, dispatch] = useReducer((state, action) => {
        switch (action) {
            case 'add':
                return state + 1
            case 'sub':
                return state - 1
            default:
                return state
        }
    }, 0)

    return (
        <div>
            <h1>现在的分数是{count}</h1>
            <button onClick={() => dispatch('add')}>+</button>
            <button onClick={() => dispatch('sub')}>-</button>
        </div>
    )
}

export default Reducer;