import React, { Component, useEffect, useState } from 'react';
import { Paper, Loader, Center } from '@mantine/core';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { getTreeMap } from '../../apis/treemap';
import AnyChart from 'anychart-react';
import anychart from 'anychart';

class Treemap extends Component {
  /**
   * Constructor Function
   */
  constructor() {
    super();
    this.state = {
      loading: false,
      chart: anychart.treeMap([]),
    };
    this.chartSettings();
    this.chartTitle();
    this.chartLegend();
    this.chartHeader();
    this.chartLabels();
    this.chartTooltip();
  }

  /**
   * Fetch data from server
   */
  fetchData() {
    this.setState((prev) => ({
      ...prev,
      loading: true,
    }));
    getTreeMap('marketMap').then(async (res) => {
      let data = anychart.data.tree(res.data.data, 'as-table');
      this.setState({
        loading: false,
      });
      this.state.chart.data(data);
    });
  }

  componentDidMount() {
    this.fetchData();
    /**
     * @type {array}
     */
    let treeConfig = this.props.config.needs.chartAndtables;
    treeConfig = treeConfig.find((item) => item.key === 'treemap');
    setInterval(() => this.fetchData(), treeConfig.refresh_time * 1000);
  }

  /**
   * Set normal settings to chart
   * @returns {void}
   */
  chartSettings() {
    this.state.chart
      .padding([10, 10, 10, 20])
      // setting the number of levels shown
      .maxDepth(2)
      .selectionMode('none');

    this.state.chart.autoRedraw(true);

    // set credits
    this.state.chart.credits().enabled(false);
    return Promise.resolve();
  }

  /**
   * Customize chart title
   * @returns {void}
   */
  chartTitle() {
    this.state.chart.title().enabled(true).useHtml(true).padding([0, 0, 20, 0]);
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
      .background('#4b5563')
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
  render() {
    return (
      <>
      <Helmet>
        <title>نقشه بازار</title>
      </Helmet>
        {this.state.loading ? (
          <Paper>
            <Center style={{ height: '600px' }}>
              <Loader />
            </Center>
          </Paper>
        ) : (
          <AnyChart
            contextMenu={false}
            height={600}
            instance={this.state.chart}
            title="نقشه بازار"
          />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  config: state.config,
});

export default connect(mapStateToProps)(Treemap);
