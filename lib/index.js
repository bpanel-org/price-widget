/* Imports */

import * as price from '@bpanel/price';
import { Text, widgetCreator } from '@bpanel/bpanel-ui';

/* Utility */

function moneyNumber(number) {
  number = parseFloat(number);
  return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

/* Exports */

export const metadata = {
  name: 'price-ui',
  pathName: 'price-ui',
  displayName: 'Price UI',
  author: 'Matthew Zipkin',
  description: 'UI for price plugin',
  version: require('../package.json').version,
  nav: false,
  sidebar: false
};

export const pluginConfig = {
  plugins: [price]
};

export const mapComponentDispatch = {
  Footer: (dispatch, map) =>
    Object.assign(map, {
      refreshPrice: () => dispatch({ type: 'REFRESH_PRICE', payload: {} }),
      updateFiat: fiat => dispatch({ type: 'UPDATE_FIAT', payload: fiat }),
      updateFeed: feed => dispatch({ type: 'UPDATE_FEED', payload: feed })
    })
};

export const mapComponentState = {
  Footer: (state, map) =>
    Object.assign(map, {
      price: state.plugins.price,
      hideMenus: state.plugins.priceWidget.hideMenus
    })
};

export const decorateFooter = (Footer, { React, PropTypes }) => {
  return class extends React.Component {
    static displayName() {
      return metadata.name;
    }

    static get propTypes() {
      return {
        refreshPrice: PropTypes.func,
        updateFiat: PropTypes.func,
        updateFeed: PropTypes.func,
        footerWidgets: PropTypes.array,
        hideMenus: PropTypes.bool,
        price: PropTypes.shape({
          fiat: PropTypes.string,
          fiatSymbol: PropTypes.string,
          price: PropTypes.float,
          feed: PropTypes.string,
          crypto: PropTypes.string,
          availableFiats: PropTypes.array
        })
      };
    }

    async componentDidMount() {
      this.props.refreshPrice();
      setInterval(async () => {
        this.props.refreshPrice();
      }, 60000);
    }

    render() {
      const {
        footerWidgets = [],
        price,
        updateFeed,
        updateFiat,
        hideMenus = false,
        refreshPrice
      } = this.props;

      const Ticker = () => (
        <div className={'col'} style={{ height: '100%', lineHeight: '200%' }}>
          <Text>
            {price.crypto + '/'}
            {!hideMenus ? (
              <select
                value={price.fiat}
                onChange={e => {
                  updateFiat(e.target.value);
                  refreshPrice();
                }}
              >
                {price.availableFiats.map(val => (
                  <option value={val} key={val}>
                    {val}
                  </option>
                ))}
              </select>
            ) : (
              price.fiat
            )}
            {'  ' + price.fiatSymbol + moneyNumber(price.price) + ' '}
          </Text>
          {!hideMenus && (
            <React.Fragment>
              <select
                value={price.feed}
                onChange={e => {
                  updateFeed(e.target.value);
                  refreshPrice();
                }}
              >
                {price.availableFeeds.map(val => (
                  <option value={val} key={val}>
                    {val}
                  </option>
                ))}
              </select>
            </React.Fragment>
          )}
        </div>
      );

      footerWidgets.push(widgetCreator(Ticker)());
      return <Footer {...this.props} footerWidgets={footerWidgets} />;
    }
  };
};
