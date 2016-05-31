(function(){
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    var csrftoken = getCookie('csrftoken');
    function csrfSafeMethod(method) {
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }
    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });
    class List extends React.Component {
        constructor() {
            super();
            this.state = { todos: [] };
        }

        getTodos() {
            this.serverRequest = $.get(this.props.source, function (result) {
                this.setState({
                    todos: result
                });
            }.bind(this)).error(function(e){if(e.status == 403) window.location = '/api-auth/login/';});
        }

        componentDidMount() {
            this.getTodos();
        }

        componentWillUnmount() {
            this.serverRequest.abort();
        }

        handleChange(event) {
            var e = event.target;
            $.ajax({
                url: e.getAttribute('data-url'),
                type: 'PUT',
                data: "description="+e.value,
            });
        }

        handleDelete(event) {
            var cmp = this;
            var e = event.target;
            $.ajax({
                url: e.getAttribute('data-url'),
                type: 'DELETE',
                success: function() {
                    cmp.getTodos();
                }
            });
        }

        handlePost(event) {
            var cmp = this;
            $.ajax({
                url: '/api/todos/',
                type: 'POST',
                data: "description="+document.getElementById('createTodo').value,
                success: function() {
                    cmp.getTodos();
                }
            });
        }

        render() {
            var cmp = this;
            var rows = [];
            this.state.todos.forEach(function(todo,id) {
                rows.push(
                    <tr key={id}>
                        <td>
                            <input data-url={todo.url} type='text' className='form-control' defaultValue={todo.description} onKeyPress={cmp.handleChange} />
                        </td>
                        <td className='text-center'>
                            <span data-url={todo.url} className='glyphicon glyphicon-remove' onClick={cmp.handleDelete.bind(cmp)}></span>
                        </td>
                    </tr>
                );
            });
            rows.push(
                <tr key={this.state.todos.length}>
                    <td colSpan='2'>
                        <div className='form-control input-group'>
                            <input type='text' className='form-control' id='createTodo' placeholder='Nouvelle todo...' />
                            <span className="input-group-btn">
                               <button className="btn btn-default" type="button" onClick={cmp.handlePost.bind(this)}>Ajouter</button>
                             </span>
                        </div>
                    </td>
                </tr>
            );
            return (
                <table className='table table-hover table-bordered'>
                    <thead>
                        <tr>
                            <th>Todo</th>
                            <th style={{width:20}}>Supprimer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            );
        }
    };
    var l = location.hash.replace(/\#/,'').split('?')[0];
    class Menu extends React.Component {
        constructor() {
            super();
        }
        render() {
            return (
                <nav className="navbar navbar-default" role="navigation">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand" href="#">React &amp; Django - Todos</a>
                        </div>
                        <div className="collapse navbar-collapse" classId="navbar">
                            <ul className="nav navbar-nav">
                                <li className={l == '/' ? 'active' : ''}><a href="#/">Todos</a></li>
                                <li className={l == '/login' ? 'active' : ''}><a href="/api-auth/logout">Logout</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            )
        }
    };
    class TodosList extends React.Component {
        constructor() {
            super();
        }
        render() {
            return (
                <div>
                    <List source="/api/todos/" />
                </div>
            )
        }
    };
    ReactDOM.render((
        <div>
            <Menu />
            <ReactRouter.Router>
                <ReactRouter.Route path="/" component={TodosList}/>
            </ReactRouter.Router>
        </div>
    ), document.getElementById('app'));

})();
