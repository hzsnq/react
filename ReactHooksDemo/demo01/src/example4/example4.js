import React from 'react';

import ShowArea from "./showArea";

import Button from "./button";

import { Color } from './color';

function example4() {
    return (
        <div>
            <Color>
                <ShowArea></ShowArea>
                <Button></Button>
            </Color>
        </div>
    )
}

export default example4;