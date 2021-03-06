import React from 'react';
import { Input, Form } from 'antd';
import { injectIntl, intlShape } from 'react-intl';
import messages from './messages';

const FormItem = Form.Item;

export const EditableContext = React.createContext();

class EditableCell extends React.Component {
  getInput = () => <Input />;

  render() {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      ...restProps
    } = this.props;
    return (
      <EditableContext.Consumer>
        {form => {
          const { getFieldDecorator } = form;
          return (
            <td {...restProps}>
              {editing ? (
                <FormItem style={{ margin: 0 }}>
                  {getFieldDecorator(dataIndex, {
                    rules: [
                      {
                        required: true,
                        message: `${this.props.intl.formatMessage(
                          messages.rulesMsg,
                        )} ${title}!`,
                      },
                    ],
                    initialValue: record[dataIndex],
                  })(this.getInput())}
                </FormItem>
              ) : (
                restProps.children
              )}
            </td>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}

EditableCell.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(EditableCell);
