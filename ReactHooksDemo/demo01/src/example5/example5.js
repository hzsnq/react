import React, { useState, useMemo } from 'react';

function Example5() {
    const [bob, setBob] = useState('bob的状态')
    const [andy, setAndy] = useState('andy的状态')

    return (
        <>
            <button onClick={() => { setBob(new Date().getTime()) }}>Bob</button>
            <button onClick={() => { setAndy(new Date().getTime() + 'andy go') }}>andy</button>
            <ChildComponent name={bob}>{andy}</ChildComponent>
        </>
    )
}

function ChildComponent({ name, children }) {
    function changeBob(name) {
        console.log('bob go')
        return name + 'Bob go'
    }

    const actionBob = useMemo(() => changeBob(name), [name])
    return (
        <>
            <div>{actionBob}</div>
            <div>{children}</div>
        </>
    )
}

export default Example5;