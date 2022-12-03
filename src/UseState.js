import React from "react";

const SECURITY_CODE = 'paradigma';

function UseState({ name }) {
  const [state, setState] = React.useState({
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false
  });

  const onConfirm = () => {
    setState({
      ...state,
      error: false,
      loading: false,
      confirmed: true
    });
  };

  const onError = () => {
    setState({
      ...state,
      error: true,
      loading: false
    });
  };

  const onWrite = (newValue) => {
    setState({
      ...state,
      value: newValue
    });
  };

  const onCheck = () => {
    setState({
      ...state,
      loading: true
    });
  };

  const onDelete = () => {
    setState({
      ...state,
      deleted: true
    });
  };

  const onReset = () => {
    setState({
      ...state,
      confirmed: false,
      deleted: false,
      value: ''
    });
  };

  React.useEffect(() => {
    console.log('Starting the effect');

    if (state.loading) {
      setTimeout(() => {
        console.log("Doing validation");
  
        if (state.value === SECURITY_CODE) {
          onConfirm();
        } else {
          onError();
        }

        console.log("Ending validation");
      }, 3000);
    }

    console.log("Ending the effect");
  }, [state.loading]);

  if (!state.deleted && !state.confirmed) {
    return (
      <div>
        <h2>Delete { name }</h2>
        <p>Please, enter the security code.</p>
        {(state.error && !state.loading) && (
          <p>Error: Wrong code!</p>
        )}
        {state.loading && <p>Loading...</p>}
        <input
          placeholder="Security code"
          value={state.value}
          onChange={(event) => {
            onWrite(event.target.value);
          }}
        />
        <button
          onClick={() => {
            onCheck();
          }}
        >
          Check
        </button>
      </div>
    );
  } else if (state.confirmed && !state.deleted) {
    return (
      <>
        <p>Are you sure that you want to remove the State?</p>
        <button
          onClick={() => {
            onDelete();
          }}
        >
          Yes, delete
        </button>
        <button
          onClick={() => {
            onReset();
          }}
        >
          No, go back
        </button>
      </>
    );
  } else {
    return (
      <>
        <p>Succesfully deleted!</p>
        <button
          onClick={() => {
            onReset();
          }}
        >
          Reset, go back
        </button>
      </>
    );
  }
}

export { UseState };