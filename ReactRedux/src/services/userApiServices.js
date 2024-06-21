const URI = "http://localhost:5000/api/v1";

const loginApi = async ({ email, password }) => {
    let res;
    try {
        res = await fetch(`${URI}/users/login`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        console.log(data);
        return data; // data.user gives the user object
    } catch (error) {
        console.log(error);
    }
};

// loginApi("one@gmail.com", "123456");

const registerApi = async ({ name, email, password, phonenumber }) => {
    try {
        const res = await fetch(`${URI}/users/register`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ name, email, password, phonenumber }),
        });
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
};

const logoutApi = async () => {
    let res;
    try {
        res = await fetch(`${URI}/users/logout`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-type": "application/json",
            },
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

const currentUserApi = async () => {
    let res;
    try {
        res = await fetch(`${URI}/users/loggedInUser`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-type": "application/json",
            },
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

// registerApi("five", "five@gmail.com", "password", "9000012345");

export { loginApi, registerApi, logoutApi, currentUserApi };
