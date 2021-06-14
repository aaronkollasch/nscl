/*
 * NoScript Commons Library
 * Reusable building blocks for cross-browser security/privacy WebExtensions.
 * Copyright (C) 2020-2021 Giorgio Maone <https://maone.net>
 *
 * Copyright (C) 2020-2021 Giorgio Maone <https://maone.net>
 *
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option) any later
 * version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * this program. If not, see <https://www.gnu.org/licenses/>.
 */

{
  let PREFIX = typeof browser === "object" && typeof importScripts === "undefined"
    ? `[${browser.runtime.getManifest().name}]` : '';

  let debugCount = 0;

  function log(msg, ...rest) {
    console.log(`${PREFIX} ${msg}`, ...rest);
  }

  function debug(msg, ...rest) {
    console.debug(`${PREFIX}:${debugCount++} ${msg}`, ...rest);
  }

  function error(e, msg, ...rest) {
    console.error(`${PREFIX} ${msg}`, ...rest, e, e.message, e.stack);
  }
}
