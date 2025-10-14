import React, { useState } from "react";
import { Card, Form, Input, Button, message, Row, Col, Space } from "antd";
import "./index.css";
import { LinkedinOutlined, GithubOutlined, InstagramOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { fetchContactQuery, sendContact } from '../../apiService';

const { TextArea } = Input;

const Contacts = () => {
  const [form] = Form.useForm();

  const {
    data: contactResponse, isLoading, isError, error
  } = useQuery({ queryKey: ['contact'], queryFn: fetchContactQuery });

  const [submitting, setSubmitting] = useState(false);

  // Handle form submission
  const onFinish = async (values) => {
    try {
      setSubmitting(true);
      // POST to server using centralized apiService
      const data = await sendContact(values);
      message.success(data.message || 'Email sent successfully!');
      form.resetFields();
    } catch (err) {
      console.error('Network error:', err);
      // axios errors may contain response.data
      const errMsg = err?.response?.data?.error || err.message || 'Failed to send email';
      message.error(errMsg);
    } finally {
      setSubmitting(false);
    }
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
          fontSize: "56px",
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
            headStyle={{ color: "#d9dddc", background: "transparent" }}
            style={{
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              padding: "24px",
              fontSize: "34px",
              color: "#d9dddc",
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
                label={<span className="form-label">Name</span>}
                name="name"
                rules={[{ required: true, message: "Please enter your name" }]}
              >
                <Input className="form-input" placeholder="Enter your name" />
              </Form.Item>

              <Form.Item
                label={<span className="form-label">Email</span>}
                name="email"
                rules={[{ required: true, message: "Please enter your email" }]}
              >
                <Input className="form-input" placeholder="Enter your email" />
              </Form.Item>

              <Form.Item
                label={<span className="form-label">Subject</span>}
                name="subject"
                rules={[{ required: true, message: "Please enter a subject" }]}
              >
                <Input className="form-input" placeholder="Enter subject" />
              </Form.Item>

              <Form.Item
                label={<span className="form-label">Message</span>}
                name="message"
                rules={[
                  { required: true, message: "Please enter your message" },
                ]}
              >
                <TextArea rows={4} className="form-input" placeholder="Enter your message" />
              </Form.Item>

              <Form.Item>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "10px",
                  }}
                >
                  <Button htmlType="button" onClick={onReset} className="form-buttons">
                    Reset
                  </Button>
                  <Button type="primary" htmlType="submit" className="form-buttons" loading={submitting} disabled={submitting}>
                    {submitting ? 'Sending...' : 'Send'}
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

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {isLoading ? (
              <div>Loading contact info…</div>
            ) : isError ? (
              <div>Failed to load Contact information</div>
            ) : (
              (() => {
                const iconsMap = {
                  LinkedinOutlined: LinkedinOutlined,
                  GithubOutlined: GithubOutlined,
                  InstagramOutlined: InstagramOutlined,
                };

                return contactResponse?.contactInfo?.map((item) => {
                  const IconComp = iconsMap[item.icon] || GithubOutlined;
                  return (
                    <a
                      key={item._id}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        textAlign: "center",
                        textDecoration: "none",
                        color: "inherit",
                        margin: '0 12px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      <div className="contact-icons"><IconComp style={{ fontSize: 24 }} /></div>
                      <p className="unna-regular">{item.name}</p>
                    </a>
                  );
                });
              })()
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Contacts;
