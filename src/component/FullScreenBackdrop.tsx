import React, {ReactNode} from 'react';
import {
    Backdrop,
    CircularProgress,
    Portal
} from "@material-ui/core";
import {inject, observer} from "mobx-react";
import {compose} from "recompose";
import BackdropStore from "../store/BackdropStore";

type OuterFullScreenBackdropProps = {}

type Stores = {
    backdropStore: BackdropStore;
}

type StoreProps = {
    isOpen: boolean;
}

type InnerFullScreenBackdropProps = OuterFullScreenBackdropProps & StoreProps;

class FullScreenBackdrop extends React.Component<InnerFullScreenBackdropProps> {

    render(): ReactNode {
        return (
            <Portal>
                <Backdrop open={this.props.isOpen} timeout={1000} style={{zIndex: 5000}}>
                    <CircularProgress color="primary"/>
                </Backdrop>
            </Portal>
        );
    }
}

export default compose<InnerFullScreenBackdropProps, OuterFullScreenBackdropProps>(
    inject<Stores, {}, StoreProps, {}>(stores => ({
        isOpen: stores.backdropStore.isOpen
    })),
    observer
)(FullScreenBackdrop);