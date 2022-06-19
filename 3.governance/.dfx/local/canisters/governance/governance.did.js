export const idlFactory = ({ IDL }) => {
  const canister_id = IDL.Principal;
  const wasm_module = IDL.Vec(IDL.Nat8);
  const InstallCodeParams = IDL.Record({
    'arg' : IDL.Vec(IDL.Nat8),
    'wasm_module' : wasm_module,
    'mode' : IDL.Variant({
      'reinstall' : IDL.Null,
      'upgrade' : IDL.Null,
      'install' : IDL.Null,
    }),
    'canister_id' : canister_id,
  });
  const Action = IDL.Variant({
    'stop_canister' : canister_id,
    'start_canister' : canister_id,
    'delete_canister' : canister_id,
    'install_code' : InstallCodeParams,
    'create_canister' : IDL.Null,
  });
  const CanisterStatus = IDL.Variant({
    'deleted' : IDL.Null,
    'stopped' : IDL.Null,
    'stopping' : IDL.Null,
    'running' : IDL.Null,
  });
  const ProposalView = IDL.Record({
    'action' : Action,
    'desc' : IDL.Text,
    'agreed' : IDL.Vec(IDL.Principal),
    'canister_status' : IDL.Opt(CanisterStatus),
    'approved' : IDL.Bool,
    'proposal_id' : IDL.Nat,
  });
  const Result = IDL.Variant({ 'ok' : ProposalView, 'err' : IDL.Text });
  const anon_class_10_1 = IDL.Service({
    'add_controller' : IDL.Func([], [], []),
    'propose' : IDL.Func([Action, IDL.Text], [Result], []),
    'set_approve_threshold' : IDL.Func([IDL.Nat, IDL.Nat], [], []),
    'vote' : IDL.Func([IDL.Nat], [IDL.Opt(ProposalView)], []),
  });
  return anon_class_10_1;
};
export const init = ({ IDL }) => {
  return [IDL.Nat, IDL.Nat, IDL.Vec(IDL.Principal)];
};
