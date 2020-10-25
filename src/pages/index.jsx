import React, { Component } from 'react';
import { Button, TextField } from '@material-ui/core';
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
                seconds : seconds === 0 ? `${num}` : `${ seconds }` + num
            }) : this.setState({
                firsts : firsts === 0 ? `${num}`: `${ firsts }` + num
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
            if (seconds != 0)
            {
                this.setState({
                    firsts: +seconds < 0 ? `${seconds}`.slice(1,) : `- ${seconds}`,
                    isRes: true,
                    isEq: true
                });
            }
        }
        else {
            if (isSecond && seconds != 0) {
                this.setState({
                    seconds: +seconds < 0 ? `${seconds}`.slice(1,) : `- ${seconds}`
                });
            }
            if (!isSecond && firsts != 0) {
                this.setState({
                    firsts: +firsts < 0 ? `${firsts}`.slice(1,) : `- ${firsts}`
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

    greatestNum = (firsts, seconds) => {
        const f = `${ firsts }`.indexOf('.') != -1 ? `${ firsts }`.split('.', 2)[1].length : 0;
        const s = `${ seconds }`.indexOf('.') != -1 ? `${ seconds }`.split('.', 2)[1].length : 0;
        return Math.max(f, s);
    };
    
    calcRes = () => {
        const { firsts, seconds, res } = this.state;
        const isDot = (`${firsts}`.indexOf('.') != -1 || `${seconds}`.indexOf('.') != -1) ? true : false;
        const nums = {
            num1: res,
            num2: +seconds
        }; 
        switch (firsts[firsts.length - 1]) {
            case '+':
                fetch('https://l4.scripthub.ru/api/plus.php', {
                    method: 'POST',
                    body: JSON.stringify(nums)
                }).then(resp => resp.json().then(r => {
                    this.setState({
                        seconds: isDot ? parseFloat(r.res).toFixed(this.greatestNum(res, seconds)) :
                        r.res,
                        res: isDot ? parseFloat(r.res).toFixed(this.greatestNum(res, seconds)) :
                        r.res
                    });
                }));
                break;
            case '-':
                fetch('https://l4.scripthub.ru/api/minus.php', {
                    method: 'POST',
                    body: JSON.stringify(nums)
                }).then(resp => resp.json().then(r => {
                    this.setState({
                        seconds: isDot ? parseFloat(r.res).toFixed(this.greatestNum(res, seconds)) :
                        r.res,
                        res: isDot ? parseFloat(r.res).toFixed(this.greatestNum(res, seconds)) :
                        r.res
                    });
                }));
                break;
            case '*':
                fetch('https://l4.scripthub.ru/api/multiply.php', {
                    method: 'POST',
                    body: JSON.stringify(nums)
                }).then(resp => resp.json().then(r => {
                    this.setState({
                        seconds: r.res,
                        res: r.res
                    });
                }));
                break;
            case '/':
                fetch('https://l4.scripthub.ru/api/devide.php', {
                    method: 'POST',
                    body: JSON.stringify(nums)
                }).then(resp => resp.json().then(r => {
                    this.setState({
                        seconds: r.res,
                        res: r.res
                    });
                }));
                break;
        }
    };

    onResSignClick = (sign) => {
        const { firsts } = this.state;
        this.setState({
            firsts: firsts.slice(0, firsts.length - 2) + ' ' + sign,
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
                isRes: true
            });
            if (isSecond) {
                this.calcRes();
            }
            else {
                this.setState({
                    seconds: +firsts,
                    res: +firsts
                });
            }
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
                isRes: true
            });
            if (isSecond) {
                this.calcRes();
            }
            else {
                this.setState({
                    seconds: +firsts,
                    res: +firsts
                });
            }
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
                isRes: true
            });
            if (isSecond) {
                this.calcRes();
            }
            else {
                this.setState({
                    seconds: +firsts,
                    res: +firsts
                });
            }
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
                isRes: true
            });
            if (isSecond) {
                this.calcRes();
            }
            else {
                this.setState({
                    seconds: +firsts,
                    res: +firsts
                });
            }
        }
    };

    onEqClick = () => {
        const { isSecond, firsts, seconds, isEq } = this.state;
        if (!isEq) {
            this.setState({
                isSecond: true,
                firsts: isSecond ? `${ firsts } ${ seconds } =` : `${ firsts } =`,
                isRes: true,
                isEq: true
            })
            if (isSecond) {
                this.calcRes();
            }
            else {
                this.setState({
                    seconds: firsts,
                    res: +firsts
                });
            }
        }
    };

    onKey = (event) => {
        if (['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].indexOf(event.key) != -1) {
            this.numType(event.key);
        }
        else {
            switch (event.key) {
                case '+':
                    this.onPlusClick();
                    break;
                case '-':
                    this.onMinClick();
                    break;
                case '*':
                    this.onDelClick();
                    break;
                case '/':
                    this.onDelClick();
                    break;
                case '=':
                    this.onEqClick();
                    break;
                case 'Enter':
                    this.onEqClick();
                    break;
                case '.':
                    this.onDotClick();
                    break;
                case 'Backspace':
                    this.onDClick();
                    break;
            }
        }
    };

    testFetch = () => {
        const nums = {
            num1: 1,
            num2: 4
        }; 
        fetch('https://l4.scripthub.ru/api/test.php', {
            method: 'POST',
            body: JSON.stringify(nums)
        });
    };

    componentDidMount() {
        document.addEventListener('keydown', this.onKey);
        this.testFetch();
    }

    render() {
        const { isSecond, firsts, seconds } = this.state;
        return (
            <>
                <h1 className="topH">Calculator</h1>
                <div className="calc">
                    <div className="top">
                        {
                            isSecond && <div>
                                <TextField 
                                    className="tFrst"
                                    value={ firsts }
                                    fullWidth={ true }
                                    variant="outlined"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    classes={{
                                        root: "textField"
                                    }}
                                />
                                <TextField 
                                    className="bScnd" 
                                    value={ seconds } 
                                    fullWidth={ true }
                                    variant="outlined"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    classes={{
                                        root: "textField"
                                    }}
                                />
                            </div> ||
                            <TextField 
                                className="first" 
                                value={ firsts } 
                                fullWidth={ true }
                                variant="outlined"
                                InputProps={{
                                    readOnly: true,
                                }}
                                classes={{
                                    root: "textField"
                                }}
                            />
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
            </>
        );
    }
}

export default Calc;