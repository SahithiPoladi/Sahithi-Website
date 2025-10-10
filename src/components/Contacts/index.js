import React from "react";
import { Card, Form, Input, Button, message, Row, Col, Flex } from "antd";
import { contact } from "../utils";

const { TextArea } = Input;

const Contacts = () => {
  const [form] = Form.useForm();

  // Handle form submission
  const onFinish = (values) => {
    console.log("Form Values:", values);
    message.success("Email sent successfully!");
    form.resetFields();
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "40px 20px",
      }}
      id="contacts"
    >
      <h1
        className="kaushan-script-regular"
        style={{
          fontSize: "50px",
          textAlign: "center",
          marginBottom: "50px",
        }}
      >
        Get In Touch
      </h1>

      <Row
        gutter={[40, 40]} // spacing between columns
        align="middle"
        justify="center"
      >
        {/* Left Column - Form */}
        <Col xs={24} sm={24} md={12} lg={10}>
          <Card
            title="Send an Email"
            bordered={false}
            style={{
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              padding: "20px",
              fontSize: "25px",
            }}
            className="unna-regular card-border-gradient"
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              autoComplete="off"
              className="unna-regular"
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please enter your name" }]}
              >
                <Input placeholder="Enter your name" />
              </Form.Item>

              <Form.Item
                label="Subject"
                name="subject"
                rules={[{ required: true, message: "Please enter a subject" }]}
              >
                <Input placeholder="Enter subject" />
              </Form.Item>

              <Form.Item
                label="Message"
                name="message"
                rules={[
                  { required: true, message: "Please enter your message" },
                ]}
              >
                <TextArea rows={4} placeholder="Enter your message" />
              </Form.Item>

              <Form.Item>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "10px",
                  }}
                >
                  <Button htmlType="button" onClick={onReset}>
                    Reset
                  </Button>
                  <Button type="primary" htmlType="submit">
                    Send
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        {/* Right Column - Contact Info */}
        <Col xs={24} sm={24} md={12} lg={12}>
          <p className="unna-regular">
            I'm always open to discussing new opportunities, collaborations, or
            just connecting with like-minded professionals. Feel free to reach
            out using the form or through my social media links below.
          </p>

          <Flex justify="center" align="center" gap="large" wrap>
            {contact.map((item) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textAlign: "center",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <Flex vertical align="center" gap="small">
                  <div className="contact-icons">{item.icon}</div>
                  <p className="unna-regular">{item.name}</p>
                </Flex>
              </a>
            ))}
          </Flex>
        </Col>
      </Row>
    </div>
  );
};

export default Contacts;
