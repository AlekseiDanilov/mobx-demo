import {action, decorate, observable} from "mobx";
import RootStore from "./RootStore";

export default class BackdropStore {
    rootStore: RootStore;
    isOpen: boolean = false;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    show() {
        this.isOpen = true;
    }

    hide() {
        this.isOpen = false;
    }
}

decorate(BackdropStore, {
    rootStore: observable,
    isOpen: observable,
    show: action,
    hide: action
});