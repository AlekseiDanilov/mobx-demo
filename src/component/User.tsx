import React, {ReactNode} from 'react';
import {
    Container,
    Box,
    Grid,
    Paper,
    TextField,
    Button,
    Fade
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import {Link, RouteComponentProps, withRouter} from "react-router-dom";
import {inject, observer} from "mobx-react";
import {compose} from "recompose";
import UserStore from "../store/UserStore";

type OuterUserProps = {}

type StoreProps = {
    userStore: UserStore;
}

type RouteParams = {
    userId: string | undefined
}


type InnerUserProps = OuterUserProps & RouteComponentProps<RouteParams> & StoreProps;

class User extends React.Component<InnerUserProps> {

    constructor(p: InnerUserProps) {
        super(p);
        const userId = p.match.params.userId;
        p.userStore.loadUser(userId);
    }

    submit = async (e: React.FormEvent) => {
        e.preventDefault();
        await this.props.userStore.saveUser();
        this.props.history.push('/');
    };

    render(): ReactNode {
        const {user} = this.props.userStore;
        return (
            <Fade in>
                <Container maxWidth="md">
                    <Box mt={2}>
                        <Paper>
                            <Box p={2}>
                                <form noValidate autoComplete="off">
                                    <Grid container
                                          direction="column"
                                          spacing={1}
                                    >
                                        <Grid item>
                                            <TextField value={user.email}
                                                       onChange={e => user.email = e.target.value}
                                                       fullWidth
                                                       label="E-mail"/>
                                        </Grid>
                                        <Grid item>
                                            <TextField value={user.firstName}
                                                       onChange={e => user.firstName = e.target.value}
                                                       fullWidth
                                                       label="Имя"/>
                                        </Grid>
                                        <Grid item>
                                            <TextField value={user.lastName}
                                                       onChange={e => user.lastName = e.target.value}
                                                       fullWidth
                                                       label="Фамилия"/>
                                        </Grid>
                                        <Grid item>
                                            <TextField value={Number(user.age)}
                                                       type="number"
                                                       onChange={e => user.age = Number(e.target.value)}
                                                       fullWidth
                                                       label="Возраст"/>
                                        </Grid>
                                    </Grid>
                                    <Box m={2}/>
                                    <Grid container
                                          justify="flex-end"
                                          spacing={1}>
                                        <Grid item>
                                            <Button onClick={this.submit}
                                                    variant="contained"
                                                    color="primary"
                                                    startIcon={<SaveIcon/>}>
                                                Сохранить
                                            </Button>
                                        </Grid>
                                        <Grid item>
                                            <Button component={Link} to="/" variant="contained" color="secondary"
                                                    startIcon={<CancelIcon/>}>
                                                Отмена
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Box>
                        </Paper>
                    </Box>
                </Container>
            </Fade>
        );
    }
}

export default compose<InnerUserProps, OuterUserProps>(
    withRouter,
    inject<StoreProps, {}, {}, {}>(stores => ({
        userStore: stores.userStore
    })),
    observer
)(User);
