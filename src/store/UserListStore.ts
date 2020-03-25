import {action, decorate, observable} from "mobx";
import {fromPromise, actionAsync} from "mobx-utils";
import RootStore from "./RootStore";
import UserModel from "../model/UserModel";
import userRepo from "../repo/UserRepo"

export default class UserStore {
    rootStore: RootStore;
    users: UserModel[] = [];
    user: UserModel | null = null;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    async loadList(): Promise<void> {
        const jsonList = await userRepo.list();
        this.users = jsonList.map(json => new UserModel().fromJson(json));
    }

    async load(userId: number): Promise<void> {
        await userRepo.read(userId).then(action(this.onLoad))
    }

    get loadA(): string {
        return fromPromise(userRepo.read(1)).case({
            pending: (staleValue) => {
                return staleValue || "searching" // <- value might set to previous results while the promise is still pending
            },
            fulfilled: (value) => {
                return value // the fresh results
            },
            rejected: (error) => {
                return "Oops: " + error
            }
        })
    }

    private onLoad(json: any) {
        this.user = new UserModel().fromJson(json);
    }

    async create(user: UserModel): Promise<void> {
        await userRepo.create(user.asJson).then(action(this.onCreate))
    }

    private onCreate(json: any[]) {
        this.user = new UserModel().fromJson(json);
    }

}

decorate(UserStore, {
    rootStore: observable,
    users: observable,
    loadList: actionAsync
});