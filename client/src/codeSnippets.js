export const getUsers = `fetch("{baseURL}/users", {
    method: "GET",
})`;

export const getUser = `fetch("{baseURL}/users/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      userId: "62b6e9922c5175eccd707169",
    }
})`;

export const postAddUser = `fetch("{baseURL}/users/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      userId: "62b6e9922c5175eccd707169",
      accountIds: ["62b6e9922c5175eccd707169","62b6e9922c5175eccd707169"]
    }
})`;

export const deleteUsers = `fetch("{baseURL}/users/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      userId: "62b6e9922c5175eccd707169",
    }
})`;

export const putCredit = `fetch("{baseURL}/accounts/credit", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      accountId: "62b6e9922c5175eccd707169",
      amount: 5000
    }
})`;

export const putTransfer = `fetch("{baseURL}/accounts/transfer", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      fromAccId: "62b6e9922c5175eccd707169",
      toAccId: "62b6e9922c5175eccd707169",
      amount: 5000
    }
})`;
