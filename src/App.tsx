import React from 'react';
import {Provider} from "mobx-react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import UserList from "./component/UserList";
import {AppBar, Box, Typography} from "@material-ui/core";
import User from "./component/User";
import RootStore from "./store/RootStore";
import FullScreenBackdrop from "./component/FullScreenBackdrop";

const rootStore = new RootStore();

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Provider {...rootStore}>
                    <AppBar position={"static"}>
                        <Box p={2}>
                            <Typography variant="h6">
                                MobX.js demo project
                            </Typography>
                        </Box>
                    </AppBar>
                    <Switch>
                        <Route path='/user/:userId'>
                            <User/>
                        </Route>
                        <Route path='/user' exact>
                            <User/>
                        </Route>
                        <Route path='/'>
                            <UserList/>
                        </Route>
                    </Switch>
                    <FullScreenBackdrop/>
                </Provider>
            </BrowserRouter>
        );
    }
}

export default App;
