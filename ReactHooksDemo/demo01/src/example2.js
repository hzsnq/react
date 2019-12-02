import React, { useState, createContext, useContext } from 'react';

const CountContent = createContext();

function Counter() {
    const count = useContext(CountContent)
    return (<h1>{count}</h1>)
}

function Example() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>You Click {count} times</p>
            <button onClick={() => { setCount(count + 1) }}>Click me</button>
            <CountContent.Provider value={count}>
                <Counter />
            </CountContent.Provider>
        </div>
    );
}

export default Example;