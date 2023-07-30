import { FloatButton } from "antd";
import { CommentOutlined, CustomerServiceOutlined } from '@ant-design/icons';

const ReturnButton = () => {
  return (
    <FloatButton.Group
        trigger="hover"
        type="primary"
        style={{
          left: 24,
          top: 24,
        }}
        icon={<CustomerServiceOutlined />}
      >
        <FloatButton />
        <FloatButton icon={<CommentOutlined />} />
      </FloatButton.Group>
  );
}

export default ReturnButton;