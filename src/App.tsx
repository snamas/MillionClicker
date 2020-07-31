import React, {useCallback, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {Simulate} from "react-dom/test-utils";

const App: React.FC<{ color: string,positionX:number,positionY:number ,val:number}> = (props) => {
    const [position, setPos] = useState({x:props.positionX,y:props.positionY,rotate:0,zIndex:0});
    const appCSS = {
        fontsize: 24,
        borderRadius:5,
        transform: `translate3d(${position.x}px, ${position.y}px,0) rotate(${position.rotate}deg)`,
        width:300,
        zIndex:position.zIndex,
        border:'solid 2px',
        borderColor:props.color,
        position:'relative',
        transitionDuration:"2s",
        transitionTimingFunction:"ease-out",
        backdropFilter:"blur(2px)",
        backgroundColor:"rgba(0,0,0,0)"
    } as React.CSSProperties;
    const click = useCallback((e)=>{
        let X = 100;
        let Y = 100;
        let elm = document.elementFromPoint(X, Y);
        let clickX = e.pageX ;
        let clickY = e.pageY ;
        // 要素の位置を取得
        let clientRect = e.target.getBoundingClientRect() ;
        let positionX = clientRect.left + window.pageXOffset ;
        let positionY = clientRect.top + window.pageYOffset ;

        // 要素内におけるクリック位置を計算
        let elementX:number = clickX - positionX ;
        let elementY:number = clickY - positionY ;

        let center = {
            x:e.target.offsetWidth/2,
            y:e.target.offsetHeight/2
        }
        console.log(e.target.offsetWidth);
        let newPos = {
            x : (center.x-elementX)*5,
            y : (center.y-elementY)*5,
            rotate:(center.y-elementY)*10,
            zIndex:position.zIndex+1
        }
        setPos(newPos);
    },[position]);

    return (
            <button onClick={click} style={appCSS}>
                <p>
                    reactを触った{props.val}日目！
                </p>
            </button>
    );
}

export default App;
