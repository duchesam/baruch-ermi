import {test} from "node:test";
import assert from "node:assert/strict";
import {collaborate,gatewayCaller,models} from "./engine.mjs";
test("three stages use both providers",async()=>{const seen=[];const r=await collaborate("test",async(m,s,u)=>{seen.push(m);return "mock";});assert.deepEqual(seen,[models.draft,models.review,models.draft]);assert.equal(r.status,"ai-reviewed-not-independently-verified");});
test("invalid task rejected",async()=>{await assert.rejects(collaborate("",()=>{throw Error("unexpected");}),/Invalid task/);});
test("live mode fails closed",()=>assert.throws(()=>gatewayCaller({key:"fake"}),/Live mode/));
test("reservation failure blocks network",async()=>{const call=gatewayCaller({key:"fake",enabled:true,reserve:async()=>{throw Error("budget exhausted");}});await assert.rejects(call(models.draft,"s","u"),/budget exhausted/);});
