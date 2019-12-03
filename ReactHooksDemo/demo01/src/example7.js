import React, { useState, useEffect, useCallback } from 'react';

function useWinSize() {
    const [size, setSize] = useState({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
    })

    const onResize = useCallback(() => {
        setSize({
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
        })
    }, [])

    useEffect(() => {
        window.addEventListener('resize', onResize)
        return () => {
            window.addEventListener('resize', onResize)
        }
    }, [onResize])

    return size;
}

function Example7() {
    const size = useWinSize();
    return (
        <div>页面size:{size.width}X{size.height}</div>
    )
}

export default Example7;