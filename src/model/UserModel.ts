import {action, computed, decorate, observable} from "mobx";

export default class UserModel {
    id: string | undefined;
    email: string = '';
    firstName: string = '';
    lastName: string = '';
    age: number | null = null;

    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }

    fromJson(json: any): UserModel {
        this.id = json.id;
        this.email = json.email;
        this.firstName = json.firstName;
        this.lastName = json.lastName;
        this.age = json.age;
        return this;
    }

    get asJson(): any {
        return {
            id: this.id,
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            age: this.age
        }
    }
}

decorate(UserModel, {
    id: observable,
    email: observable,
    firstName: observable,
    lastName: observable,
    age: observable,
    fullName: computed,
    fromJson: action.bound,
    asJson: computed
});