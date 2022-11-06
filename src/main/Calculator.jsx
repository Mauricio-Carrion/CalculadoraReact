import React, { Component } from 'react'
import './Calculator.css'
import Button from '../components/Button'
import Display from '../components/Display'

const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0
}
export default class Calculator extends Component {
  state = { ...initialState }

  constructor(props) {
    super(props)

    this.clearMemory = this.clearMemory.bind(this)
    this.addDigit = this.addDigit.bind(this)
    this.setOperation = this.setOperation.bind(this)
    this.getResult = this.getResult.bind(this)
  }

  clearMemory() {
    this.setState({ ...initialState })
  }

  setOperation(Operation) {
    if (this.state.current === 0 && this.state.displayValue !== '0') {
      const clearDisplay = this.state.displayValue = '0' || this.state.clearDisplay
      const operation = Operation
      const current = 1

      this.setState({ clearDisplay, operation, current })
    }
  }

  addDigit(n) {
    if (n === '.' && typeof this.state.displayValue === 'string' && this.state.displayValue.includes('.')) {
      return
    }

    const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay
    const currentValue = clearDisplay ? '' : this.state.displayValue
    const displayValue = currentValue + n
    this.setState({ displayValue, clearDisplay: false })

    if (n !== '.') {
      const i = this.state.current
      const newValue = parseFloat(displayValue)
      const values = [...this.state.values]
      values[i] = newValue
      this.setState({ values })
    }
  }

  getResult(equal) {
    const firstValue = this.state.values[0]
    const secondValue = this.state.values[1]
    const operation = equal
    const operator = this.state.operation

    let result
    let displayValue
    let values = [...this.state.values]

    if (secondValue !== 0) {
      switch (operator) {
        case '÷':
          result = firstValue / secondValue
          break
        case 'x':
          result = firstValue * secondValue
          break
        case '-':
          result = firstValue - secondValue
          break
        case '+':
          result = firstValue + secondValue
          break
      }

      let stringResult = result.toString()

      if (stringResult.length > 10 && stringResult.includes('.')) {
        result = result.toFixed(3)
      }

      displayValue = result
      values[0] = displayValue
      values[1] = 0

      this.setState({ displayValue, operation, values, current: 0 })
    }
    console.log(this.state)
  }

  render() {
    return (
      <div className='calculator'>
        <Display value={this.state.displayValue} />
        <Button label='AC' click={this.clearMemory} triple />
        <Button label='÷' click={this.setOperation} operation />
        <Button label='7' click={this.addDigit} />
        <Button label='8' click={this.addDigit} />
        <Button label='9' click={this.addDigit} />
        <Button label='x' click={this.setOperation} operation />
        <Button label='4' click={this.addDigit} />
        <Button label='5' click={this.addDigit} />
        <Button label='6' click={this.addDigit} />
        <Button label='-' click={this.setOperation} operation />
        <Button label='1' click={this.addDigit} />
        <Button label='2' click={this.addDigit} />
        <Button label='3' click={this.addDigit} />
        <Button label='+' click={this.setOperation} operation />
        <Button label='0' click={this.addDigit} double />
        <Button label='.' click={this.addDigit} />
        <Button label='=' click={this.getResult} operation />
      </div>
    )
  }
}