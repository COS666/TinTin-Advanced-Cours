import type { Principal } from '@dfinity/principal';
export type Action = { 'stop_canister' : canister_id } |
  { 'start_canister' : canister_id } |
  { 'delete_canister' : canister_id } |
  { 'install_code' : InstallCodeParams } |
  { 'create_canister' : null };
export type CanisterStatus = { 'deleted' : null } |
  { 'stopped' : null } |
  { 'stopping' : null } |
  { 'running' : null };
export interface InstallCodeParams {
  'arg' : Array<number>,
  'wasm_module' : wasm_module,
  'mode' : { 'reinstall' : null } |
    { 'upgrade' : null } |
    { 'install' : null },
  'canister_id' : canister_id,
}
export interface ProposalView {
  'action' : Action,
  'desc' : string,
  'agreed' : Array<Principal>,
  'canister_status' : [] | [CanisterStatus],
  'approved' : boolean,
  'proposal_id' : bigint,
}
export type Result = { 'ok' : ProposalView } |
  { 'err' : string };
export interface anon_class_10_1 {
  'add_controller' : () => Promise<undefined>,
  'propose' : (arg_0: Action, arg_1: string) => Promise<Result>,
  'set_approve_threshold' : (arg_0: bigint, arg_1: bigint) => Promise<
      undefined
    >,
  'vote' : (arg_0: bigint) => Promise<[] | [ProposalView]>,
}
export type canister_id = Principal;
export type wasm_module = Array<number>;
export interface _SERVICE extends anon_class_10_1 {}
