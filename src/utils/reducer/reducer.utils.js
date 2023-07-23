// Function that just formats the code better. Use this when dispatching to reducers.
// Takes a type and a payload and formats it into an object with type and payload
export const createAction = (type, payload) => ({ type, payload });
