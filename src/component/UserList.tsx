import React from 'react';
import {
    Container,
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Box,
    IconButton,
    Button,
    Fade,
    Grid
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import {Link, Route} from "react-router-dom";
import ConfirmDelete from "./ConfirmDelete";
import {compose} from "recompose";
import {inject, observer} from "mobx-react";
import UserModel from "../model/UserModel";
import UserListStore from "../store/UserListStore";
import RootStore from "../store/RootStore";

type OuterUserListProps = {}

type StoreProps = {
    userListStore: UserListStore;
}

type InnerUserListProps = StoreProps;

class UserList extends React.Component<InnerUserListProps> {

    constructor(p: InnerUserListProps) {
        super(p);
        this.props.userListStore.loadList();
    }

    render() {
        return (
            <Fade in>
                <Container maxWidth="md">
                    <Box mt={2} mb={2}>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Button component={Link} to="/user" variant="contained" color="primary"
                                        startIcon={<AddIcon/>}>
                                    Добавить пользователя
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><strong>ID</strong></TableCell>
                                    <TableCell><strong>E-mail</strong></TableCell>
                                    <TableCell><strong>Имя</strong></TableCell>
                                    <TableCell><strong>Фамилия</strong></TableCell>
                                    <TableCell><strong>Возраст</strong></TableCell>
                                    <TableCell/>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.userListStore.users.map((user: UserModel) => (
                                    <React.Fragment key={user.id}>
                                        <TableRow>
                                            <TableCell>{user.id}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>{user.firstName}</TableCell>
                                            <TableCell>{user.lastName}</TableCell>
                                            <TableCell>{user.age}</TableCell>
                                            <TableCell>
                                                <IconButton component={Link} to={`user/${user.id}`}>
                                                    <EditIcon color="primary"/>
                                                </IconButton>
                                                <IconButton component={Link} to={`/delete/${user.id}`}>
                                                    <DeleteIcon color="secondary"/>
                                                </IconButton>
                                                <Route path={`/delete/${user.id}`}>
                                                    <ConfirmDelete user={user}/>
                                                </Route>
                                            </TableCell>
                                        </TableRow>
                                    </React.Fragment>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            </Fade>
        );
    }
}

export default compose<InnerUserListProps, OuterUserListProps>(
    inject<RootStore, {}, StoreProps, {}>(stores => ({
        userListStore: stores.userListStore
    })),
    observer
)(UserList);
