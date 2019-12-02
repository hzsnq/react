import React from 'react';

import { Route, Link } from 'react-router-dom';

import GetUp from "./workPlace/getUp";
import Money from "./workPlace/money";

function Video() {
    return (
        <div>
            <div className="topNav">
                <ul>
                    <li><Link to="/workPlace/money/">程序员加薪秘籍</Link></li>
                    <li><Link to="/workPlace/getUp/">程序员早起攻略</Link></li>
                </ul>
            </div>
            <div className="videoContent">
                <div><h3>职场软技能</h3></div>
                <Route path="/workPlace/money/" component={Money} />
                <Route path="/workPlace/" exact component={Money} />
                <Route path="/workPlace/getUp/" component={GetUp} />
            </div>
        </div>
    )
}

export default Video;