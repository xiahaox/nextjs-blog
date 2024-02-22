import React, {
  Component,
  Fragment,
  useState,
  useEffect,
  useContext,
} from "react";
import PropTypes from "prop-types";
// methods
// import axios from "@/utils/axios";
import { calcCommentsCount } from "@/utils";
// import { loginout } from "@/redux/user/actions";
import useAjaxLoading from "@/hooks/useAjaxLoading";
import { myContext } from "@/context";
// components
import {
  Comment,
  Avatar,
  Form,
  Button,
  Divider,
  Input,
  Icon,
  Menu,
  Dropdown,
  message,
  Modal,
} from "antd";
import List from "./list"; // 评论列表
import { discuss } from "@/request/api";
import { useEventBus } from "@/hooks/useEventBus";

const { TextArea } = Input;

const Editor = ({ onChange, onSubmit, submitting, value, articleId }) => (
  <div>
    <Form.Item>
      <TextArea
        rows={4}
        placeholder="说点什么..."
        onChange={onChange}
        value={value}
      />
    </Form.Item>
    <Form.Item>
      <div className="controls">
        <Icon type="info-circle" className="controls-tip-icon" />
        <span className="controls-tip">支持 Markdown 语法</span>
        <Button
          className="disscus-btn"
          htmlType="submit"
          loading={submitting}
          onClick={onSubmit}
          type="primary"
        >
          {articleId !== -1 ? "添加评论" : "留言"}
        </Button>
      </div>
    </Form.Item>
  </div>
);

function Discuss(props) {
  const { emit } = useEventBus();
  const { state, dispatch } = useContext(myContext);
  const { user } = state;
  const { username, role, userId } = user;
  const { commentList = [], articleId } = props;
  const [value, setValue] = useState("");
  const [submitting, withLoading] = useAjaxLoading();

  const renderDropdownMenu = () => {
    return username ? (
      <Menu onClick={handleMenuClick}>
        <Menu.Item key="loginout">注销</Menu.Item>
      </Menu>
    ) : (
      <Menu onClick={handleMenuClick}>
        <Menu.Item key="login">登录</Menu.Item>
        <Menu.Item key="register">注册</Menu.Item>
      </Menu>
    );
  };

  function handleMenuClick(e) {
    switch (e.key) {
      case "login":
        emit("openSignModal", "login");

        break;

      case "register":
        emit("openSignModal", "register");

        break;

      case "loginout":
        // dispatch(loginout());
        break;

      default:
        break;
    }
  }
  function handleSubmit() {
    if (!value) return;
    if (!username) return message.warn("您未登陆，请登录后再试。");
    discuss({
      articleId: props.articleId,
      content: value,
      userId: userId,
    }).then((res) => {
      setValue("");
      props.setCommentList(res.rows);
    });
    // withLoading(
    //   axios.post("/discuss", {
    //     articleId: props.articleId,
    //     content: value,
    //     userId: userInfo.userId,
    //   })
    // ).then((res) => {
    //   setValue("");
    //   props.setCommentList(res.rows);
    // });
  }

  return (
    <div id="discuss">
      <div className="discuss-header">
        <span className="discuss-count">{commentList?.length || 0}</span>
        {articleId !== -1 ? "条评论" : "条留言"}
        <span className="discuss-user">
          <Dropdown overlay={renderDropdownMenu()} trigger={["click", "hover"]}>
            <span>
              {username || "未登录用户"} <Icon type="down" />
            </span>
          </Dropdown>
        </span>
        <Divider className="hr" />
      </div>

      <Comment
        avatar={
          username ? (
            <Avatar src={""}>{username}</Avatar>
          ) : (
            <Icon
              type="github"
              theme="filled"
              style={{ fontSize: 40, margin: "5px 5px 0 0" }}
            />
          )
        }
        content={
          <Editor
            onChange={(e) => setValue(e.target.value)}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={value}
            articleId={articleId}
          />
        }
      />

      <List
        commentList={commentList}
        articleId={articleId}
        setCommentList={props.setCommentList}
        userInfo={user}
      />
    </div>
  );
}

Discuss.propTypes = {
  commentList: PropTypes.array.isRequired,
};

export default Discuss;
