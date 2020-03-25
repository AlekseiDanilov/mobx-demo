import {decorate, IObservableArray, observable} from "mobx";
import {actionAsync} from "mobx-utils";
import RootStore from "./RootStore";
import UserModel from "../model/UserModel";
import userRepo from "../repo/UserRepo"

export default class UserListStore {
    rootStore: RootStore;

    users: IObservableArray<UserModel> = observable.array();

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    async loadList(): Promise<void> {
        this.rootStore.backdropStore.show();
        const jsonList = await userRepo.list();
        this.users = observable.array(jsonList.map(json => new UserModel().fromJson(json)));
        this.rootStore.backdropStore.hide();
    }

    async delete(user: UserModel): Promise<void> {
        if (user.id) {
            await userRepo.delete(user.id);
        }
        this.users.remove(user);
    }

}

decorate(UserListStore, {
    rootStore: observable,
    users: observable,
    loadList: actionAsync,
    delete: actionAsync
});