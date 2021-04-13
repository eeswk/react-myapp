import logo from './logo.svg';
import './App.css';
import WeatherApp from './WeatherApp';
import { useState } from 'react';
import ReactTable from "react-table-6";
import "react-table-6/react-table.css" ;

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import AddItem from './AddItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import Contact from './Contract';
import Home from './Home';

function App() {
    const [data, setData] = useState([]);
    const [keyword, setKeyword] = useState('');

    const [items, setItems] = useState([]);


    const fetchDate = () => {
        //REST API CALL comes here
        const url = `https://api.github.com/search/repositories?q=${keyword}`;
        fetch(url)
        .then(response => response.json())
        .then(responseData => {
            setData(responseData.items);
        });
    }    

    const handleChange = (e) => {
        setKeyword(e.target.value);
    }

    const tableRows = data.map((item, index) => 
        <tr key={index}>
            <td>{item.full_name}</td>
            <td><a href={item.html_url}>{item.html_url}</a></td>    
        </tr>
    );


    const columns = [{
        Header: 'Name',
        accessor: 'full_name'
    },{
        Header: 'URL',
        accessor: 'html_url'
    },{
        Header: 'Owner',
        accessor: 'owner.login'
    }, {
        id: 'button',
        sortable: false,
        filterable: false,
        width: 100,
        accessor: 'full_name',
        Cell: ({value}) => (<button onClick={() => {btnClick(value)}}>Press Me</button>)
    }]

    const btnClick = (value) => {
        alert(value);
    }

    const addItem = (item) => {
        setItems([item, ...items]);
    }

    const listItems = items.map((item, index) => 
    <ListItem key={index}>
    <ListItemText primary={item.product} secondary={item.amount} />
    </ListItem>);


    return (
        <div className="App">
            <BrowserRouter>
                <div>
                    <Link to="/">Home</Link>{' '}
                    <Link to="/contact">Contact</Link>{' '} 
                    <Link to="/links">Links</Link>{' '} 
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/contact" component={Contact} />
                        <Route path="/links" render={() => <h1>Links</h1>} />
                        <Route render={() => <h1>Page not found</h1>} />
                    </Switch>
                </div>
            </BrowserRouter>

            <WeatherApp />
            <input type="text" onChange={handleChange} />
            <button onClick={fetchDate} value={keyword} >fetch</button>
            <ReactTable data={data} columns={columns} filterable={true} defaultPageSize={10} />

            <AppBar position="static" color="default">
                <Toolbar>
                    <Typography variant="h6" color="inherit">
                        SHOPPINGLIST
                    </Typography>
                </Toolbar>
            </AppBar>
            <AddItem addItem1={addItem}></AddItem>
            <List>{listItems}</List>
        </div>
    );
}

export default App;
