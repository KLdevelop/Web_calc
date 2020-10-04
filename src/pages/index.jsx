import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import './index.scss';

class Calc extends Component {
    state = {
        isDot: false,
        dotDCount: 0,
        isSecond: false,
        first: 0,
        second: 0
    };

    numType = (num) => {
        const { first, second, isSecond, isDot, dotDCount } = this.state;
        console.log(first, num, dotDCount)
        isSecond ? this.setState({
            second : isDot ? second + num : second * 10 + num
        }) : this.setState({
            first : isDot ? first + num : first * 10 + num
        });
        if (isDot) {
            this.setState({
                dotDCount: dotDCount + 1
            });
        }
    };

    onCClick = () => {
        this.setState({
            first: 0,
            second: 0,
            dotDCount: 0,
            isDot: false,
            isSecond: false
        });
    };

    onDotClick = () => {
        const { isSecond, first, second, dotDCount } = this.state;
        isSecond ? this.state({
            second: second + '.',
            isDot: true
        }) : this.setState({
            first: first + '.',
            isDot: true
        });
    };

    onPMClick = () => {
        const { first, second, isSecond, isDot } = this.state;
        isSecond ? this.setState({
            second: isDot ? (+second < 0 ? second.slice(1,) : '-' + second) : -second
        }) : this.setState({
            first: isDot ? (+first < 0 ? first.slice(1,) : '-' + first)  : -first
        });
    }

    onCEClick = () => {
        const { isSecond } = this.state;
        this.setState({
            isDot: false,
            dotDCount: 0
        });
        isSecond ? this.setState({
            second: 0
        }) : this.setState({
            first: 0
        });
    };

    render() {
        const { isSecond, first, second } = this.state;
        return (
            <div className="calc">
                <div className="top">
                    {
                        isSecond && <div>
                            <h1 className="tFrst">{ first }</h1>
                            <h1 className="bScnd">{ second }</h1>
                        </div> ||
                        <h1 className="first">{ first }</h1>
                    }
                </div>
                <div className="bttns">
                    <div className="leftBlock">
                        <Button onClick={ this.onCEClick }>CE</Button>
                        <Button onClick={ this.onCClick }>C</Button>
                        <Button>D</Button>
                        {
                            [7, 8, 9, 4, 5, 6, 1, 2, 3].map(el => (
                                <Button className="num" onClick={ () => this.numType(el) }>{ el }</Button>
                            ))
                        }
                        <Button onClick={ this.onPMClick }>+-</Button>
                        <Button className="num" onClick={ () => this.numType(0) }>0</Button>
                        <Button onClick={ this.onDotClick }>.</Button>
                    </div>
                    <div className="rightBlock">
                        <Button>/</Button>
                        <Button>*</Button>
                        <Button>-</Button>
                        <Button>+</Button>
                        <Button>=</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Calc;