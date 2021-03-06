/**
 * Author: Duong Han
 * HUST
 * RiasecTable
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { config } from 'utils/setAuthToken';
import download from 'downloadjs';
import axios from 'axios';

import { Icon, Table, Tooltip } from 'antd';

import { injectIntl, intlShape } from 'react-intl';

import columnOptions from './columnOptions';
import messages from './messages';

const excelData = {
  labels: [
    'nameLabel',
    'convinceLabel',
    'ruleLabel',
    'discoverLabel',
    'artLabel',
    'realisticLabel',
    'societyLabel',
    'dateLabel',
  ],
  values: [],
};

/* eslint-disable react/prefer-stateless-function */
class RiasecTable extends React.Component {
  state = {
    loading: true,
    data: [],
  };

  componentDidMount() {
    this.fetchResponse();
  }

  fetchResponse = () => {
    axios
      .get(`/api/survey/responses?name=riasec&type=report`, config)
      .then(res => {
        const data = res.data.map((i, key) => {
          const eachRow = {
            name: i.userName,
            key,
            date: i.date,
          };

          const rowExcelData = new Array(8).fill(0);
          rowExcelData[0] = i.userName;
          rowExcelData[7] = new Date(i.date).toLocaleString('vi-VN');

          i.results.map(it => {
            switch (it.item) {
              case 'Thuyết phục':
                eachRow.convince = it.value;
                rowExcelData[1] = it.value;
                break;
              case 'Quy tắc':
                eachRow.rule = it.value;
                rowExcelData[2] = it.value;
                break;
              case 'Khám phá':
                eachRow.discover = it.value;
                rowExcelData[3] = it.value;
                break;
              case 'Nghệ thuật':
                eachRow.art = it.value;
                rowExcelData[4] = it.value;
                break;
              case 'Hiện thực':
                eachRow.realistic = it.value;
                rowExcelData[5] = it.value;
                break;
              case 'Xã hội':
                eachRow.society = it.value;
                rowExcelData[6] = it.value;
                break;
              default:
                break;
            }
          });

          excelData.values.push(rowExcelData);
          return eachRow;
        });

        this.setState({ data, loading: false });
      });
  };

  downloadExcelFile = formatMessage => {
    const data = {
      ...excelData,
      labels: excelData.labels.map(label => formatMessage(messages[label])),
    };
    axios
      .post(
        '/api/excel/riasec/response',
        { data },
        { ...config, responseType: 'blob' },
      )
      .then(res =>
        download(res.data, 'Thong_ke_khao_sat_dinh_huong_nghe_nghiep.xlsx'),
      );
  };

  render() {
    const { formatMessage } = this.props.intl;

    const columns = columnOptions(formatMessage);

    return (
      <Table
        bordered
        rowKey={record => record.key}
        dataSource={this.state.data}
        loading={this.state.loading}
        columns={columns}
        title={() => (
          <h3 style={{ color: '#FA541C' }}>
            <strong>{formatMessage(messages.header)}</strong>

            <Tooltip title={formatMessage(messages.download)}>
              <a
                onClick={() => this.downloadExcelFile(formatMessage)}
                style={{ float: 'right' }}
              >
                <Icon
                  type="download"
                  style={{ fontSize: 20, color: '#FA541C' }}
                />
              </a>
            </Tooltip>
          </h3>
        )}
        size="middle"
        scroll={{ x: 800 }}
      />
    );
  }
}

RiasecTable.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(RiasecTable);
