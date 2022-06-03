import IC "./ic";
import Principal "mo:base/Principal";
import Cycles "mo:base/ExperimentalCycles";
import Option "mo:base/Option";
import Buffer "mo:base/Buffer";
import Map "mo:base/HashMap";
import Iter "mo:base/Iter";

actor class () = self {
  
  // MultiSigCanister Data Structure
  type MultiSigCanister = {
      canister_id: IC.canister_id;
      controllers : [Principal];
      describe : ?Text;
  };

  // MultiSigCanister Buffer Memory
  private var multisigcansiters = Map.HashMap<IC.canister_id, MultiSigCanister>(10, Principal.equal, Principal.hash);

  // Create Cansiter
  public shared ({caller}) func create_canister({maintainers : Nat; controllers : ?[Principal]; describe : ?Text}) : async IC.canister_id{
    let cs : [Principal] = switch (controllers) {
      case null {[caller,Principal.fromActor(self)]};
      case (?c) {
        let buf = Buffer.Buffer<Principal>(c.size() + 2);
        // buf.appendArray(c);
        for (a in Iter.fromArray(c)){
          buf.add(a);
        };
        buf.add(caller);
        buf.add(Principal.fromActor(self));
        buf.toArray();
      };
    };
    assert(cs.size() >= maintainers);

    let setting = {
      freezing_threshold = null;
      controllers = ?cs;
      memory_allocation = null;
      compute_allocation = null;
    };
    let ic : IC.Self = actor("aaaaa-aa");
    let result = await ic.create_canister({settings = ?setting});
    let canister = {
      canister_id = result.canister_id;
      controllers = cs;
      describe = describe;
    };

    multisigcansiters.put(result.canister_id, canister);
    result.canister_id;
  };

  // Install Code
  public func install_code({canister_id : IC.canister_id ;mode : { #reinstall; #upgrade; #install }; wasm : IC.wasm_module}) : async () {
    
    assert checkMultiSignature();

    let ic : IC.Self = actor("aaaaa-aa");
    let install = {
      arg = [];
      wasm_module = wasm;
      mode = mode;
      canister_id = canister_id;
    };
    await ic.install_code(install);
  };

  private func checkMultiSignature() : Bool{
    true;
  };

  public func start_canister(canister_id : IC.canister_id) : async (){
    let ic : IC.Self = actor("aaaaa-aa");
    await ic.start_canister({canister_id = canister_id});
  };

  public func stop_canister(canister_id : IC.canister_id) : async (){
    let ic : IC.Self = actor("aaaaa-aa");
    await ic.stop_canister({canister_id = canister_id});
  };

  public func delete_canister(canister_id : IC.canister_id) : async (){
    let ic : IC.Self = actor("aaaaa-aa");
    await ic.delete_canister({canister_id = canister_id});
  };

  public func uninstall_code(canister_id : IC.canister_id) : async (){
    assert checkMultiSignature();
    let ic : IC.Self = actor("aaaaa-aa");
    await ic.uninstall_code({canister_id = canister_id});
  };
};