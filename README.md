# Price widget

This plugin adds a widget to the footer that displays the current exchange
rate stored in the application state by the core [price](https://github.com/bpanel-org/price) plugin.
In a wide enough window, it will display two dropdown menus for the user to select
which fiat currency is used and which API is providing the data. This is done
by dispatching the following actions which the core `price` plugin listens for:

```
REFRESH_PRICE
UPDATE_FIAT
UPDATE_FEED
```

When installed, this plugin will update the price in the application state every 60 seconds.

Included with other widgets in [genesis-theme](https://github.com/bpanel-org/genesis-theme):
![screenshot](https://raw.githubusercontent.com/bpanel-org/price-widget/master/docs/withTheme.png "footer with theme")

Without any theme installed:
![screenshot](https://raw.githubusercontent.com/bpanel-org/price-widget/master/docs/noTheme.png "footer no theme")

**Important:** This plug in currently requires the bPanel backend plugin `@bpanel/curl` to be installed separately by the user:

Using [bpanel-cli](https://github.com/bpanel-org/bpanel-cli)

```bash
$ bpanel-cli i @bpanel/curl
```

**Optional:**

The appearace of this widget can be modified by installing the additional plugin [price-settings](https://github.com/bpanel-org/price-settings).

![screenshot](https://raw.githubusercontent.com/bpanel-org/price-widget/master/docs/price-settings.gif "with price-settings")
