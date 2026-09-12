"""Mine repoer integration."""

from __future__ import annotations

from pathlib import Path

from homeassistant.components import frontend
from homeassistant.components.http import StaticPathConfig
from homeassistant.components.panel_custom import async_register_panel
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant

from .const import (
    CONF_OWNER,
    CONF_TITLE,
    DEFAULT_OWNER,
    DEFAULT_TITLE,
    DOMAIN,
    PANEL_ELEMENT,
    PANEL_URL,
    STATIC_URL,
)


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up Mine repoer from a config entry."""
    domain_data = hass.data.setdefault(DOMAIN, {})
    if not domain_data.get("static_registered"):
        frontend_path = Path(__file__).parent / "frontend" / "mine-repositories-panel.js"
        await hass.http.async_register_static_paths(
            [StaticPathConfig(STATIC_URL, str(frontend_path), cache_headers=False)]
        )
        domain_data["static_registered"] = True

    owner = entry.data.get(CONF_OWNER, DEFAULT_OWNER)
    title = entry.data.get(CONF_TITLE, DEFAULT_TITLE)
    await async_register_panel(
        hass,
        frontend_url_path=PANEL_URL,
        webcomponent_name=PANEL_ELEMENT,
        sidebar_title=title,
        sidebar_icon="mdi:source-repository-multiple",
        module_url=f"{STATIC_URL}?v=0.5.0",
        config={"owner": owner, "title": title},
        require_admin=True,
    )

    domain_data[entry.entry_id] = {CONF_OWNER: owner}
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload a Mine repoer config entry."""
    frontend.async_remove_panel(hass, PANEL_URL, warn_if_unknown=False)
    hass.data.get(DOMAIN, {}).pop(entry.entry_id, None)
    return True
