import {decorate, observable} from "mobx";
import {actionAsync} from "mobx-utils";
import RootStore from "./RootStore";
import UserModel from "../model/UserModel";
import userRepo from "../repo/UserRepo"

export default class UserStore {
    rootStore: RootStore;
    user: UserModel = new UserModel();

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    async loadUser(userId: string | undefined): Promise<void> {
        this.user = new UserModel();
        if (userId) {
            const json = await userRepo.read(userId);
            this.user.fromJson(json);
        }
    }

    async saveUser(): Promise<void> {
        if (this.user.id) {
            await userRepo.update(this.user.asJson);
        } else {
            this.user.id = await userRepo.create(this.user.asJson);
        }
    }

}

decorate(UserStore, {
    rootStore: observable,
    user: observable,
    loadUser: actionAsync,
    saveUser: actionAsync
});