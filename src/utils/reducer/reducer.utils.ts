import { AnyAction } from "redux";

// Matchable type (type predicate function)
type Matchable<AC extends () => AnyAction> = AC & {
  type: ReturnType<AC>["type"];
  match(action: AnyAction): action is ReturnType<AC>;
};

// Overload for withMatcher with AC without params
export function withMatcher<AC extends () => AnyAction & { type: string }>(
  actionCreator: AC
): Matchable<AC>;

// Overload for withMatcher with AC with params
export function withMatcher<
  AC extends (...args: any[]) => AnyAction & { type: string }
>(actionCreator: AC): Matchable<AC>;

// Function for adding the matchable type to an action creator function
export function withMatcher(actionCreator: Function) {
  const type = actionCreator().type;
  return Object.assign(actionCreator, {
    type,
    match(action: AnyAction) {
      return action.type === type;
    },
  });
}

// Action with payload type
export type ActionWithPayload<T, P> = {
  type: T;
  payload: P;
};

// Action type without payload
export type Action<T> = {
  type: T;
};

// Overload for createAction with payload and action type
export function createAction<T extends string, P>(
  type: T,
  payload: P
): ActionWithPayload<T, P>;

// Overload for createAction with only action type
export function createAction<T extends string>(
  type: T,
  payload: void
): Action<T>;

// Function that just formats the code better. Use this when dispatching to reducers.
// Takes a type and a payload and formats it into an object with type and payload
export function createAction<T extends string, P>(type: T, payload: P) {
  return { type, payload };
}
