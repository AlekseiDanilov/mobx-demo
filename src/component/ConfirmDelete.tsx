import React, {ReactNode} from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    Button,
    DialogActions, Portal
} from "@material-ui/core";
import {Link, withRouter, RouteComponentProps} from "react-router-dom";
import {inject, observer} from "mobx-react";
import {compose} from "recompose";
import UserModel from "../model/UserModel";
import UserListStore from "../store/UserListStore";
import RootStore from "../store/RootStore";

type OuterConfirmDeleteProps = {
    user: UserModel;
}

type StoreProps = {
    userListStore: UserListStore;
}

type InnerConfirmDeleteProps = OuterConfirmDeleteProps & RouteComponentProps & StoreProps;

class ConfirmDelete extends React.Component<InnerConfirmDeleteProps> {

    confirm = async () => {
        const {user, userListStore, history} = this.props;
        await userListStore.delete(user);
        history.push('/');
    };

    render(): ReactNode {
        const {user} = this.props;
        return (
            <Portal>
                <Dialog open>
                    <DialogTitle>Подтвердите удаление</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {`Вы действительно хотите удалить пользователя ${user.fullName}?`}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button component={Link} to="/" color="primary">
                            Отмена
                        </Button>
                        <Button color="secondary" onClick={this.confirm}>
                            Подтвердить
                        </Button>
                    </DialogActions>
                </Dialog>
            </Portal>
        );
    }
}

export default compose<InnerConfirmDeleteProps, OuterConfirmDeleteProps>(
    inject<RootStore, {}, StoreProps, {}>(stores => ({
        userListStore: stores.userListStore
    })),
    observer,
    withRouter
)(ConfirmDelete);
