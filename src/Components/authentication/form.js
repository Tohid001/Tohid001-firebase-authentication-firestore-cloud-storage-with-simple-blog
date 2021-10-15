import React from "react";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { auth, database, storage } from "../../firebase";
import { useAuth } from "../../contexts/authContext";
import { Form, Input, DatePicker, Button, Select, Checkbox, Space } from "antd";
import { useState } from "react/cjs/react.development";

const { Option } = Select;

function SignUpForm({ fileDetails, filePath }) {
  const { file, fileName } = fileDetails;
  const { currentUser, signup } = useAuth();
  const [loading, setLoading] = useState(false);

  // console.log(currentUser);
  const [form] = Form.useForm();

  const bugStyle = {
    position: "relative",

    width: "100%",
    minWidth: 0,
    padding: "4px 11px",
    color: "rgba(0, 0, 0, 0.85)",
    fontSize: "14px",
    lineHeight: 1.75,
    backgroundColor: "#fff",
    backgroundImage: "none",
    border: " 1px solid #d9d9d9",
    borderRadius: "2px",
    transition: "all 0.3s",
    display: "inline-flex",
  };

  const onFinish = async (values) => {
    const submit = document.getElementById("submit");
    submit.addEventListener("click", () => {
      setLoading(true);
    });
    submit.click();
    const { firstName, lastName, userName, gender, birthDate, agreement } =
      values;
    console.log(values);
    try {
      await signup(values.email, values.password).then((user) => {
        console.log(user.uid);
        database.users.add({
          firstName,
          lastName,
          userName,
          gender,
          // birthDate,
          agreement,
          userId: user.uid,
          createdAt: database.getCurrentTimestamp(),
        });
        deleteObject(storage.ref(filePath)).then((hh) => {
          const uploadTask = storage
            .ref(`/file/${user.uid}/avatar/${fileName}`)
            .put(file);
          uploadTask.on(
            "state_changed",
            () => {},
            () => {},
            () => {
              uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                database.avatars.add({
                  avatarName: fileName,
                  url,
                  userId: user.uid,
                  createdAt: database.getCurrentTimestamp(),
                });
                setLoading(false);
              });
            }
          );
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirm: "",
        gender: "",
        birthDate: "",
        agreement: false,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      onValuesChange={(changedValues, allValues) => {
        console.log(changedValues);
        form.setFieldsValue({ ...changedValues });

        // console.log(allValues);
      }}
      form={form}
      name="Sign Up"
      size="middle"
      scrollToFirstError
    >
      <Space direction="vertical" size={5}>
        <Space align="start">
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[
              {
                required: true,
                message: "Please input your first name",
              },
              {
                pattern: /^[a-zA-Z\s]*$/g,
                message: "numbers & special characters are not allowed",
              },
            ]}
            tooltip={{
              title: "This is a required field",
            }}
          >
            <Input style={bugStyle} />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[
              {
                required: true,
                message: "Please input your last name",
              },
              {
                pattern: /^[a-zA-Z\s]*$/g,
                message: "numbers & special characters are not allowed",
              },
            ]}
            tooltip={{
              title: "This is a required field",
            }}
          >
            <Input style={bugStyle} />
          </Form.Item>
        </Space>

        <Space size={15} align="start">
          <Form.Item
            name="userName"
            label="User Name"
            rules={[
              {
                required: true,
                message: "Please input your first name",
              },
              {
                pattern: /^[A-Za-z][A-Za-z0-9_]{10,29}$/,
                message:
                  "username must be started with an alphabet and have only one underscore, have at least one digit",
              },
            ]}
            tooltip={{
              title: "This is a required field",
            }}
          >
            <Input style={bugStyle} />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
            rules={[
              {
                required: true,
                message: "Please select gender!",
              },
            ]}
            tooltip={{
              title: "This is a required field",
            }}
            style={{ width: "150px" }}
          >
            <Select
              placeholder="select your gender"
              style={{ display: "inline-block" }}
            >
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>
        </Space>

        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
          tooltip={{
            title: "This is a required field",
          }}
        >
          <Input style={bugStyle} />
        </Form.Item>
        <Form.Item
          name="password"
          label="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
            {
              pattern:
                /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
              message:
                "password must have at least one lowercase letter, one uppercase letter, one digit, one special character, and at least eight characters long",
            },
          ]}
          tooltip={{
            title: "This is a required field",
          }}
          hasFeedback
          // help={<small>"should be combination of numbers and alphabet"</small>}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
          tooltip={{
            title: "This is a required field",
          }}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="birthDate"
          label="Birth-date"
          rules={[
            {
              required: true,
              message: "Please select a date!",
            },
          ]}
          tooltip={{
            title: "This is a required field",
          }}
          style={{ display: "inline-block" }}
        >
          <DatePicker style={{ display: "inline-block" }} />
        </Form.Item>
        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error("Should accept agreement")),
            },
          ]}
        >
          <Checkbox>
            I have read the <a href="">agreement</a>
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button
              id="submit"
              disabled={loading}
              type="primary"
              htmlType="submit"
            >
              Sign Up
            </Button>
            <Button disabled={loading} htmlType="button" onClick={onReset}>
              Reset
            </Button>
          </Space>
        </Form.Item>
      </Space>
    </Form>
  );
}

export default SignUpForm;
