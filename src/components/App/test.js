import React from 'react';

const Testy = () => {
    const functionTest = () => {
        console.log('ta mere')
    }
    return (
        <button onClick={() => functionTest()}>click ta mere</button>
    )
};

export default Testy;