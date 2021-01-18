// 왜 div는 e.target.value가 안돼는가 ??
import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../../../assets/css/modifies/videomodify.css";
import VideoView from "../../../../components/VideoView";
function VideoModify({ contents, history }) {
  const [modifies, setModifies] = useState({
    youtubeTitle: "",
    contents,
    title: "",
    url: "",
    categoryKeys: [],
    categoryNames: [],
  });

  const { title, url, categoryKeys, categoryNames, youtubeTitle } = modifies;
  // key배열도 추가시켜준다.
  const handleCategory = (e) => {
    const categoryName = e.target.dataset.value;
    const categoryKey = Number(e.target.dataset.pk);

    if (!categoryNames.includes(categoryName)) {
      categoryNames.push(categoryName);
      categoryKeys.push(categoryKey);
    } else {
      // index를 찾아서 그 인덱스를 제거하여 리턴해준다.(원본값이 바뀌는게 특징이네)
      let num = categoryNames.indexOf(categoryName);
      let num2 = categoryKeys.indexOf(categoryKey);
      categoryNames.splice(num, 1);
      categoryKeys.splice(num2, 1);
    }

    setModifies({ ...modifies, categoryKeys, categoryNames });
  };

  const showDropDown = () => {
    document.querySelector("#myDropdown").classList.toggle("show");
  };

  const saveAndpostApi = async () => {
    axios
      .post(
        "https://1hour.school/api/v1/contents/update/frame",
        {
          contents,
          title,
          categories: categoryKeys,
        },
        {
          headers: {
            Authorization: sessionStorage.getItem("adminToken"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        history.push({
          pathname: "/admin/Edit/content_edit",
          state: {
            contents,
            page: 2,
          },
        });
      });
  };

  const getApi = async () => {
    const {
      data: { data },
    } = await axios.get(
      `https://1hour.school/api/v1/contents/load/init/${contents}`,
      {
        headers: {
          Authorization: sessionStorage.getItem("adminToken"),
        },
      }
    );

    console.log(data);

    setModifies({
      ...modifies,
      contents: data.contents,
      title: data.title,
      url: data.url,
      categoryKeys: data.categoryKeys,
      categoryNames: data.categoryNames,
      youtubeTitle: data.youtubeTitle,
    });
  };
  useEffect(getApi, []);

  return (
    <div className="videomodify">
      <VideoView
        handleCategory={handleCategory}
        url={url}
        showDropDown={showDropDown}
        categoryNames={categoryNames}
        youtubeTitle={youtubeTitle}
        title={title}
        saveAndpostApi={saveAndpostApi}
      />
    </div>
  );
}
export default VideoModify;
