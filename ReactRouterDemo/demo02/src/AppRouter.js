import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Index from "./pages/index";
import Video from "./pages/video";
import WorkPlace from "./pages/workPlace";
import "./index.css";

function AppRouter() {
    let routeConfig = [
        { path: '/', title: '博客首页', exact: true, component: Index },
        { path: '/video/', title: '视频教程', exact: false, component: Video },
        { path: '/workplace/', title: '职场技能', exact: false, component: WorkPlace }
    ]

    return (
        <Router>
            <div className="mainDiv">
                <div className="leftNav">
                    <h3>一级标题</h3>
                    <ul>
                        {
                            routeConfig.map((item, index) => {
                                return (
                                    <li key={index}><Link to={item.path}>{item.title}</Link></li>
                                );
                            })
                        }
                    </ul>
                </div>

                <div className="rightMain">
                    {
                        routeConfig.map((item, index) => {
                            return (
                                <Route key={index} path={item.path} exact={item.exact} component={item.component}></Route>
                            );
                        })
                    }
                </div>
            </div>
        </Router>
    )
}

export default AppRouter;