import React, { useRef, useState, useEffect } from 'react';

function Example6() {
    const inputEL = useRef(null)

    const onButtonClick = () => {
        inputEL.current.value = "hello"
        console.log(inputEL)
    }

    const [text, setText] = useState('hzsnq')
    const textRef = useRef(null)

    useEffect(() => {
        textRef.current = text;
        console.log('textRef.current:', textRef.current)
    })

    return (
        <>
            <input type="text" ref={inputEL} />
            <button onClick={onButtonClick}>展示文字</button>
            <br></br>
            <br></br>
            <input value={text} onChange={(e) => { setText(e.target.value) }}></input>
        </>
    )
}

export default Example6;