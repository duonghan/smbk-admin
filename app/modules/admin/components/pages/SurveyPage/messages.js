/*
* Author: Duong Han
* HUST
* SurveyPage Messages
*
* This contains all the text for the SurveyPage component.
*/

import { defineMessages } from 'react-intl';

export const scope = 'app.components.SurveyPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Danh sách khảo sát',
  },

  titleLabel: {
    id: `${scope}.titleLabel`,
    defaultMessage: 'Tiêu đề',
  },

  coverLabel: {
    id: `${scope}.coverLabel`,
    defaultMessage: 'Ảnh bìa',
  },

  dateLabel: {
    id: `${scope}.dateLabel`,
    defaultMessage: 'Ngày tạo',
  },

  updateLabel: {
    id: `${scope}.updateLabel`,
    defaultMessage: 'Lần cuối cập nhật',
  },

  actionLabel: {
    id: `${scope}.actionLabel`,
    defaultMessage: 'Hành động',
  },

  rulesMsg: {
    id: `${scope}.rulesMsg`,
    defaultMessage: 'Vui lòng nhập',
  },

  editToolTip: {
    id: `${scope}.editToolTip`,
    defaultMessage: 'Sửa',
  },

  deleteToolTip: {
    id: `${scope}.deleteToolTip`,
    defaultMessage: 'Xóa',
  },

  detailToolTip: {
    id: `${scope}.detailToolTip`,
    defaultMessage: 'Chi tiết',
  },

  cancel: {
    id: `${scope}.cancel`,
    defaultMessage: 'Hủy',
  },

  actionTitle: {
    id: `${scope}.actionTitle`,
    defaultMessage: 'Hành động',
  },

  save: {
    id: `${scope}.save`,
    defaultMessage: 'Lưu',
  },

  cancelPromtMsg: {
    id: `${scope}.cancelPromtMsg`,
    defaultMessage: 'Bạn chắc chắn muốn hủy?',
  },

  deletePromtMsg: {
    id: `${scope}.deletePromtMsg`,
    defaultMessage: 'Bạn chắc chắn muốn xóa?',
  },
});
