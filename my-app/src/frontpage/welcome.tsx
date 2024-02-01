import React, { useLayoutEffect, useState } from 'react';

import Sidebar from '../sidebar/sidebar'



function Welcome() {


    return (
        <div className="App">

            <h1 className="text-9xl font-bold text-center">
                Dome
            </h1>
            <ul>
                <li>
                    <a href="/products">Hello there</a>
                </li>
            </ul>
        </div>
    );
}

export default Welcome;
