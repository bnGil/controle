import Code from "../code/Code";
import "./example.css";

function Example({ method, endpoint, explanation, type, code }) {
  return (
    <div className="example-container">
      <div className="methodEp">
        <p className="method">{method}</p>
        <p className="endpoint">{endpoint}</p>
      </div>
      <p className="explanation">{explanation}</p>
      <p className="type">{type}</p>
      {code && <Code code={code} language="javascript" />}
    </div>
  );
}

export default Example;
