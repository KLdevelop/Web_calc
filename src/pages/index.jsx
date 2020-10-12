import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import './index.scss';

class Calc extends Component {
    state = {
        isSecond: false,
        firsts: 0,
        seconds: 0,
        res: 0,
        isRes: false,
        isEq: false
    };

    resToNum = (num) => {
        const { isEq } = this.state;
        isEq ? this.setState({
            isSecond: false,
            firsts: num,
            seconds: 0,
            isRes: false,
            isEq: false
        }) : this.setState({
            seconds: num,
            isRes: false
        });
    };

    numType = (num) => {
        const { firsts, seconds, isSecond, isRes } = this.state;
        if (isRes) {
            this.resToNum(num);
        }
        else {
            isSecond ? this.setState({
                seconds : seconds == 0 && num != 0 ? `${num}` : `${ seconds }` + num
            }) : this.setState({
                firsts : firsts == 0 && num != 0 ? `${num}`: `${ firsts }` + num
            });
        }
    };

    onCClick = () => {
        this.setState({
            firsts: 0,
            seconds: 0,
            isSecond: false,
            res: 0,
            isRes: false,
            isEq: false
        });
    };

    onDotClick = () => {
        const { isSecond, firsts, seconds} = this.state;
        isSecond && !('' + seconds).includes('.') ? this.setState({
            seconds: seconds + '.'
        }) : !('' + firsts).includes('.') && this.setState({
            firsts: firsts + '.'
        });
    };

    onPMClick = () => {
        const { firsts, seconds, isSecond, isEq } = this.state;
        if (isEq) {
            this.onCClick();
            this.setState({
                firsts: +seconds < 0 ? seconds.slice(1,) : '-' + seconds,
                isRes: true,
                isEq: true
            });
        }
        else {
            if (isSecond && seconds !== 0) {
                this.setState({
                    seconds: +seconds < 0 ? seconds.slice(1,) : '-' + seconds
                });
            }
            if (!isSecond && firsts !== 0) {
                this.setState({
                    firsts: +firsts < 0 ? firsts.slice(1,) : '-' + firsts
                });
            }
        }
    }

    onCEClick = () => {
        const { isSecond, isEq } = this.state;
        if (isEq) {
            this.onCClick();
        }
        else {
            isSecond ? this.setState({
                seconds: 0,
                res: 0,
                isRes: false
            }) : this.setState({
                firsts: 0,
                res: 0,
                isRes: false
            });
        }
    };

    onDClick = () => {
        const { firsts, seconds, isSecond } = this.state;
        if (isSecond && seconds !== 0) {
            this.setState({
                seconds: seconds[0] === '-' && seconds.length === 2 || seconds === '-0.' ? 0 : 
                    (seconds.length > 1 ? seconds.slice(0, seconds.length - 1) : 0)
            });
        }
        if (!isSecond && firsts !== 0) {
            this.setState({
                firsts: firsts[0] === '-' && firsts.length === 2 || firsts === '-0.' ? 0 : 
                    (firsts.length > 1 ? firsts.slice(0, firsts.length - 1) : 0)
            });
        }
    };

    calcRes = () => {
        const { firsts, seconds, res } = this.state;
        switch (firsts[firsts.length - 1]) {
            case '+':
                return res + +seconds;
            case '-':
                return res - +seconds;
            case '*':
                return res * +seconds;
            case '/':
                return res / +seconds;
        }
    };

    onResSignClick = (sign) => {
        const { firsts } = this.state;
        this.setState({
            firsts: firsts.slice(0, firsts.length - 2) + sign,
            isEq: false,
            isSecond: true
        });
    };

    onDelClick = () => {
        const { firsts, seconds, isSecond, isEq } = this.state;
        if (isEq) {
            this.onResSignClick('/');
        }
        else {
            this.setState({
                isSecond: true,
                firsts: isSecond ? (seconds != 0 ? firsts + ` ${ seconds } /` : firsts) : firsts + ' /',
                seconds: isSecond ? this.calcRes() : +firsts,
                res: isSecond ? this.calcRes() : +firsts,
                isRes: true
            });
        }
    };

    onPlusClick = () => {
        const { firsts, seconds, isSecond, isEq } = this.state;
        if (isEq) {
            this.onResSignClick('+');
        }
        else {
            this.setState({
                isSecond: true,
                firsts: isSecond ? (seconds != 0 ? firsts + ` ${ seconds } +` : firsts) : firsts + ' +',
                seconds: isSecond ? this.calcRes() : +firsts,
                res: isSecond ? this.calcRes() : +firsts,
                isRes: true
            });
        }
    };

    onMinClick = () => {
        const { firsts, seconds, isSecond, isEq } = this.state;
        if (isEq) {
            this.onResSignClick('-');
        }
        else {
            this.setState({
                isSecond: true,
                firsts: isSecond ? (seconds != 0 ? firsts + ` ${ seconds } -` : firsts) : firsts + ' -',
                seconds: isSecond ? this.calcRes() : +firsts,
                res: isSecond ? this.calcRes() : +firsts,
                isRes: true
            });
        }
    };

    onMulClick = () => {
        const { firsts, seconds, isSecond, isEq } = this.state;
        if (isEq) {
            this.onResSignClick('*');
        }
        else {
            this.setState({
                isSecond: true,
                firsts: isSecond ? (seconds != 0 ? firsts + ` ${ seconds } *` : firsts) : firsts + ' *',
                seconds: isSecond ? this.calcRes() : firsts,
                res: isSecond ? this.calcRes() : +firsts,
                isRes: true
            });
        }
    };

    onEqClick = () => {
        const { isSecond, firsts, seconds } = this.state;
        this.setState({
            isSecond: true,
            firsts: isSecond ? `${ firsts } ${ seconds } =` : `${ firsts } =`,
            seconds: isSecond ? this.calcRes() : firsts,
            isRes: true,
            res: isSecond ? this.calcRes() : +firsts,
            isEq: true
        })
    };

    render() {
        const { isSecond, firsts, seconds } = this.state;
        return (
            <div className="calc">
                <div className="top">
                    {
                        isSecond && <div>
                            <h1 className="tFrst">{ firsts }</h1>
                            <h1 className="bScnd">{ seconds }</h1>
                        </div> ||
                        <h1 className="first">{ firsts }</h1>
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
                        <Button onClick={ this.onDelClick }>/</Button>
                        <Button onClick={ this.onMulClick }>*</Button>
                        <Button onClick={ this.onMinClick }>-</Button>
                        <Button onClick={ this.onPlusClick }>+</Button>
                        <Button onClick={ this.onEqClick }>=</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Calc;