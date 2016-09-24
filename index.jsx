
import ReactDOM from 'react-dom';
import React    from 'react';
import { Router, Route, IndexRoute, IndexLink, Link, browserHistory } from 'react-router';
import fetchival from 'fetchival';

const Page = ({route}) => (
    <p> {route.txt} </p>
)

class Skills extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            list: null
        };
    }

    componentDidMount () {
        fetchival('/db.json')
            .get()
            .then(json => {
                console.log('<Skills> is mounted');
                console.log(json);
                this.setState({list: json});
            })
            .catch(console.log);
    }

    _getList () {
        const list = this.state.list;
        if (!list) {
            return;
        }

        return Object.keys(list).map(function (key) {
            const level = list[key];
            return (
                <li> {key + " : " + level} </li>
            )
        });
    }

    render () {
        return (
            <div>
                <p> {this.props.route.txt} </p>
                <ul role="skills-list">
                    { this._getList() }
                </ul>
            </div>
        )
    }
}


const Index = ({children}) => (
    <div className="index">
        <ul role="nav">
            <li><IndexLink to="/">Home</IndexLink></li>
            <li><Link to="/skills">Skills</Link></li>
            <li><Link to="/me">Me</Link></li>
        </ul>
        { children }
    </div>
)

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={Index} >
            <IndexRoute txt="Home page" component={Page} />
            <Route path="me" txt="Me page" component={Page} />
            <Route path="skills" txt="Skills page" component={Skills} />
        </Route>
    </Router>
), document.getElementById('wrapper'));
