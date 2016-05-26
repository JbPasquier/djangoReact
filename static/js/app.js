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
            this.state.todos.forEach(function(todo,id) {
                rows.push(
                    <li key={id}>{todo.description}</li>
                );
            });
            return (
                <ul>
                    {rows}
                </ul>
            );
        }
    }
    class Menu extends React.Component {
        render() {
            return (
                <div>
                    <ul><li><a href="/#/">GET</a></li><li><a href="/#/add">POST</a></li><li><a href="/#/delete">DELETE</a></li></ul>
                </div>
            )
        }
    }
    class TodosList extends React.Component {
        render() {
            return (
                <div>
                    <List source="api/todos/" />
                </div>
            )
        }
    }
    class TodosAdd extends React.Component {
        render() {
            return (
                <div>
                    <h1>Add a todo form here</h1>
                </div>
            )
        }
    }
    class TodosDelete extends React.Component {
        render() {
            return (
                <div>
                    <h1>Here we delete a todo</h1>
                </div>
            )
        }
    }
    var Route = ReactRouter.Route;
    var Routes = ReactRouter.Routes;
    var Link = ReactRouter.Link;
    ReactDOM.render((
        <div>
            <Menu />
            <ReactRouter.Router>
                <ReactRouter.Route path="/" component={TodosList}/>
                <ReactRouter.Route path="/add" component={TodosAdd}/>
                <ReactRouter.Route path="/delete" component={TodosDelete}/>
            </ReactRouter.Router>
        </div>
    ), document.getElementById('app'));

})();
