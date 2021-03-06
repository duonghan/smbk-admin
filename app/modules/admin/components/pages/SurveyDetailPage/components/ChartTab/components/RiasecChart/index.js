/**
 * Author: Duong Han
 * HUST
 * RiasecChart
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { Icon, Tooltip } from 'antd';
import { HorizontalBar } from 'react-chartjs-2';
import { FormattedMessage, injectIntl } from 'react-intl';

import download from 'downloadjs';
import axios from 'axios';
import { config } from 'utils/setAuthToken';

import messages from './messages';

const data = {
  datasets: [
    {
      label: '1',
      backgroundColor: 'rgba(54, 162, 235)',
      borderColor: 'rgb(54, 162, 235)',
    },
    {
      label: '2',
      backgroundColor: 'rgba(255, 159, 64)',
      borderColor: 'rgb(255, 159, 64)',
    },
  ],
};

const options = {
  scales: {
    xAxes: [
      {
        scaleLabel: {
          display: true,
          labelString: 'Số lượng',
        },
      },
    ],
    yAxes: [
      {
        scaleLabel: {
          display: true,
          labelString: 'Lĩnh vực',
        },
        barThickness: 'flex',
      },
    ],
  },
};

/* eslint-disable react/prefer-stateless-function */
class RiasecChart extends React.Component {
  downloadExcelFile = () => {
    axios
      .post(
        '/api/excel/riasec/chart',
        { data: this.props.fetchedData },
        { ...config, responseType: 'blob' },
      )
      .then(res =>
        download(
          res.data,
          `Bieu_do_khao_sat_trac_nghiem_tu_van_nghe_nghiep.xlsx`,
        ),
      );
  };

  render() {
    const { formatMessage } = this.props.intl;

    return (
      <div>
        <h2 style={{ textAlign: 'center' }}>
          <FormattedMessage {...messages.header} />

          <Tooltip title={formatMessage(messages.download)}>
            <a onClick={this.downloadExcelFile} style={{ float: 'right' }}>
              <Icon
                type="download"
                style={{ fontSize: 20, color: '#FA541C' }}
              />
            </a>
          </Tooltip>
        </h2>

        <br />
        <HorizontalBar
          data={{ ...data, ...this.props.fetchedData }}
          options={options}
        />
      </div>
    );
  }
}

RiasecChart.propTypes = {
  fetchedData: PropTypes.object.isRequired,
};

export default injectIntl(RiasecChart);
