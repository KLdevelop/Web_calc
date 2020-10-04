import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import './index.scss';

class Calc extends Component {
    state = {
        isSecond: false,
        first: 0,
        second: 0
    };

    numType = (num) => {
        const { first, second, isSecond } = this.state;
        console.log(first, num)
        isSecond ? this.setState({
            second : second === 0 && num !== 0 ? '' + num : second + num
        }) : this.setState({
            first : first === 0 && num !== 0 ? '' + num : first + num
        });
    };

    onCClick = () => {
        this.setState({
            first: 0,
            second: 0,
            isSecond: false
        });
    };

    onDotClick = () => {
        const { isSecond, first, second} = this.state;
        isSecond && !('' + second).includes('.') ? this.state({
            second: second + '.'
        }) : !('' + first).includes('.') && this.setState({
            first: first + '.'
        });
    };

    onPMClick = () => {
        const { first, second, isSecond } = this.state;
        if (isSecond && second !== 0) {
            this.setState({
                second: +second < 0 ? second.slice(1,) : '-' + second
            });
        }
        if (!isSecond && first !== 0) {
            this.setState({
                first: +first < 0 ? first.slice(1,) : '-' + first
            });
        }
    }

    onCEClick = () => {
        const { isSecond } = this.state;
        isSecond ? this.setState({
            second: 0
        }) : this.setState({
            first: 0
        });
    };

    onDClick = () => {
        const { first, second, isSecond } = this.state;
        if (isSecond && second !== 0) {
            this.setState({
                second: second[0] === '-' && second.length === 2 || second === '-0.' ? 0 : 
                    (second.length > 1 ? second.slice(0, second.length - 1) : 0)
            });
        }
        if (!isSecond && first !== 0) {
            this.setState({
                first: first[0] === '-' && first.length === 2 || first === '-0.' ? 0 : 
                    (first.length > 1 ? first.slice(0, first.length - 1) : 0)
            });
        }
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
                        <Button onClick={ this.onDClick }>D</Button>
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