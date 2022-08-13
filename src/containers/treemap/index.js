import React, { PureComponent, useEffect, useState } from 'react';
import { Paper, Loader, Center, Button } from '@mantine/core';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { getTreeMap } from '../../apis/treemap';
import AnyChart from 'anychart-react';
import anychart from 'anychart';
import { withRouter } from 'react-router';


class Treemap extends PureComponent {
  /**
   * Constructor Function
   */
  constructor() {
    super();
    this.state = {
      loading: true,
      chart: anychart.treeMap([]),
      fullScreenMode: false,
    };
    this.chartSettings();
    this.chartLegend();
    this.chartHeader();
    this.chartLabels();
    this.chartTooltip();
  }

  /**
   * Fetch data from server
   */
  fetchData() {
    getTreeMap('marketMap').then(async (res) => {
      let data = anychart.data.tree(res.data.data, 'as-table');
      this.state.chart.data(data);
    });
  }

  componentDidMount() {
    this.setState({ loading: false });
    this.fetchData();
    /**
     * @type {array}
     */
    let treeConfig = this.props.config.needs.chartAndtables;
    treeConfig = treeConfig.find((item) => item.key === 'treemap');
    this.interval = setInterval(() => this.fetchData(), treeConfig.refresh_time * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  /**
   * Set normal settings to chart
   * @returns {void}
   */
  chartSettings() {
    this.state.chart
      // setting the number of levels shown
      .maxDepth(2)
      .selectionMode('none');

    // set credits
    this.state.chart.credits().enabled(false);
    this.state.chart.headersDisplayMode('always-show');
    this.state.chart.normal().stroke('#333333', 2);
    return Promise.resolve();
  }

  /**
   * Customize Chart legend
   * @returns {void}
   */
  chartLegend() {
    this.state.chart
      .legend()
      .enabled(false)
      .padding([0, 0, 0, 20])
      .position('right')
      .align('top')
      .itemsLayout('vertical');
    return Promise.resolve();
  }

  /**
   * Customize Chart Headers
   * @returns {void}
   */
  chartHeader() {
    this.state.chart
      .headers()
      .background('#333333')
      .fontColor('#fff')
      .fontFamily('Iran-sans')
      .padding(5)
      .format(function () {
        return this.getData('name');
      });
    return Promise.resolve();
  }

  /**
   * Customize Chart Labels
   * @returns {void}
   */
  chartLabels() {
    this.state.chart
      .labels()
      .fontFamily('Iran-sans')
      .useHtml(true)
      .fontColor('#fff')
      .fontSize(12)
      .textOverflow('')
      .format(function () {
        if (this.oc.kg.Ai.treemap_pointBounds.width > 30) {
          return `${this.getData('name')}<br/>${this.getData('displayValue')}`;
        }
        return ``;
      });
    return Promise.resolve();
  }

  /**
   * Customize Chart Tooltip
   * @returns {void}
   */
  chartTooltip() {
    this.state.chart
      .tooltip()
      .fontFamily('Irans-sans')
      .useHtml(true)
      .titleFormat(function () {
        return `<span>${this.getData('name')}</span>`;
      })
      .format(function () {
        return `<table class="w-full font-persian treeamp-tooltip-table">
          <tbody>
          <tr>
              <td>${this.getData('displayValue') ? 'درصد تغییرات' : ''}</td>
              <td class="text-left" dir="ltr">${
                this.getData('displayValue') || ''
              }</td>
            </tr>
            <tr>
              <td>${this.getData('realName') ? 'نام واقعی' : ''}</td>
              <td class="text-left">${this.getData('realName') || ''}</td>
            </tr>
            <tr>
            <td>${this.getData('endPrice') ? 'قیمت نهایی' : ''}</td>
            <td class="text-left">${this.getData('endPrice') || ''}</td>
          </tr>
            <tr>
            <td>${this.getData('lastDeal') ? 'آخرین معامله' : ''}</td>
            <td class="text-left">${this.getData('lastDeal') || ''}</td>
          </tr>
          <tr>
          <td>${this.getData('count') ? 'تعداد' : ''}</td>
          <td class="text-left">${this.getData('count') || ''}</td>
        </tr>
        <tr>
          <td>${this.getData('volume') ? 'حجم' : ''}</td>
          <td class="text-left">${this.getData('volume') || ''}</td>
        </tr>
        <tr>
          <td>${this.getData('value') ? 'ارزش' : ''}</td>
          <td class="text-left">${this.getData('value') || ''}</td>
        </tr>
        <tr>
          <td>${this.getData('time') ? 'زمان' : ''}</td>
          <td class="text-left">${this.getData('time') || ''}</td>
        </tr>
          </tbody>
        </table>`;
      });
    return Promise.resolve();
  }

  /**
   * Enter Full screen mode chart
   * @returns {void}
   */
  enterFullScreen = ()=> {
    this.state.chart.fullScreen(true);
  }
  render() {
    return (
      <>
        <Helmet>
          <title>نقشه بازار</title>
        </Helmet>
        {this.state.loading ? (
          <Paper>
            <Center style={{ height: '800px' }}>
              <Loader variant='dots' color="blue" />
            </Center>
          </Paper>
        ) : (
          <Paper >
            <Button ml="sm" mt="sm" size='xs' color="blue" onClick={this.enterFullScreen}>تمام صفحه</Button>
            <AnyChart
              contextMenu={false}
              height={`${window.outerHeight}px`}
              resizing_mode="Recalculate"
              instance={this.state.chart}
              title=""
            />
          </Paper>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  config: state.config,
});

export default withRouter(connect(mapStateToProps)(Treemap));
