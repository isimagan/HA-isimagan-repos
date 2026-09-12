const STYLE = `
  :host {
    display: block;
    min-height: 100%;
    color: var(--primary-text-color);
    background: var(--primary-background-color);
    font-family: var(--paper-font-body1_-_font-family, system-ui, sans-serif);
  }
  * { box-sizing: border-box; }
  .page { max-width: 1180px; margin: 0 auto; padding: 28px 20px 64px; }
  .hero { display: flex; gap: 24px; align-items: flex-start; justify-content: space-between; margin-bottom: 24px; }
  h1 { font-size: 32px; line-height: 1.15; margin: 0 0 8px; font-weight: 650; letter-spacing: -.02em; }
  h2 { margin: 0; font-size: 22px; }
  .muted { color: var(--secondary-text-color); }
  .summary { margin: 0; font-size: 15px; }
  .actions, .filters, .card-actions, .detail-actions { display: flex; flex-wrap: wrap; gap: 8px; }
  button, a.button {
    appearance: none; border: 0; border-radius: 10px; padding: 10px 14px;
    min-height: 40px; font: inherit; font-weight: 600; cursor: pointer;
    color: var(--primary-text-color); background: var(--secondary-background-color);
    text-decoration: none; display: inline-flex; gap: 7px; align-items: center; justify-content: center;
  }
  button.primary { color: var(--text-primary-color, #fff); background: var(--primary-color); }
  button.tonal { color: var(--primary-color); background: color-mix(in srgb, var(--primary-color) 14%, transparent); }
  button.ghost { background: transparent; }
  button:disabled { opacity: .55; cursor: wait; }
  .filters { margin: 0 0 18px; }
  .filters button { min-height: 34px; padding: 7px 12px; border-radius: 18px; font-size: 14px; }
  .filters button.active { background: var(--primary-color); color: var(--text-primary-color, #fff); }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 14px; }
  .repo-card {
    background: var(--card-background-color); border-radius: var(--ha-card-border-radius, 12px);
    border: 1px solid var(--divider-color); box-shadow: var(--ha-card-box-shadow, none);
    padding: 18px; display: flex; flex-direction: column; gap: 14px; min-height: 210px;
  }
  .repo-card.update { border-color: color-mix(in srgb, var(--warning-color, #ff9800) 70%, var(--divider-color)); }
  .repo-head { display: flex; gap: 12px; align-items: flex-start; cursor: pointer; }
  .repo-icon { width: 42px; height: 42px; border-radius: 11px; background: var(--secondary-background-color); display: grid; place-items: center; flex: 0 0 auto; }
  .repo-icon ha-icon { color: var(--primary-color); }
  .repo-name { font-size: 18px; font-weight: 650; line-height: 1.25; overflow-wrap: anywhere; }
  .repo-full-name { font-size: 13px; margin-top: 3px; overflow-wrap: anywhere; }
  .description { margin: 0; line-height: 1.45; flex: 1; }
  .badges { display: flex; flex-wrap: wrap; gap: 7px; }
  .badge { border-radius: 999px; padding: 5px 9px; font-size: 12px; font-weight: 650; background: var(--secondary-background-color); }
  .badge.good { color: var(--success-color, #2e7d32); background: color-mix(in srgb, var(--success-color, #2e7d32) 13%, transparent); }
  .badge.warn { color: var(--warning-color, #b26a00); background: color-mix(in srgb, var(--warning-color, #ff9800) 16%, transparent); }
  .badge.info { color: var(--info-color, var(--primary-color)); background: color-mix(in srgb, var(--primary-color) 13%, transparent); }
  .card-actions { padding-top: 2px; }
  .card-actions button { min-height: 34px; padding: 7px 10px; font-size: 13px; }
  .empty, .error { padding: 38px 24px; text-align: center; border: 1px dashed var(--divider-color); border-radius: 14px; background: var(--card-background-color); }
  .other-repositories { margin-top: 34px; }
  .other-repositories > p { margin: 7px 0 16px; }
  .other-list { overflow: hidden; background: var(--card-background-color); border: 1px solid var(--divider-color); border-radius: var(--ha-card-border-radius, 12px); }
  .other-header, .other-row { display: grid; grid-template-columns: minmax(180px, 1fr) minmax(140px, .65fr) minmax(220px, 1fr); gap: 18px; align-items: center; padding: 15px 17px; }
  .other-header { padding-top: 11px; padding-bottom: 11px; color: var(--secondary-text-color); background: var(--secondary-background-color); font-size: 12px; font-weight: 650; text-transform: uppercase; letter-spacing: .04em; }
  .other-row + .other-row { border-top: 1px solid var(--divider-color); }
  .other-main { flex: 1; min-width: 0; }
  .other-name { color: var(--primary-color); font-weight: 650; text-decoration: none; overflow-wrap: anywhere; }
  .other-name:hover { text-decoration: underline; }
  .other-detail { min-width: 0; line-height: 1.4; overflow-wrap: anywhere; }
  .other-detail.status { font-weight: 650; }
  .other-detail.hacs { color: var(--secondary-text-color); font-size: 14px; }
  .other-label { display: none; color: var(--secondary-text-color); font-size: 11px; font-weight: 650; letter-spacing: .04em; text-transform: uppercase; }
  .error ha-icon { color: var(--error-color); }
  .progress { height: 3px; overflow: hidden; background: var(--divider-color); margin: -10px 0 20px; border-radius: 3px; }
  .progress span { display: block; height: 100%; background: var(--primary-color); transition: width .2s ease; }
  .restart-banner { display: flex; gap: 16px; align-items: center; margin: 0 0 22px; padding: 16px 18px; color: var(--primary-text-color); background: color-mix(in srgb, var(--warning-color, #ff9800) 14%, var(--card-background-color)); border: 1px solid color-mix(in srgb, var(--warning-color, #ff9800) 55%, var(--divider-color)); border-radius: 12px; }
  .restart-banner > ha-icon { color: var(--warning-color, #ff9800); flex: 0 0 auto; }
  .restart-copy { flex: 1; min-width: 0; }
  .restart-copy strong { display: block; margin-bottom: 3px; }
  .restart-copy span { font-size: 14px; color: var(--secondary-text-color); }
  .restart-actions { display: flex; flex-wrap: wrap; gap: 8px; }
  .detail-top { display: flex; gap: 14px; align-items: center; margin-bottom: 20px; }
  .detail-title { flex: 1; min-width: 0; }
  .detail-title h1 { overflow-wrap: anywhere; }
  .detail-grid { display: grid; grid-template-columns: minmax(220px, 300px) minmax(0, 1fr); gap: 18px; align-items: start; }
  .info-card, .readme { background: var(--card-background-color); border: 1px solid var(--divider-color); border-radius: var(--ha-card-border-radius, 12px); padding: 20px; }
  .info-list { display: grid; grid-template-columns: auto 1fr; gap: 10px 14px; margin: 18px 0; font-size: 14px; }
  .info-list dt { color: var(--secondary-text-color); }
  .info-list dd { margin: 0; text-align: right; overflow-wrap: anywhere; }
  .readme { min-width: 0; overflow: hidden; }
  .readme ha-markdown { display: block; overflow-wrap: anywhere; }
  .spinner { width: 34px; height: 34px; border: 3px solid var(--divider-color); border-top-color: var(--primary-color); border-radius: 50%; animation: spin .8s linear infinite; margin: 60px auto; }
  .toast { position: fixed; left: 50%; bottom: 26px; transform: translateX(-50%); z-index: 10; color: var(--text-primary-color, #fff); background: var(--primary-text-color); border-radius: 9px; padding: 12px 18px; box-shadow: 0 5px 24px #0005; max-width: min(520px, calc(100vw - 32px)); }
  .scrim { position: fixed; inset: 0; z-index: 20; display: grid; place-items: center; padding: 20px; background: #0008; }
  .dialog { width: min(500px, 100%); max-height: calc(100vh - 40px); overflow: auto; background: var(--card-background-color); border-radius: 16px; box-shadow: 0 12px 48px #0007; padding: 24px; }
  .dialog h2 { margin-bottom: 8px; }
  .dialog p { margin: 0 0 20px; line-height: 1.45; }
  .field { display: grid; gap: 7px; margin: 0 0 16px; font-size: 14px; font-weight: 600; }
  .field input, .field select { width: 100%; min-height: 46px; padding: 10px 12px; color: var(--primary-text-color); background: var(--primary-background-color); border: 1px solid var(--divider-color); border-radius: 9px; font: inherit; }
  .checkbox { display: flex; gap: 10px; align-items: center; margin: 2px 0 18px; font-size: 14px; }
  .checkbox input { width: 18px; height: 18px; accent-color: var(--primary-color); }
  .form-error { color: var(--error-color); background: color-mix(in srgb, var(--error-color) 12%, transparent); border-radius: 8px; padding: 10px 12px; margin: 0 0 16px; font-size: 14px; }
  .dialog-actions { display: flex; justify-content: flex-end; gap: 8px; }
  @keyframes spin { to { transform: rotate(360deg); } }
  @media (max-width: 760px) {
    .page { padding: 20px 12px 54px; }
    .hero { display: block; }
    .hero .actions { margin-top: 16px; }
    .grid { grid-template-columns: 1fr; }
    .detail-grid { grid-template-columns: 1fr; }
    .detail-top { align-items: flex-start; }
    .restart-banner { align-items: flex-start; flex-wrap: wrap; }
    .restart-actions { width: 100%; }
    .other-header { display: none; }
    .other-row { grid-template-columns: 1fr; gap: 10px; align-items: start; }
    .other-label { display: block; margin-bottom: 2px; }
  }
`;

const CATEGORY_NAMES = {
  integration: "Integrasjon",
  plugin: "Dashboard",
  theme: "Theme",
  template: "Template",
  python_script: "Python-skript",
  appdaemon: "AppDaemon",
};

class MineRepositoriesPanel extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._hass = undefined;
    this._panel = undefined;
    this._repositories = [];
    this._allRepositories = [];
    this._github = new Map();
    this._githubRepositories = [];
    this._githubRepositoriesLoaded = false;
    this._githubRepositoriesError = undefined;
    this._githubRepositoriesFetchedAt = 0;
    this._githubRepositoryContents = new Map();
    this._entityByRepository = new Map();
    this._checkedAt = new Map();
    this._filter = "all";
    this._selected = undefined;
    this._detail = undefined;
    this._loading = true;
    this._busy = new Set();
    this._error = undefined;
    this._toast = undefined;
    this._refreshProgress = undefined;
    this._restartIssues = [];
    this._restartBusy = false;
    this._showRestartConfirm = false;
    this._showAdd = false;
    this._addBusy = false;
    this._addError = undefined;
    this._addDraft = undefined;
  }

  set hass(value) {
    const first = !this._hass;
    this._hass = value;
    if (first && this.isConnected) this._load();
  }

  get hass() { return this._hass; }

  set panel(value) {
    this._panel = value;
    if (this.isConnected) this._render();
  }

  set route(value) { this._route = value; }

  connectedCallback() {
    this._render();
    if (this._hass) this._load();
  }

  get _config() {
    return this._panel?.config || this._panel || {};
  }

  async _load({ refreshGithub = false } = {}) {
    if (!this._hass) return;
    this._loading = this._repositories.length === 0;
    this._error = undefined;
    this._render();
    try {
      const [repositories, registry, repairs] = await Promise.all([
        this._hass.connection.sendMessagePromise({ type: "hacs/repositories/list" }),
        this._hass.callWS({ type: "config/entity_registry/list" }).catch(() => []),
        this._hass.connection.sendMessagePromise({ type: "repairs/list_issues" }).catch(() => ({ issues: [] })),
      ]);
      const owner = String(this._config.owner || "isimagan").toLowerCase();
      this._allRepositories = repositories;
      this._repositories = repositories
        .filter((repo) => String(repo.full_name || "").split("/")[0].toLowerCase() === owner)
        .sort((a, b) => Number(b.pending_upgrade) - Number(a.pending_upgrade) || a.name.localeCompare(b.name, "nb"));
      this._entityByRepository = new Map(
        registry
          .filter((entry) => entry.platform === "hacs" && entry.entity_id?.startsWith("update."))
          .map((entry) => [String(entry.unique_id), entry.entity_id]),
      );
      this._restartIssues = (repairs.issues || []).filter((issue) => this._isRestartRequiredIssue(issue));
      this._loading = false;
      this._render();
      await this._loadGithubData(refreshGithub);
    } catch (error) {
      this._loading = false;
      this._error = this._friendlyError(error);
      this._render();
    }
  }

  async _loadGithubData(force = false) {
    await this._loadGithubRepositories(force);
    await Promise.all([
      this._loadGithubRepositoryContents(force),
      this._loadGithubReleases(force),
    ]);
  }

  async _loadGithubRepositories(force = false) {
    const now = Date.now();
    if (!force && this._githubRepositoriesLoaded && now - this._githubRepositoriesFetchedAt < 10 * 60 * 1000) return;
    const owner = String(this._config.owner || "isimagan");
    try {
      const response = await fetch(`https://api.github.com/users/${encodeURIComponent(owner)}/repos?per_page=100&type=owner&sort=updated`, {
        headers: {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
      });
      if (!response.ok) throw new Error(`GitHub svarte ${response.status}`);
      this._githubRepositories = await response.json();
      this._githubRepositoriesError = undefined;
    } catch (error) {
      this._githubRepositoriesError = this._friendlyError(error);
    } finally {
      this._githubRepositoriesLoaded = true;
      this._githubRepositoriesFetchedAt = now;
      this._render();
    }
  }

  async _loadGithubRepositoryContents(force = false) {
    const now = Date.now();
    const repositories = this._otherRepositories().filter((repo) => Number(repo.size) > 0 && !repo.name.toLowerCase().endsWith(".github.io"));
    await Promise.allSettled(repositories.map(async (repo) => {
      const key = String(repo.full_name).toLowerCase();
      const cached = this._githubRepositoryContents.get(key);
      if (!force && cached && now - cached.fetchedAt < 10 * 60 * 1000) return;
      try {
        const path = encodeURIComponent(repo.full_name).replace("%2F", "/");
        const response = await fetch(`https://api.github.com/repos/${path}/contents`, {
          headers: {
            Accept: "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
          },
        });
        if (!response.ok) throw new Error(`GitHub svarte ${response.status}`);
        const contents = await response.json();
        this._githubRepositoryContents.set(key, {
          names: Array.isArray(contents) ? contents.map((entry) => String(entry.name).toLowerCase()) : [],
          fetchedAt: now,
        });
      } catch (error) {
        this._githubRepositoryContents.set(key, { error: this._friendlyError(error), fetchedAt: now });
      }
    }));
    this._render();
  }

  async _loadGithubReleases(force = false) {
    const now = Date.now();
    const repositories = new Map();
    [...this._repositories, ...this._githubRepositories].forEach((repo) => repositories.set(String(repo.full_name).toLowerCase(), repo));
    await Promise.allSettled([...repositories.values()].map(async (repo) => {
      const cached = this._github.get(repo.full_name);
      if (!force && cached && now - cached.fetchedAt < 10 * 60 * 1000) return;
      try {
        const response = await fetch(`https://api.github.com/repos/${encodeURIComponent(repo.full_name).replace("%2F", "/")}/releases/latest`, {
          headers: { Accept: "application/vnd.github+json" },
        });
        if (response.status === 404) {
          this._github.set(repo.full_name, { tag: null, fetchedAt: now });
          return;
        }
        if (!response.ok) throw new Error(`GitHub svarte ${response.status}`);
        const release = await response.json();
        this._github.set(repo.full_name, {
          tag: release.tag_name,
          url: release.html_url,
          publishedAt: release.published_at,
          fetchedAt: now,
        });
      } catch (error) {
        this._github.set(repo.full_name, { error: this._friendlyError(error), fetchedAt: now });
      }
    }));
    this._render();
  }

  async _openDetail(id) {
    this._selected = String(id);
    this._detail = undefined;
    this._render();
    try {
      this._detail = await this._hass.connection.sendMessagePromise({
        type: "hacs/repository/info",
        repository_id: this._selected,
      });
    } catch (error) {
      this._selected = undefined;
      this._notify(this._friendlyError(error));
    }
    this._render();
  }

  async _refreshOne(id) {
    const key = String(id);
    const fullName = this._repositories.find((repo) => String(repo.id) === key)?.full_name || this._detail?.full_name;
    this._busy.add(key);
    this._render();
    try {
      await this._hass.connection.sendMessagePromise({ type: "hacs/repository/refresh", repository: key });
      this._checkedAt.set(key, new Date());
      if (fullName) this._github.delete(fullName);
      await this._load();
      if (this._selected === key) await this._openDetail(key);
      this._notify("Repository-informasjonen er oppdatert.");
    } catch (error) {
      this._notify(`Kunne ikke oppdatere informasjon: ${this._friendlyError(error)}`);
    } finally {
      this._busy.delete(key);
      this._render();
    }
  }

  async _refreshAll() {
    if (this._busy.has("all")) return;
    this._busy.add("all");
    let completed = 0;
    this._refreshProgress = { completed, total: this._repositories.length };
    this._render();
    try {
      for (const repo of this._repositories) {
        await this._hass.connection.sendMessagePromise({ type: "hacs/repository/refresh", repository: String(repo.id) });
        this._checkedAt.set(String(repo.id), new Date());
        completed += 1;
        this._refreshProgress = { completed, total: this._repositories.length };
        this._render();
      }
      await this._load({ refreshGithub: true });
      this._notify(`Oppdaterte informasjon for ${completed} repo${completed === 1 ? "" : "er"}.`);
    } catch (error) {
      this._notify(`Oppdateringen stoppet: ${this._friendlyError(error)}`);
    } finally {
      this._busy.delete("all");
      this._refreshProgress = undefined;
      this._render();
    }
  }

  async _install(id, version) {
    const repo = this._repositories.find((item) => String(item.id) === String(id)) || this._detail;
    if (!repo) return;
    const key = String(repo.id);
    this._busy.add(key);
    this._render();
    try {
      const entityId = this._entityByRepository.get(key);
      if (version) {
        await this._hass.connection.sendMessagePromise({
          type: "hacs/repository/download",
          repository: key,
          version,
        });
      } else if (repo.installed && entityId) {
        await this._hass.callService("update", "install", {}, { entity_id: entityId });
      } else {
        await this._hass.connection.sendMessagePromise({
          type: "hacs/repository/download",
          repository: key,
          version: repo.available_version || undefined,
        });
      }
      this._notify(version
        ? `GitHub-versjon ${version} er lastet ned gjennom HACS.`
        : repo.installed ? "Oppdateringen er lastet ned." : "Repository er installert.");
      await this._load();
      if (this._selected === key) await this._openDetail(key);
    } catch (error) {
      this._notify(`Handlingen mislyktes: ${this._friendlyError(error)}`);
    } finally {
      this._busy.delete(key);
      this._render();
    }
  }

  _normalizeRepository(value) {
    const input = String(value || "").trim();
    let repository = input;
    if (/^https?:\/\//i.test(input)) {
      try {
        const url = new URL(input);
        if (!["github.com", "www.github.com"].includes(url.hostname.toLowerCase())) return undefined;
        const segments = url.pathname.split("/").filter(Boolean);
        if (segments.length < 2) return undefined;
        repository = `${segments[0]}/${segments[1]}`;
      } catch {
        return undefined;
      }
    }
    repository = repository.replace(/^https?:\/\/(?:www\.)?github\.com\//i, "");
    repository = repository.replace(/^github\.com\//i, "");
    repository = repository.replace(/\.git\/?$/i, "").replace(/\/$/, "");
    if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repository)) return undefined;
    return repository;
  }

  async _waitForRepository(fullName) {
    for (let attempt = 0; attempt < 6; attempt += 1) {
      const repositories = await this._hass.connection.sendMessagePromise({ type: "hacs/repositories/list" });
      const match = repositories.find((repo) => String(repo.full_name).toLowerCase() === fullName.toLowerCase());
      if (match) return match;
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    return undefined;
  }

  async _addRepository(form) {
    if (this._addBusy) return;
    const data = new FormData(form);
    const fullName = this._normalizeRepository(data.get("repository"));
    const category = String(data.get("category") || "integration");
    const install = data.get("install") === "on";
    const configuredOwner = String(this._config.owner || "isimagan");
    this._addDraft = { repository: String(data.get("repository") || ""), category, install };
    this._addError = undefined;

    if (!fullName) {
      this._addError = "Lim inn en full GitHub-adresse, for eksempel https://github.com/eier/repo.";
      this._render();
      return;
    }
    if (fullName.split("/")[0].toLowerCase() !== configuredOwner.toLowerCase()) {
      this._addError = `Dette panelet viser bare repoer fra ${configuredOwner}.`;
      this._render();
      return;
    }

    this._addBusy = true;
    this._render();
    try {
      let repository = this._allRepositories.find((repo) => String(repo.full_name).toLowerCase() === fullName.toLowerCase());
      const wasExisting = Boolean(repository);
      if (!repository) {
        await this._hass.connection.sendMessagePromise({
          type: "hacs/repositories/add",
          repository: fullName,
          category,
        });
        repository = await this._waitForRepository(fullName);
        if (!repository) {
          throw new Error("HACS registrerte ikke repoet. Kontroller URL, repository-type og HACS-loggen.");
        }
      }

      if (install && !repository.installed) {
        if (!repository.can_download) {
          throw new Error("HACS registrerte repoet, men det kan ikke lastes ned ennå.");
        }
        await this._hass.connection.sendMessagePromise({
          type: "hacs/repository/download",
          repository: String(repository.id),
        });
      }

      this._showAdd = false;
      this._addDraft = undefined;
      await this._load({ refreshGithub: true });
      this._notify(
        install && !repository.installed
          ? `${fullName} er lagt til og installert.`
          : wasExisting
            ? `${fullName} finnes allerede i HACS.`
            : `${fullName} er lagt til i HACS.`,
      );
    } catch (error) {
      this._addError = this._friendlyError(error);
    } finally {
      this._addBusy = false;
      this._render();
    }
  }

  _isRestartRequiredIssue(issue) {
    if (issue.ignored) return false;
    const fields = [issue.issue_id, issue.translation_key]
      .filter(Boolean)
      .map((value) => String(value).toLowerCase());
    return fields.some((value) => /(?:^|[_-])restart[_-]?required(?:[_-]|$)/.test(value)
      || /(?:^|[_-])required[_-]?restart(?:[_-]|$)/.test(value)
      || /(?:^|[_-])home[_-]?assistant[_-]?restart(?:[_-]|$)/.test(value));
  }

  async _restartHomeAssistant() {
    if (this._restartBusy) return;
    this._restartBusy = true;
    this._render();
    try {
      await this._hass.callService("homeassistant", "restart");
      this._showRestartConfirm = false;
      this._notify("Omstart av Home Assistant er startet.");
    } catch (error) {
      this._notify(`Kunne ikke starte Home Assistant på nytt: ${this._friendlyError(error)}`);
    } finally {
      this._restartBusy = false;
      this._render();
    }
  }

  _navigateRepairs() {
    history.pushState(null, "", "/config/repairs");
    window.dispatchEvent(new CustomEvent("location-changed"));
  }

  _navigateHacs(id) {
    history.pushState(null, "", `/hacs/repository/${id}`);
    window.dispatchEvent(new CustomEvent("location-changed"));
  }

  _notify(message) {
    this._toast = message;
    this._render();
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => { this._toast = undefined; this._render(); }, 4200);
  }

  _friendlyError(error) {
    const text = error?.message || error?.body?.message || String(error || "Ukjent feil");
    if (text.includes("Unknown command") && text.includes("hacs/")) {
      return "HACS er ikke startet eller er for gammel. Kontroller HACS og start Home Assistant på nytt.";
    }
    return text;
  }

  _filteredRepositories() {
    if (this._filter === "updates") return this._repositories.filter((repo) => repo.pending_upgrade || this._hacsBehind(repo));
    if (this._filter === "integration") return this._repositories.filter((repo) => repo.category === "integration");
    if (this._filter === "plugin") return this._repositories.filter((repo) => repo.category === "plugin");
    return this._repositories;
  }

  _hacsBehind(repo) {
    const github = this._github.get(repo.full_name);
    if (!github?.tag || !repo.available_version) return false;
    return this._normalVersion(github.tag) !== this._normalVersion(repo.available_version);
  }

  _normalVersion(version) { return String(version || "").trim().replace(/^v/i, ""); }

  _formatTime(date) {
    if (!date) return "Ikke sjekket i denne økten";
    return new Intl.DateTimeFormat("nb-NO", { hour: "2-digit", minute: "2-digit" }).format(date);
  }

  _otherRepositories() {
    const boxed = new Set(this._repositories.map((repo) => String(repo.full_name).toLowerCase()));
    return this._githubRepositories
      .filter((repo) => !boxed.has(String(repo.full_name).toLowerCase()))
      .sort((a, b) => String(a.name).localeCompare(String(b.name), "nb"));
  }

  _otherRepositoryStatus(repo) {
    if (repo.name.toLowerCase().endsWith(".github.io")) return { status: "Nettside", hacs: "Ikke relevant for HACS." };
    if (repo.archived) return { status: "Arkivert", hacs: "Ikke aktivt vedlikeholdt." };
    if (repo.disabled) return { status: "Deaktivert", hacs: "Ikke tilgjengelig for HACS." };
    if (Number(repo.size) === 0) return { status: "Tomt repo", hacs: "Ikke en HACS-pakke ennå." };

    const contents = this._githubRepositoryContents.get(String(repo.full_name).toLowerCase());
    const names = contents?.names || [];
    const hasPlan = names.some((name) => /^plan(?:\.|$)/.test(name));
    const hasReadme = names.some((name) => /^readme(?:\.|$)/.test(name));
    const hasHacs = names.includes("hacs.json");
    if (hasPlan && hasReadme && !hasHacs) return { status: "README og plan", hacs: "Ikke en ferdig HACS-pakke ennå." };
    if (hasPlan && !hasHacs) return { status: "Bare planfil", hacs: "Ikke en HACS-pakke ennå." };

    const release = this._github.get(repo.full_name);
    if (hasHacs && release?.tag) return { status: `Release ${release.tag}`, hacs: "HACS-metadata og publisert release." };
    if (hasHacs) return { status: "HACS-metadata", hacs: "Ingen publisert release." };
    if (release?.tag) return { status: `Release ${release.tag}`, hacs: "Ingen HACS-metadata funnet." };
    return { status: "Innhold finnes", hacs: "Ingen HACS-metadata funnet." };
  }

  _icon(category) {
    return category === "plugin" ? "mdi:view-dashboard-outline" : category === "theme" ? "mdi:palette-outline" : "mdi:puzzle-outline";
  }

  _button(label, action, options = {}) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = label;
    button.dataset.action = action;
    if (options.id !== undefined) button.dataset.id = options.id;
    if (options.version !== undefined) button.dataset.version = options.version;
    if (options.className) button.className = options.className;
    button.disabled = Boolean(options.disabled);
    return button;
  }

  _badge(text, type = "") {
    const span = document.createElement("span");
    span.className = `badge ${type}`;
    span.textContent = text;
    return span;
  }

  _render() {
    if (!this.shadowRoot) return;
    this.shadowRoot.innerHTML = `<style>${STYLE}</style>`;
    const page = document.createElement("main");
    page.className = "page";
    if (this._loading) {
      page.innerHTML = '<div class="spinner" aria-label="Laster"></div>';
    } else {
      if (this._restartIssues.length) page.append(this._renderRestartBanner());
      if (this._selected) this._renderDetail(page);
      else this._renderOverview(page);
    }
    if (this._toast) {
      const toast = document.createElement("div");
      toast.className = "toast";
      toast.setAttribute("role", "status");
      toast.textContent = this._toast;
      page.append(toast);
    }
    if (this._showAdd) page.append(this._renderAddDialog());
    if (this._showRestartConfirm) page.append(this._renderRestartDialog());
    page.addEventListener("click", (event) => this._handleClick(event));
    page.addEventListener("submit", (event) => {
      if (event.target.matches("form[data-add-repository]")) {
        event.preventDefault();
        this._addRepository(event.target);
      }
    });
    this.shadowRoot.append(page);
  }

  _renderOverview(page) {
    const updates = this._repositories.filter((repo) => repo.pending_upgrade || this._hacsBehind(repo)).length;
    const installed = this._repositories.filter((repo) => repo.installed).length;
    const hero = document.createElement("section");
    hero.className = "hero";
    const intro = document.createElement("div");
    const title = document.createElement("h1");
    title.textContent = this._config.title || "Mine repoer";
    const summary = document.createElement("p");
    summary.className = "summary muted";
    summary.textContent = `${installed} installert · ${updates} ${updates === 1 ? "oppdatering" : "oppdateringer"} · GitHub: ${this._config.owner || "isimagan"}`;
    intro.append(title, summary);
    const actions = document.createElement("div");
    actions.className = "actions";
    actions.append(this._button("Legg til repo", "show-add", { className: "tonal" }));
    actions.append(this._button(this._busy.has("all") ? "Oppdaterer …" : "Oppdater informasjon for alle", "refresh-all", { className: "primary", disabled: this._busy.has("all") || !this._repositories.length }));
    hero.append(intro, actions);
    page.append(hero);

    if (this._refreshProgress) {
      const progress = document.createElement("div");
      progress.className = "progress";
      const bar = document.createElement("span");
      bar.style.width = `${this._refreshProgress.total ? (this._refreshProgress.completed / this._refreshProgress.total) * 100 : 0}%`;
      progress.append(bar);
      page.append(progress);
    }

    if (this._error) {
      const error = document.createElement("div");
      error.className = "error";
      error.textContent = this._error;
      error.append(document.createElement("br"), this._button("Prøv igjen", "reload", { className: "tonal" }));
      page.append(error);
      return;
    }

    const filters = document.createElement("nav");
    filters.className = "filters";
    for (const [key, label] of [["all", "Alle"], ["updates", "Oppdateringer"], ["integration", "Integrasjoner"], ["plugin", "Dashboard"]]) {
      filters.append(this._button(label, "filter", { id: key, className: this._filter === key ? "active" : "" }));
    }
    page.append(filters);

    const repositories = this._filteredRepositories();
    if (!repositories.length) {
      const empty = document.createElement("div");
      empty.className = "empty";
      empty.textContent = this._repositories.length
        ? "Ingen repoer passer dette filteret."
        : `HACS kjenner ikke til noen repoer fra ${this._config.owner || "isimagan"} ennå.`;
      page.append(empty);
    } else {
      const grid = document.createElement("section");
      grid.className = "grid";
      repositories.forEach((repo) => grid.append(this._renderRepositoryCard(repo)));
      page.append(grid);
    }
    page.append(this._renderOtherRepositories());
  }

  _renderOtherRepositories() {
    const section = document.createElement("section");
    section.className = "other-repositories";
    const title = document.createElement("h2");
    title.textContent = "Andre repoer";
    const description = document.createElement("p");
    description.className = "muted";
    description.textContent = "GitHub-repoer som ikke vises i HACS-boksene over.";
    section.append(title, description);

    if (!this._githubRepositoriesLoaded) {
      const loading = document.createElement("div");
      loading.className = "empty muted";
      loading.textContent = "Laster repoer fra GitHub …";
      section.append(loading);
      return section;
    }
    if (this._githubRepositoriesError) {
      const error = document.createElement("div");
      error.className = "error";
      error.textContent = `Kunne ikke hente andre repoer: ${this._githubRepositoriesError}`;
      section.append(error);
      return section;
    }

    const repositories = this._otherRepositories();
    if (!repositories.length) {
      const empty = document.createElement("div");
      empty.className = "empty muted";
      empty.textContent = "Ingen andre offentlige repoer funnet.";
      section.append(empty);
      return section;
    }

    const list = document.createElement("div");
    list.className = "other-list";
    const header = document.createElement("div");
    header.className = "other-header";
    for (const label of ["Repo", "Status", "HACS"]) {
      const cell = document.createElement("span");
      cell.textContent = label;
      header.append(cell);
    }
    list.append(header);
    for (const repo of repositories) {
      const row = document.createElement("article");
      row.className = "other-row";
      const main = document.createElement("div");
      main.className = "other-main";
      const link = document.createElement("a");
      link.className = "other-name";
      link.href = repo.html_url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = repo.name;
      main.append(link);

      const details = this._otherRepositoryStatus(repo);
      const status = document.createElement("div");
      status.className = "other-detail status";
      const statusLabel = document.createElement("span");
      statusLabel.className = "other-label";
      statusLabel.textContent = "Status";
      status.append(statusLabel, document.createTextNode(details.status));
      const hacs = document.createElement("div");
      hacs.className = "other-detail hacs";
      const hacsLabel = document.createElement("span");
      hacsLabel.className = "other-label";
      hacsLabel.textContent = "HACS";
      hacs.append(hacsLabel, document.createTextNode(details.hacs));
      row.append(main, status, hacs);
      list.append(row);
    }
    section.append(list);
    return section;
  }

  _renderRestartBanner() {
    const banner = document.createElement("section");
    banner.className = "restart-banner";
    const icon = document.createElement("ha-icon");
    icon.setAttribute("icon", "mdi:restart-alert");
    const copy = document.createElement("div");
    copy.className = "restart-copy";
    const title = document.createElement("strong");
    title.textContent = "Home Assistant må startes på nytt";
    const detail = document.createElement("span");
    detail.textContent = `${this._restartIssues.length} aktiv ${this._restartIssues.length === 1 ? "reparasjon krever" : "reparasjoner krever"} omstart.`;
    copy.append(title, detail);
    const actions = document.createElement("div");
    actions.className = "restart-actions";
    actions.append(this._button("Se reparasjoner", "repairs"));
    actions.append(this._button("Start på nytt", "show-restart", { className: "primary" }));
    banner.append(icon, copy, actions);
    return banner;
  }

  _renderRepositoryCard(repo) {
    const behind = this._hacsBehind(repo);
    const github = this._github.get(repo.full_name);
    const card = document.createElement("article");
    card.className = `repo-card${repo.pending_upgrade || behind ? " update" : ""}`;
    const head = document.createElement("div");
    head.className = "repo-head";
    head.dataset.action = "detail";
    head.dataset.id = repo.id;
    const iconWrap = document.createElement("div");
    iconWrap.className = "repo-icon";
    const icon = document.createElement("ha-icon");
    icon.setAttribute("icon", this._icon(repo.category));
    iconWrap.append(icon);
    const names = document.createElement("div");
    const name = document.createElement("div");
    name.className = "repo-name";
    name.textContent = repo.name;
    const full = document.createElement("div");
    full.className = "repo-full-name muted";
    full.textContent = repo.full_name;
    names.append(name, full);
    head.append(iconWrap, names);

    const description = document.createElement("p");
    description.className = "description muted";
    description.textContent = repo.description || "Ingen beskrivelse.";
    const badges = document.createElement("div");
    badges.className = "badges";
    badges.append(this._badge(CATEGORY_NAMES[repo.category] || repo.category));
    if (repo.pending_upgrade) badges.append(this._badge(`${repo.installed_version} → ${repo.available_version}`, "warn"));
    else if (repo.installed) badges.append(this._badge(`Installert ${repo.installed_version}`, "good"));
    else badges.append(this._badge("Ikke installert"));
    if (behind) badges.append(this._badge(`GitHub ${github.tag} · HACS mangler release`, "warn"));
    else if (github?.tag) badges.append(this._badge(`GitHub ${github.tag}`, "info"));

    const lastChecked = document.createElement("div");
    lastChecked.className = "muted";
    lastChecked.style.fontSize = "12px";
    lastChecked.textContent = `Sist sjekket: ${this._formatTime(this._checkedAt.get(String(repo.id)))}`;
    const actions = document.createElement("div");
    actions.className = "card-actions";
    actions.append(this._button("Detaljer", "detail", { id: repo.id }));
    actions.append(this._button("Oppdater info", "refresh", { id: repo.id, disabled: this._busy.has(String(repo.id)) || this._busy.has("all") }));
    if (repo.pending_upgrade || !repo.installed) {
      actions.append(this._button(repo.installed ? "Oppdater" : "Installer", "install", { id: repo.id, className: "tonal", disabled: this._busy.has(String(repo.id)) }));
    }
    if (behind) {
      actions.append(this._button(`Installer GitHub ${github.tag}`, "install-github", { id: repo.id, version: github.tag, className: "tonal", disabled: this._busy.has(String(repo.id)) }));
    }
    card.append(head, description, badges, lastChecked, actions);
    return card;
  }

  _renderDetail(page) {
    const repo = this._detail;
    const top = document.createElement("section");
    top.className = "detail-top";
    top.append(this._button("← Tilbake", "back", { className: "ghost" }));
    const titleWrap = document.createElement("div");
    titleWrap.className = "detail-title";
    const title = document.createElement("h1");
    title.textContent = repo?.name || "Laster repository …";
    titleWrap.append(title);
    if (repo) {
      const full = document.createElement("div");
      full.className = "muted";
      full.textContent = repo.full_name;
      titleWrap.append(full);
    }
    top.append(titleWrap);
    page.append(top);
    if (!repo) {
      const spinner = document.createElement("div"); spinner.className = "spinner"; page.append(spinner); return;
    }

    const grid = document.createElement("section");
    grid.className = "detail-grid";
    const info = document.createElement("aside");
    info.className = "info-card";
    const status = document.createElement("div"); status.className = "badges";
    status.append(this._badge(CATEGORY_NAMES[repo.category] || repo.category));
    status.append(this._badge(repo.pending_upgrade ? "Oppdatering tilgjengelig" : repo.installed ? "Oppdatert" : "Ikke installert", repo.pending_upgrade ? "warn" : repo.installed ? "good" : ""));
    if (this._hacsBehind(repo)) status.append(this._badge("HACS ligger bak GitHub", "warn"));
    const dl = document.createElement("dl");
    dl.className = "info-list";
    const rows = [
      ["Installert", repo.installed_version || "–"],
      ["HACS", repo.available_version || "–"],
      ["GitHub", this._github.get(repo.full_name)?.tag || "Ingen release"],
      ["Gren", repo.default_branch || "–"],
      ["Sist sjekket", this._formatTime(this._checkedAt.get(String(repo.id)))],
    ];
    for (const [key, value] of rows) {
      const dt = document.createElement("dt"); dt.textContent = key;
      const dd = document.createElement("dd"); dd.textContent = value;
      dl.append(dt, dd);
    }
    const actions = document.createElement("div");
    actions.className = "detail-actions";
    actions.append(this._button("Oppdater informasjon", "refresh", { id: repo.id, className: "primary", disabled: this._busy.has(String(repo.id)) }));
    if (repo.pending_upgrade || !repo.installed) actions.append(this._button(repo.installed ? "Oppdater" : "Installer", "install", { id: repo.id, className: "tonal", disabled: this._busy.has(String(repo.id)) }));
    const github = this._github.get(repo.full_name);
    if (this._hacsBehind(repo)) actions.append(this._button(`Installer GitHub ${github.tag}`, "install-github", { id: repo.id, version: github.tag, className: "tonal", disabled: this._busy.has(String(repo.id)) }));
    actions.append(this._button("Åpne i HACS", "hacs", { id: repo.id }));
    const githubLink = document.createElement("a");
    githubLink.className = "button";
    githubLink.href = `https://github.com/${repo.full_name}`;
    githubLink.target = "_blank";
    githubLink.rel = "noopener noreferrer";
    githubLink.textContent = "Åpne på GitHub";
    actions.append(githubLink);
    info.append(status, dl, actions);

    const readme = document.createElement("article");
    readme.className = "readme";
    const heading = document.createElement("h2"); heading.textContent = "README";
    const markdown = document.createElement("ha-markdown");
    markdown.content = repo.additional_info || "_Dette repositoryet har ingen README som HACS kan vise._";
    markdown.breaks = true;
    readme.append(heading, markdown);
    grid.append(info, readme);
    page.append(grid);
  }

  _renderAddDialog() {
    const scrim = document.createElement("div");
    scrim.className = "scrim";
    scrim.addEventListener("click", (event) => {
      if (event.target === scrim && !this._addBusy) {
        this._showAdd = false;
        this._addError = undefined;
        this._addDraft = undefined;
        this._render();
      }
    });
    const dialog = document.createElement("section");
    dialog.className = "dialog";
    dialog.setAttribute("role", "dialog");
    dialog.setAttribute("aria-modal", "true");
    dialog.setAttribute("aria-labelledby", "add-repository-title");
    const title = document.createElement("h2");
    title.id = "add-repository-title";
    title.textContent = "Legg til repo i HACS";
    const description = document.createElement("p");
    description.className = "muted";
    description.textContent = `Registrer et tilpasset repo fra ${this._config.owner || "isimagan"}, og installer det med én gang hvis du ønsker.`;
    const form = document.createElement("form");
    form.dataset.addRepository = "";

    const repoLabel = document.createElement("label");
    repoLabel.className = "field";
    repoLabel.textContent = "Full GitHub-adresse";
    const repoInput = document.createElement("input");
    repoInput.type = "url";
    repoInput.name = "repository";
    repoInput.required = true;
    repoInput.autocomplete = "off";
    repoInput.placeholder = `https://github.com/${this._config.owner || "isimagan"}/repo-navn`;
    repoInput.value = this._addDraft?.repository || "";
    repoLabel.append(repoInput);

    const categoryLabel = document.createElement("label");
    categoryLabel.className = "field";
    categoryLabel.textContent = "Repository-type";
    const select = document.createElement("select");
    select.name = "category";
    for (const [value, label] of [["theme", "Theme"], ["template", "Template"], ["integration", "Integrasjon"], ["plugin", "Dashboard"]]) {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = label;
      option.selected = (this._addDraft?.category || "integration") === value;
      select.append(option);
    }
    categoryLabel.append(select);

    const installLabel = document.createElement("label");
    installLabel.className = "checkbox";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "install";
    checkbox.checked = this._addDraft?.install ?? true;
    const checkboxText = document.createElement("span");
    checkboxText.textContent = "Installer repoet etter registrering";
    installLabel.append(checkbox, checkboxText);

    form.append(repoLabel, categoryLabel, installLabel);
    if (this._addError) {
      const error = document.createElement("div");
      error.className = "form-error";
      error.setAttribute("role", "alert");
      error.textContent = this._addError;
      form.append(error);
    }
    const actions = document.createElement("div");
    actions.className = "dialog-actions";
    actions.append(this._button("Avbryt", "dismiss-add", { disabled: this._addBusy }));
    const submit = document.createElement("button");
    submit.type = "submit";
    submit.className = "primary";
    submit.disabled = this._addBusy;
    submit.textContent = this._addBusy ? "Arbeider …" : "Legg til";
    actions.append(submit);
    form.append(actions);
    dialog.append(title, description, form);
    scrim.append(dialog);
    queueMicrotask(() => repoInput.focus());
    return scrim;
  }

  _renderRestartDialog() {
    const scrim = document.createElement("div");
    scrim.className = "scrim";
    scrim.addEventListener("click", (event) => {
      if (event.target === scrim && !this._restartBusy) {
        this._showRestartConfirm = false;
        this._render();
      }
    });
    const dialog = document.createElement("section");
    dialog.className = "dialog";
    dialog.setAttribute("role", "alertdialog");
    dialog.setAttribute("aria-modal", "true");
    dialog.setAttribute("aria-labelledby", "restart-title");
    const title = document.createElement("h2");
    title.id = "restart-title";
    title.textContent = "Starte Home Assistant på nytt?";
    const description = document.createElement("p");
    description.textContent = "Home Assistant vil være utilgjengelig en kort stund. Automatiseringer og tilkoblinger kan bli midlertidig avbrutt.";
    const actions = document.createElement("div");
    actions.className = "dialog-actions";
    actions.append(this._button("Avbryt", "dismiss-restart", { disabled: this._restartBusy }));
    actions.append(this._button(this._restartBusy ? "Starter på nytt …" : "Start på nytt", "restart", { className: "primary", disabled: this._restartBusy }));
    dialog.append(title, description, actions);
    scrim.append(dialog);
    return scrim;
  }

  _handleClick(event) {
    const target = event.target.closest("[data-action]");
    if (!target) return;
    const { action, id, version } = target.dataset;
    if (action === "detail") this._openDetail(id);
    else if (action === "refresh") this._refreshOne(id);
    else if (action === "refresh-all") this._refreshAll();
    else if (action === "install") this._install(id);
    else if (action === "install-github") this._install(id, version);
    else if (action === "hacs") this._navigateHacs(id);
    else if (action === "repairs") this._navigateRepairs();
    else if (action === "show-restart") { this._showRestartConfirm = true; this._render(); }
    else if (action === "dismiss-restart" && !this._restartBusy) { this._showRestartConfirm = false; this._render(); }
    else if (action === "restart") this._restartHomeAssistant();
    else if (action === "reload") this._load();
    else if (action === "show-add") { this._showAdd = true; this._addError = undefined; this._addDraft = undefined; this._render(); }
    else if (action === "dismiss-add" && !this._addBusy) { this._showAdd = false; this._addError = undefined; this._addDraft = undefined; this._render(); }
    else if (action === "back") { this._selected = undefined; this._detail = undefined; this._render(); }
    else if (action === "filter") { this._filter = id; this._render(); }
  }
}

if (!customElements.get("mine-repositories-panel")) {
  customElements.define("mine-repositories-panel", MineRepositoriesPanel);
}
