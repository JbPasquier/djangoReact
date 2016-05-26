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
                    <tr key={id}>
                        <td>
                            <input type='text' className='form-control' defaultValue={todo.description} />
                        </td>
                        <td className='text-center'>
                            <span className='glyphicon glyphicon-remove'></span>
                        </td>
                    </tr>
                );
            });
            return (
                <table className='table table-hover table-bordered'>
                    <thead>
                        <tr>
                            <th>Todo</th>
                            <th>Supprimer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            );
        }
    }
    class Menu extends React.Component {
        render() {
            return (
                <div className='container-fluid'>
                    <div className='row'>
                        <h1>React &amp; Django - Todo List</h1>
                    </div>
                    <div className='row'>
                        <h2>Test router</h2>
                        <ul>
                            <li>
                                <a href="/#/">Todos</a>
                            </li>
                            <li>
                                <a href="/#/about">About</a>
                            </li>
                            <li>
                                <a href="/#/login">Login</a>
                            </li>
                        </ul>
                    </div>
                    <div className='row'>
                        <h2>Page</h2>
                    </div>
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
    class TodosAbout extends React.Component {
        render() {
            return (
                <div>
                    <h1>About us</h1>
                </div>
            )
        }
    }
    class TodosLogin extends React.Component {
        render() {
            return (
                <div>
                    <h1>Here you can login</h1>
                </div>
            )
        }
    }
    ReactDOM.render((
        <div>
            <Menu />
            <ReactRouter.Router>
                <ReactRouter.Route path="/" component={TodosList}/>
                <ReactRouter.Route path="/about" component={TodosAbout}/>
                <ReactRouter.Route path="/login" component={TodosLogin}/>
            </ReactRouter.Router>
        </div>
    ), document.getElementById('app'));

})();
