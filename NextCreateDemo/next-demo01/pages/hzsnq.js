import React, { useState } from 'react';

function Hzsnq() {
    const [color, setColor] = useState('blue')

    const changeColor = () => {
        setColor(color == 'blue' ? 'red' : 'blue')
    }

    return (
        <>
            <div className='div'>hzsnq</div>
            <div><button onClick={changeColor}>改变颜色</button></div>
            <style jsx>
                {`
                    .div{color:${color};}
                `}
            </style>
        </>
    )
}

export default Hzsnq;