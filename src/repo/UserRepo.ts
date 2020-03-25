class UserRepo {
    private users = [{
        id: "0",
        email: 'aadanilov@totsystems.ru',
        firstName: 'Алексей',
        lastName: 'Данилов',
        age: 25
    }];

    async list(): Promise<any[]> {
        return this.withTime(3000)(() => {
            return this.users;
        })
    }

    async create(user: any): Promise<string> {
        return this.withTime(100)(() => {
            const {id, ...u} = user;
            const newUser = {
                id: this.users.length.toString(),
                ...u
            };
            this.users.push(newUser);
            return newUser.id;
        })
    }

    async read(id: string): Promise<any> {
        return this.withTime(500)(() => {
            return this.users.find(u => u.id === id);
        })
    }

    async update(user: any): Promise<any> {
        this.withTime(300)(() => {
            const oldUser = this.users.find(u => u.id === user.id);
            if (oldUser) {
                const index = this.users.indexOf(oldUser);
                delete this.users[index];
                this.users[index] = user;
            }
        })
    }

    async delete(id: string): Promise<any> {
        this.withTime(400)(() => {
            this.users = this.users.filter(_ => _.id !== id);
        });
    }

    private withTime = (ms: number) => (foo: () => any | string): Promise<any | string> => {
        return new Promise<any|string>((resolve) => {
            setTimeout(() => {
                resolve(foo());
            }, ms)
        })
    }
}

export default new UserRepo();