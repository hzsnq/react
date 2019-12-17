import React from 'react';

import { Route, Link } from 'react-router-dom';

import Flutter from "./video/flutter";
import Vue from "./video/vue";
import ReactPage from "./video/react";

function Video() {
    return (
        <div>
            <div className="topNav">
                <ul>
                    <li><Link to="/video/react/">React教程</Link></li>
                    <li><Link to="/video/vue/">Vue教程</Link></li>
                    <li><Link to="/video/flutter/">Flutter教程</Link></li>
                </ul>
            </div>
            <div className="videoContent">
                <div><h3>视频教程</h3></div>
                <Route path="/video/react/" component={ReactPage} />
                <Route path="/video/vue/" component={Vue} />
                <Route path="/video/" exact component={ReactPage} />
                <Route path="/video/flutter/" component={Flutter} />
            </div>
        </div>
    )
}

export default Video;