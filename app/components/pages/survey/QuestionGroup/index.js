/**
 * Author: Duong Han
 * HUST
 * QuestionGroup
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import axios from 'axios';
import { Spin } from 'antd';
import { config } from 'utils/setAuthToken';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import Question from '../Question';

/* eslint-disable react/prefer-stateless-function */
class QuestionGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      loading: true,
    };
  }

  componentWillMount() {
    this.fetchQuestions(this.props.group._id);
  }

  fetchQuestions = groupId => {
    axios.get(`/api/survey/questions/group/${groupId}`, config).then(res => {
      this.setState({
        questions: res.data,
        loading: false,
      });
    });
  };

  render() {
    return (
      <Spin spinning={this.state.loading}>
        {this.state.questions.length > 0 &&
          this.state.questions.map(question => (
            <Question
              content={`${question.orderNumber}. ${question.content}`}
              orderNumber={question.orderNumber}
              id={question._id}
              answers={this.props.group.optionAnswers}
              inputType={this.props.group.inputType}
              groupId={this.props.group._id}
              key={question._id}
            />
          ))}
      </Spin>
    );
  }
}

QuestionGroup.propTypes = {
  group: PropTypes.object.isRequired,
};

export default QuestionGroup;
