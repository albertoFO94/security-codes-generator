import React from "react";

const SECURITY_CODE = 'paradigma';

function UseReducer({ name }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const onConfirm = () => {
    dispatch({ type: actionTypes.confirm });
  };

  const onError = () => {
    dispatch({ type: actionTypes.error });
  };

  const onWrite = ({ target: {value} }) => {
    dispatch({ type: actionTypes.write, payload: value });
  };

  const onCheck = () => {
    dispatch({ type: actionTypes.check });
  };

  const onDelete = () => {
    dispatch({ type: actionTypes.delete });
  };

  const onReset = () => {
    dispatch({ type: actionTypes.reset });
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
          onChange={onWrite}
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

const initialState = {
  value: '',
  error: false,
  loading: false,
  deleted: false,
  confirmed: false
};

const actionTypes = {
  confirm: 'CONFIRM',
  error: 'ERROR',
  write: 'WRITE',
  check: 'CHECK',
  delete: 'DELETE',
  reset: 'RESET'
};

const reducerObject = (state, payload) => ({
  [actionTypes.confirm]: {
    ...state,
    error: false,
    loading: false,
    confirmed: true
  },
  [actionTypes.error]: {
    ...state,
    error: true,
    loading: false
  },
  [actionTypes.write]: {
    ...state,
    value: payload
  },
  [actionTypes.check]: {
    ...state,
    loading: true
  },
  [actionTypes.delete]: {
    ...state,
    deleted: true
  },
  [actionTypes.reset]: {
    ...state,
    confirmed: false,
    deleted: false,
    value: ''
  }
});

const reducer = (state, action) => {
  if (reducerObject(state)[action.type]) {
    return reducerObject(state, action.payload)[action.type];
  } else {
    return state;
  }
};

export { UseReducer };