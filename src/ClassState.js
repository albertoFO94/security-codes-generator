import React from "react";
import { Loading } from "./Loading";

const SECURITY_CODE = 'paradigma';

class ClassState extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      error: false,
      loading: false
    };
  }

  componentDidUpdate() {
    console.log("componentDidUpdate");

    if (this.state.loading) {
      setTimeout(() => {
        console.log("Doing validation");
  
        if (SECURITY_CODE === this.state.value) {
          this.setState({ error: false, loading: false});
        } else {
          this.setState({ error: true, loading: false});
        }
  
        console.log("Ending validation");
      }, 3000);
    }
  }

  render() {
    const { name } = this.props;
    const { error, loading, value } = this.state;

    return (
      <div>
        <h2>Delete { name }</h2>
        <p>Please, enter the security code.</p>
        {(error && !loading) && <p>Error: Wrong code!</p>}
        {loading && <Loading />}
        <input
          placeholder="Security code"
          value={value}
          onChange={(event) => {
            this.setState({ value: event.target.value });
          }}
        />
        <button
          onClick={() =>
            this.setState({ loading: true })
          }
        >
          Check
        </button>
      </div>
    );
  }
}

export { ClassState };