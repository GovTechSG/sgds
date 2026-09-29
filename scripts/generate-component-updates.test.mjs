import assert from "node:assert/strict";
import test from "node:test";
import { findComponentKeys } from "./generate-component-updates.mjs";

test("shared navigation release appears for Mainnav and Appnav without duplicates", () => {
  assert.deepEqual(findComponentKeys("* feat(mainnav): new sgds-appnav, sgds-mainnav-profile, sgds-appnav-profile subcomponents"), ["mainnav", "appnav"]);
});

test("supports multiple scopes and Appnav profile aliases", () => {
  assert.deepEqual(findComponentKeys("* fix(appnav-profile, mainnav): keyboard handling"), ["appnav", "mainnav"]);
});

test("does not assign incidental component mentions in scoped entries", () => {
  assert.deepEqual(findComponentKeys("* fix(button): alignment beside mainnav"), ["button"]);
});

test("keeps unscoped matching and ignores unknown scopes", () => {
  assert.deepEqual(findComponentKeys("* Improve accordion spacing"), ["accordion"]);
  assert.deepEqual(findComponentKeys("* fix(internal): build task"), []);
});
