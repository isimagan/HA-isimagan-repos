"""Config flow for Mine repoer."""

from __future__ import annotations

from typing import Any

import voluptuous as vol

from homeassistant.config_entries import ConfigFlow, ConfigFlowResult

from .const import CONF_OWNER, CONF_TITLE, DEFAULT_OWNER, DEFAULT_TITLE, DOMAIN


class MineRepoerConfigFlow(ConfigFlow, domain=DOMAIN):
    """Handle the Mine repoer config flow."""

    VERSION = 1

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        """Create the single integration entry."""
        await self.async_set_unique_id(DOMAIN)
        self._abort_if_unique_id_configured()

        if user_input is not None:
            owner = user_input[CONF_OWNER].strip()
            title = user_input[CONF_TITLE].strip() or DEFAULT_TITLE
            return self.async_create_entry(
                title=title,
                data={CONF_OWNER: owner, CONF_TITLE: title},
            )

        return self.async_show_form(
            step_id="user",
            data_schema=vol.Schema(
                {
                    vol.Required(CONF_OWNER, default=DEFAULT_OWNER): str,
                    vol.Required(CONF_TITLE, default=DEFAULT_TITLE): str,
                }
            ),
        )
