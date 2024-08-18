import {
  State,
  getAllStates,
  getStateById,
  createState,
  updateState,
  deleteState,
} from "../repositories/stateRepository";

export async function findAllStates(): Promise<State[]> {
  return getAllStates();
}

export async function findStateById(state_id: number): Promise<State | null> {
  return getStateById(state_id);
}

export async function addState(state: Omit<State, "state_id">): Promise<State> {
  return createState(state);
}

export async function modifyState(
  state_id: number,
  state: Partial<Omit<State, "state_id">>
): Promise<State | null> {
  return updateState(state_id, state);
}

export async function removeState(state_id: number): Promise<boolean> {
  return deleteState(state_id);
}
