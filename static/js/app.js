/*jshint esversion: 6 */
(function(){
    class List extends React.Component {
        constructor() {
            super();
            this.state = { todos: [] };
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
            this.state.todos.forEach(function(todo,id){
                console.log(todo);
                rows.push(<li key={id}>{todo.description}</li>);
            });
            return (
                <ul>
                    {rows}
                </ul>
            );
        }
    }
    ReactDOM.render(
        <List source="api/todos/" />,
        document.getElementById('app')
    );
})();
