const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { test } = require("node:test");
const vm = require("node:vm");
const path = require("node:path");

class Element {
  constructor() { this.children = []; this.dataset = {}; this.style = {}; this.textContent = ""; }
  append(...children) { this.children.push(...children); }
  setAttribute() {}
}
let Panel;
vm.runInNewContext(readFileSync(path.join(__dirname, "../custom_components/mine_repoer/frontend/mine-repositories-panel.js"), "utf8"), {
  HTMLElement: class { attachShadow() { this.shadowRoot = new Element(); } },
  customElements: { get: () => undefined, define: (_, value) => { Panel = value; } },
  document: { createElement: () => new Element(), createTextNode: (text) => ({ textContent: text }) },
});
const flatten = (element) => [element, ...(element.children || []).flatMap(flatten)];
const text = (element) => flatten(element).map((node) => node.textContent).join(" ");
function setup(fullName, tag, fields = {}, githubFields = {}) {
  const panel = new Panel();
  panel._hass = { config: { components: ["marketplace"] } };
  const repo = { id: "123", name: fullName, full_name: fullName, category: "plugin", installed: true, pending_upgrade: false, installed_version: tag, available_version: tag, ...fields };
  panel._github.set(fullName, { tag, ...githubFields });
  panel._repositories = [repo];
  panel._detail = repo;
  return { panel, repo };
}

for (const [name, tag] of [["JS-Badge", "v2.0.2"], ["JS-Entity-Row", "v1.0.1"], ["nordpool-stromoversikt", "v1.4.6"]]) {
  for (const [scenario, fields, expected] of [
    ["same installed release, manager branch", { available_version: "master" }, false],
    ["same installed release, stale manager", { available_version: "v0.1.0" }, false],
    ["installed version newer than GitHub", { installed_version: "v9.0.0", available_version: "v0.1.0" }, false],
    ["manager version newer than GitHub", { installed_version: "v0.1.0", available_version: "v9.0.0" }, false],
    ["GitHub newer than both", { installed_version: "v0.1.0", available_version: "v0.1.0" }, true],
  ]) {
    test(`${name}: ${scenario}`, () => {
      const { panel, repo } = setup(`isimagan/${name}`, tag, fields);
      assert.equal(panel._hacsBehind(repo), expected);
      const card = panel._renderRepositoryCard(repo);
      assert.equal(card.className.includes("update"), expected);
      const detail = new Element();
      panel._renderDetail(detail);
      for (const view of [card, detail]) {
        assert.equal(flatten(view).some((node) => node.dataset?.action === "install-github"), expected);
        assert.equal(text(view).includes("mangler release"), false);
      }
      const overview = new Element();
      panel._renderOverview(overview);
      assert.ok(text(overview).includes(`${expected ? 1 : 0} oppdatering`));
    });
  }
}

for (const version of ["master", "main", "aabbccddeeff", "", undefined, "release-latest", "1.2", "2026.11.0b1"]) {
  test(`unknown manager version: ${version}`, () => {
    const { panel, repo } = setup("test/repo", "v2.0.0", { installed_version: "1.0.0", available_version: version });
    assert.equal(panel._githubVersionStatus(repo), "unknown");
    assert.equal(panel._hacsBehind(repo), false);
    assert.ok(text(panel._renderRepositoryCard(repo)).includes("Versjoner ikke avklart"));
  });
}

test("unknown installed version never permits GitHub installation", () => {
  const { panel, repo } = setup("test/repo", "v2.0.0", { installed_version: "master", available_version: "1.0.0" });
  assert.equal(panel._githubVersionStatus(repo), "unknown");
});
test("uninstalled repository can offer a confirmed newer release", () => {
  const { panel, repo } = setup("test/repo", "v2.0.0", { installed: false, installed_version: undefined, available_version: "1.0.0" });
  assert.equal(panel._hacsBehind(repo), true);
});
test("failed refresh cannot turn cached data into an update offer", () => {
  const { panel, repo } = setup("test/repo", "v2.0.0", { installed_version: "1.0.0", available_version: "1.0.0" }, { error: "GitHub svarte 403" });
  assert.equal(panel._hacsBehind(repo), false);
});
test("no release means no GitHub offer", () => {
  const { panel, repo } = setup("test/repo", null);
  assert.equal(panel._hacsBehind(repo), false);
});
test("normal Marketplace update remains available", () => {
  const { panel, repo } = setup("test/repo", "v1.0.0", { installed_version: "1.0.0", available_version: "2.0.0", pending_upgrade: true });
  assert.equal(panel._hacsBehind(repo), false);
  const card = panel._renderRepositoryCard(repo);
  assert.ok(flatten(card).some((node) => node.dataset?.action === "install"));
});
test("semantic ordering, prereleases, prefixes and metadata", () => {
  const { panel } = setup("test/repo", "v1.0.0");
  for (const [left, right, expected] of [
    ["v1.0.0", "1.0.0", 0], [" V1.0.0 ", "1.0.0+build.9", 0],
    ["1.10.0", "1.9.0", 1], ["1.0.9", "1.0.10", -1],
    ["1.0.0", "1.0.0-rc.1", 1], ["1.0.0-rc.1", "1.0.0", -1],
    ["1.0.0-beta.11", "1.0.0-beta.2", 1], ["1.0.0-alpha", "1.0.0-beta", -1],
    ["1.0.0-alpha", "1.0.0-alpha.1", -1], ["1.0.0-1", "1.0.0-alpha", -1],
    ["1.0.0-rc.1+one", "1.0.0-rc.1+two", 0],
    ["01.0.0", "1.0.0", null], ["1.0.0-01", "1.0.0", null],
  ]) assert.equal(panel._compareVersions(left, right), expected, `${left} vs ${right}`);
});
test("stale GitHub button cannot reinstall, downgrade or request a different tag", async () => {
  const { panel, repo } = setup("test/repo", "v2.0.0", { installed_version: "1.0.0", available_version: "1.0.0" });
  const messages = [];
  panel._notify = (message) => messages.push(message);
  await panel._install(repo.id, "v1.0.0");
  repo.installed_version = "2.0.0";
  await panel._install(repo.id, "v2.0.0");
  assert.equal(messages.length, 2);
  assert.ok(messages.every((message) => message.startsWith("Ingen bekreftet nyere")));
  assert.equal(panel._busy.size, 0);
});
