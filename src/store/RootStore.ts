import UserListStore from "./UserListStore";
import {decorate, observable} from "mobx";
import UserStore from "./UserStore";
import BackdropStore from "./BackdropStore";

export default class RootStore {
    userListStore: UserListStore;
    userStore: UserStore;
    backdropStore: BackdropStore;

    constructor() {
        this.userListStore = new UserListStore(this);
        this.userStore = new UserStore(this);
        this.backdropStore = new BackdropStore(this)
    }
}

decorate(RootStore, {
    userListStore: observable,
    userStore: observable
});