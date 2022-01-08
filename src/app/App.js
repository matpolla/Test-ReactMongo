import React,{Component} from "react";

class App extends Component {
    constructor(){
        super();
        this.state = {
            title: '',
            description : '',
            _id:'',
            tasks:[]
        };
        this.addTask= this.addTask.bind(this);
        this.handleChange= this.handleChange.bind(this);

    }

    addTask(e) {
        e.preventDefault();
        if(this.state._id) {
            fetch(`/api/task/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    title: this.state.title,
                    description: this.state.description
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    window.M.toast({html: 'Task Updated'});
                    this.setState({_id: '', title: '', description: ''});
                    this.fetchTasks();
                });
        } else {
            fetch('/api/task', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    window.M.toast({html: 'Task Saved'});
                    this.setState({title: '', description: ''});
                    this.fetchTasks();
                })
                .catch(err => console.error(err));
        }

    }

    deleteTask(id){
        if (confirm('Are you sure??'))
        {
            fetch(`/api/task/${id}`,
            {
                method: 'DELETE',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                }
            })
            .then(res=> res.json())
            .then(data=>{
                console.log(data);
                M.toast({html:'Task Deleted'});
                this.fetchTasks();


            })
            .catch(err => console.error(err));
        }
    }
    editTask(id) {
        fetch(`/api/task/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({
                    title: data.title,
                    description: data.description,
                    _id: data._id
                });
            });
    }


    componentDidMount(){
        console.log('Componente montado');
        this.fetchTasks();

    }

    fetchTasks(){
        fetch('/api/task')
            .then(res=>res.json())
            .then(data =>{
                console.log(data);
                this.setState({
                    tasks:data
                })
            });
    }

    handleChange(e){
        const {name, value }= e.target;
        this.setState({
            [name]: value
        })
    }

    render(){
        return(
        <div>
            {/* Navigation */}
            <nav className= "light-blue darken-4">
                <div className="conteiner">
                    <a className="brand-logo" href="/">Main</a>
                </div>

            </nav>

            <div className="container">
                <div className="row">
                    <div className="col s5">
                        <div className="card">
                            <div className="card-content">
                                <form onSubmit = {this.addTask}>
                                    <div className="row">
                                        <div className="imput-field col s12">
                                            <input name="title"
                                            onChange={this.handleChange}
                                            value={this.state.title}
                                            type="text" placeholder="Title"/>

                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="imput-field col s12">
                                        <textarea name="description"  onChange={this.handleChange}
                                        value={this.state.description}
                                        className="materialize-textarea" placeholder="Description">

                                        </textarea>


                                        </div>
                                    </div>
                                    <button type="submit" className="btn  ligth-blue darken-4">
                                        Send
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col s7">
                    <table>
                        <thead>
                            <tr>
                            <th>Title</th>
                            <th>Description</th>
                            </tr>
                        </thead>
                    <tbody>
                        {
                            this.state.tasks.map(task => {
                                return (
                                       <tr key= {task._id}>
                                            <td>{task.title} </td>
                                            <td>{task.description} </td>
                                            <td>

                            <button onClick={() => this.deleteTask(task._id)} className="btn light-blue darken-4">
                                <i className="material-icons">delete</i>
                             </button>

                                <button onClick={() => this.editTask(task._id)} className="btn light-blue darken-4" style={{margin: '4px'}}>
                        <i className="material-icons">edit</i>
                                </button>

                                </td>
                                       </tr>
                                )
                        })

                        }

                    </tbody>
                    </table>
                    </div>
                </div>



            </div>

        </div>
    )
    }

}

export default App;