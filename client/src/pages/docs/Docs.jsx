import Example from "../../components/example/Example";
import "./docs.css";
import {
  deleteUsers,
  getUser,
  getUsers,
  postAddUser,
  putCredit,
  putTransfer,
} from "../../codeSnippets";

function Docs() {
  return (
    <div className="docs">
      <p className="baseurl">
        Base URL: https://bankoftheyear.herokuapp.com/api/v1
      </p>
      <h3>---Users---</h3>
      <Example
        method="GET"
        endpoint="/users"
        explanation="Get all users"
        type="Request example:"
        code={getUsers}
      />
      <Example
        method="GET"
        endpoint="/users/user"
        explanation="Get a user by ID"
        type="Request example:"
        code={getUser}
      />
      <Example
        method="POST"
        endpoint="/users/add"
        explanation="Add a new user given a user ID and an array of account IDs. if the array is empty, a new account will be created with 0 cash and 0 credits"
        type="Request example:"
        code={postAddUser}
      />
      <Example
        method="DELETE"
        endpoint="/users/delete"
        explanation="Delete a user by ID via body. User will also be deleted from every account he had. If the account became empty it will be deleted also"
        type="Request example:"
        code={deleteUsers}
      />
      <h3>---Accounts---</h3>
      <Example
        method="GET"
        endpoint="/accounts"
        explanation="Get all accounts. (See get users request example)"
      />
      <Example
        method="GET"
        endpoint="/accounts/account"
        explanation="Get an account by ID. (See get user request example)"
      />
      <Example
        method="PUT"
        endpoint="/users/credit"
        explanation="Update account's credit by account ID and amount"
        type="Request example:"
        code={putCredit}
      />
      <Example
        method="PUT"
        endpoint="/users/deposit"
        explanation="Deposit cash to an account by account id and amount. (See put credit example)"
      />
      <Example
        method="PUT"
        endpoint="/users/withdraw"
        explanation="Withdraw cash from account by account id and amount. (See put credit example)"
      />
      <Example
        method="PUT"
        endpoint="/users/transfer"
        explanation="Transfer from one account to another"
        type="Request example:"
        code={putTransfer}
      />
    </div>
  );
}

export default Docs;
