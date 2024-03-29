import React, { useState, useEffect } from "react";

// import { translateMarkdown } from "@/utils";

import {
  Comment,
  Button,
  Tooltip,
  Input,
  Icon,
  Popconfirm,
  message,
  Avatar,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { discuss, discussDelect } from "@/request/api";
const { TextArea } = Input;

function CommentItem(props) {
  const {
    children,
    item,
    userInfo,
    articleId,
    commentId,
    replyId,
    replyVisible,
  } = props;
  const { user } = item;
  const [value, setValue] = useState("");

  useEffect(() => {
    replyVisible && setValue("");
  }, [replyVisible]);

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleKeyUp(e) {
    if (e.ctrlKey && e.keyCode === 13) {
      onSubmit();
    }
  }

  function onSubmit() {
    if (!userInfo.userId) return message.warn("您未登陆，请登录后再试。");
    discuss({
      userId: userInfo.userId,
      articleId,
      content: value.trim(),
      commentId,
    }).then((res) => {
      props.setCommentList(res.rows);
    });
    // axios
    //   .post("/discuss", {
    //     userId: userInfo.userId,
    //     articleId,
    //     content: value.trim(),
    //     commentId,
    //   })
    //   .then((res) => {
    //     props.onReply({ commentId: 0, replyId: 0 });
    //     props.setCommentList(res.rows);
    //   });
  }

  // delete discuss
  // function onDelete() {
  //   if (replyId) {
  //     axios.delete(`/discuss/reply/${replyId}`).then(() => {
  //       const commentList = [...props.commentList];
  //       const tagetComment = commentList.find((c) => c.id === commentId);
  //       tagetComment.replies = tagetComment.replies.filter(
  //         (r) => r.id !== replyId
  //       );
  //       props.setCommentList(commentList);
  //     });
  //   } else {
  //     discussDelect({
  //       commentId,
  //     }).then((res) => {
  //       console.log(res, "==res");
  //     });
  //     // axios.delete(`/discuss/comment/${commentId}`).then(() => {
  //     //   let commentList = [...props.commentList];
  //     //   commentList = commentList.filter((c) => c.id !== commentId);
  //     //   props.setCommentList(commentList);
  //     // });
  //   }
  // }

  function handleReply() {
    props.onReply({ commentId, replyId });
  }

  return (
    <Comment
      actions={[
        // <span onClick={handleReply}>Reply to</span>,
        <>
          {/* {userInfo.role === 1 && (
            <Popconfirm
              title={"是否删除该留言？"}
              cancelText="取消"
              okText="确认"
              onConfirm={onDelete}
            >
              <DeleteOutlined />
            </Popconfirm>
          )} */}
        </>,
      ]}
      author={<span>{item.user && item.user.username}</span>}
      avatar={<Avatar src={""}>{item.user.username}</Avatar>}
      content={
        <div
          className="article-detail"
          dangerouslySetInnerHTML={{
            __html: item.content,
          }}
        />
      }
      datetime={
        <Tooltip title={item.createdAt}>
          <span>{item.createdAt}</span>
        </Tooltip>
      }
    >
      {replyVisible && (
        <div className="reply-form">
          <TextArea
            placeholder={`回复${item.user.username}...`}
            value={value}
            onChange={handleChange}
            onKeyUp={handleKeyUp}
          />
          <div className="reply-form-controls">
            <span className="tip">Ctrl or ⌘ + Enter</span>
            <Button
              htmlType="submit"
              type="primary"
              disabled={!value.trim()}
              onClick={onSubmit}
            >
              回复
            </Button>
          </div>
        </div>
      )}
      {children}
    </Comment>
  );
}

const CommentList = (props) => {
  const userInfo = props.userInfo;

  const { commentList, articleId } = props;
  const [replyTarget, setReplyTarget] = useState({ commentId: 0, replyId: 0 });

  return (
    <div className="discuss-list">
      {commentList.map((comment) => (
        <CommentItem
          item={comment}
          key={comment.id}
          articleId={articleId}
          userInfo={userInfo}
          commentId={comment.id}
          setCommentList={props.setCommentList}
          commentList={props.commentList}
          // onReply={setReplyTarget}
          // replyVisible={
          //   replyTarget.commentId === comment.id && !replyTarget.replyId
          // }
        >
          {/* {comment.replies.map((reply) => (
            <CommentItem
              item={reply}
              key={reply.id}
              articleId={articleId}
              userInfo={userInfo}
              commentId={comment.id}
              replyId={reply.id}
              setCommentList={props.setCommentList}
              commentList={props.commentList}
              onReply={setReplyTarget}
              replyVisible={
                replyTarget.commentId === comment.id &&
                replyTarget.replyId === reply.id
              }
            />
          ))} */}
        </CommentItem>
      ))}
    </div>
  );
};

export default CommentList;
