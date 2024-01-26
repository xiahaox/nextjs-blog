import React, { useContext } from "react";

import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
import { Icon, Tag, Divider } from "antd";
// import SvgIcon from "@/components/SvgIcon";
import { TagTwoTone, FolderOpenTwoTone } from "@ant-design/icons";
import { myContext } from "@/context";

// function getColor(name, colorList) {
//   const target = colorList.find((c) => c.name === name);
//   return target ? target.color : "";
// }

const ArticleTag = (props) => {
  //   const tagColorList = useSelector((state) => state.article.tagList); // 相当于 connect(state => state.article.tagList)(ArticleTag)
  //   const { state, dispatch } = useContext(myContext);
  const { tagList, categoryList } = props;

  return (
    <>
      {tagList.length > 0 && (
        <>
          <Divider type="vertical" style={{ marginRight: 7 }} />
          <TagTwoTone className="adfd" style={{ marginRight: 10 }} />
          {tagList.map((tag, i) => (
            <Tag key={i} color={"red"}>
              {tag.name}
            </Tag>
          ))}
        </>
      )}
      {categoryList.length > 0 && (
        <>
          <Divider type="vertical" style={{ marginRight: 7 }} />
          <FolderOpenTwoTone style={{ marginRight: 10 }} />
          {categoryList.map((cate, i) => (
            <Tag key={i} color="#2db7f5">
              {/* <Link to={`/categories/${cate.name}`}>{cate.name}</Link> */}
              {cate.name}
            </Tag>
          ))}
        </>
      )}
    </>
  );
};

ArticleTag.propTypes = {
  tagList: PropTypes.array.isRequired,
  categoryList: PropTypes.array.isRequired,
};

export default ArticleTag;
