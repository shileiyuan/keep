import React from 'react'
import { Typography, Button, Switch } from 'antd'

const { Title } = Typography

// component的传统方式
export default class Count extends React.Component {
  timer = null

  state = {
    count: 0,
    delay: 1000,
    isRunning: true
  }

  componentDidMount() {
    this.start()
  }

  componentWillUnmount() {
    this.clear()
  }

  start = () => {
    this.timer = setInterval(() => {
      this.setState({ count: this.state.count + 1 })
    }, this.state.delay)
  }

  clear = () => {
    window.clearInterval(this.timer)
  }

  handleSwitchChange = checked => {
    this.setState({ isRunning: checked })
    checked ? this.start() : this.clear()
  }

  increase = () => {
    this.setState({ delay: this.state.delay / 2 })
    this.clear()
    this.start()
  }

  decrease = () => {
    this.setState({ delay: this.state.delay * 2 })
    this.clear()
    this.start()
  }

  render() {
    const { count, delay, isRunning } = this.state
    return (
      <div>
        <Title level={4}>{count}</Title>
        <Title level={4}>{delay}</Title>

        <div>
          <Switch
            checkedChildren='开'
            unCheckedChildren='关'
            onChange={this.handleSwitchChange}
            checked={isRunning}
          />
          <Button onClick={this.increase}>加速</Button>
          <Button onClick={this.decrease}>减速</Button>
        </div>

        <div style={{ marginTop: 20 }}>
          使用Component的传统方式
        </div>

      </div>
    )
  }
}
