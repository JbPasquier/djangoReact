(function(){
  class List extends React.Component {
    constructor() {
      super();
      this.state = { todos: [] }
    }

          componentDidMount() {
            this.serverRequest = $.get(this.props.source, function (result) {
              this.setState({
                todos: result
              });
            }.bind(this));
          }

          componentWillUnmount() {
            this.serverRequest.abort();
          }

    render() {
      var rows = [];
      console.log(this.state);
      this.state.todos.forEach(function(todo){
          rows.push(<li key={todo.id}>{todo.description}</li>)
      })
      return (
        <ul>
          {rows}
        </ul>
      )
    }
  }
    ReactDOM.render(
      <List source="api/todos/" />,
      document.getElementById('app')
    );
})();
