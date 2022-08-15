import { nanoid } from "@reduxjs/toolkit";
import { Button, Col, Row, Select as AntSelect, Typography } from "antd";
import _ from "lodash";
import { PlusOutlined } from "@ant-design/icons";
import classNames from "classnames";

/**
 * Custom Ant Design Select Component
 * @param labelKey is the label key of an object if dataSource is an Array of Objects
 * @param valueKey is the value key of an object if dataSource is an Array of Objects
 * @param tableProps if user want to display dropdown options as table, this prop must be an object with prop visible true
 * @param addItemProps if user want to display button "add item" at the bototm of dropdown, this prop must be an object with prop visible true
 */
export const Select = ({
  dataSource = [],
  labelKey = "",
  valueKey = "",
  optionProps = {},
  showSearch = true,
  onSelect = () => {},
  tableProps = {
    visible: false,
    columns: [],
    width: 300,
  },
  addItemProps = {
    visible: false,
    onAddItem: () => {},
    textAddItem: "Add Item",
  },
  allowClear = true,
  onClear,
  placeholder = "Select",
  ...props
}) => {
  const isDropdownTable = _.isObject(tableProps) && tableProps.visible;
  const visibleAddItem = _.isObject(addItemProps) && addItemProps.visible;

  const getLabel = (data, isLabelProp = false) => {
    if (!_.isObject(data)) return data;
    if (!labelKey) return JSON.stringify(data);
    if (isDropdownTable && !isLabelProp) {
      return (
        <Row align="middle" wrap={false}>
          {tableProps.columns.map((col) => (
            <Col
              key={nanoid()}
              style={{ width: col?.width, minWidth: col?.width, maxWidth: col?.width }}
            >
              <Typography.Text ellipsis={{ tooltip: data[col?.dataIndex] }}>
                {data[col?.dataIndex]}
              </Typography.Text>
            </Col>
          ))}
        </Row>
      );
    }
    return data[labelKey];
  };

  const getValue = (data) => {
    if (!_.isObject(data)) return data;
    return !!valueKey ? data[valueKey] : JSON.stringify(data);
  };

  const handleSelect = (value, optionInstance) => {
    if (!valueKey) return onSelect(value);
    onSelect(optionInstance.fullValue);
  };

  const options = dataSource.map((data) => (
    <AntSelect.Option
      key={nanoid()}
      value={getValue(data)}
      label={getLabel(data, true)}
      fullValue={data}
    >
      {getLabel(data)}
    </AntSelect.Option>
  ));

  const dropdownRender = (originNode) => {
    const defaultNode = (
      <>
        {originNode}

        {visibleAddItem && (
          <div
            style={{
              border: "1px solid #fafafa",
              paddingTop: 5,
            }}
          >
            <Button type="link" icon={<PlusOutlined />} onClick={addItemProps?.onAddItem}>
              {addItemProps.textAddItem || "Add Item"}
            </Button>
          </div>
        )}
      </>
    );

    if (!isDropdownTable) {
      return defaultNode;
    }
    return (
      <>
        <Row
          align="middle"
          // css={styleTableHead}
          wrap={false}
        >
          {tableProps.columns.map((col, index) => (
            <Col
              key={index}
              flex={col?.width}
              className={classNames("col", index === 0 && "first-col")}
            >
              {col?.title}
            </Col>
          ))}
        </Row>

        {defaultNode}
      </>
    );
  };

  const getTableWidth = () => {
    if (!!tableProps.width) return tableProps.width;
    return tableProps.columns.reduce((sum, col) => (sum += col.width), 0);
  };

  return (
    <AntSelect
      placeholder={placeholder}
      showSearch={showSearch}
      onSelect={handleSelect}
      optionLabelProp={isDropdownTable && "label"}
      dropdownRender={dropdownRender}
      dropdownMatchSelectWidth={isDropdownTable ? getTableWidth() : undefined}
      allowClear={allowClear}
      onClear={onClear}
      {...props}
    >
      {options}
    </AntSelect>
  );
};

// const styleTableHead = css({
//   paddingBlock: "8px",
//   backgroundColor: "#fafafa",
//   borderBottom: "1px solid #00000006",

//   ".first-col": {
//     paddingLeft: 15,
//     marginRight: -15,
//   },
// });

// const styleAddItem = css({
//   border: "1px solid #fafafa",
//   paddingTop: 5,
// });
