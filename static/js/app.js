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
                            <input type='text' className='form-control' value={todo.description} />
                        </td>
                        <td className='text-center'>
                            <span className='glyphicon glyphicon-edit'></span>
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
                        <tr><th>Todo</th><th>Modifier</th><th>Supprimer</th></tr>
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
                        <ul><li><a href="/#/">GET</a></li><li><a href="/#/add">POST</a></li><li><a href="/#/delete">DELETE</a></li></ul>
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
