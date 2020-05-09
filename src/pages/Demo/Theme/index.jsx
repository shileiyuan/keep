import React from 'react'

const ThemeContext = React.createContext()

ThemeContext.displayName = 'ThemeContext'

class ThemedText extends React.Component {
  static contextType = ThemeContext

  render() {
    return (
      <div style={{ color: this.context.color }}>
        {this.props.children}
      </div>
    )
  }
}

class TodoList extends React.PureComponent {
  render() {
    return (
      <ul>
        {this.props.todos.map(todo =>
          <li key={todo}><ThemedText>{todo}</ThemedText></li>
        )}
      </ul>
    )
  }
}

export default class Demo extends React.Component {
  state = {
    color: 'blue'
  }

  handleMakeRed = () => {
    this.setState(state => ({ color: state.color === 'blue' ? 'red' : 'blue' }))
  }

  render() {
    const TODOS = ['Get coffee', 'Eat cookies']

    return (
      <ThemeContext.Provider value={this.state}>
        <button onClick={this.handleMakeRed}>
          <ThemedText>Red please!</ThemedText>
        </button>
        <TodoList todos={TODOS} />
      </ThemeContext.Provider>
    )
  }
}
