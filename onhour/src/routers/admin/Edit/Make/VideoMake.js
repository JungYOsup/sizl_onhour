import React, { useState } from "react";
import VideoView from "../../../../components/VideoView";
import axios from "axios";
// import Alert from "@material-ui/lab/Alert";

function VideoMake({ history, name }) {
  const [makes, setMakes] = useState({
    youtubeTitle: "",
    title: "",
    url: "",
    categoryKeys: [],
    categoryNames: [],
    captions: "",
    length: 0,
  });

  const [youtube, setYoutube] = useState();

  const {
    title,
    url,
    categoryKeys,
    categoryNames,
    youtubeTitle,
    captions,
    length,
  } = makes;

  console.log(captions);

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

    setMakes({ ...makes, categoryKeys, categoryNames });
  };

  const showDropDown = () => {
    document.querySelector("#myDropdown").classList.toggle("show");
  };

  const saveAndpostApi = async () => {
    // false가 return 되는것 , ""(빈문자열) , Nan , undefined , null , false, 0

    // 예외처리해줘야함

    axios
      .post(
        "https://1hour.school/api/v1/contents/create/frame",
        {
          youtube: url,
          youtubeTitle,
          length,
          categories: categoryKeys,
          title,
          captions,
        },
        {
          headers: {
            Authorization: sessionStorage.getItem("adminToken"),
          },
        }
      )
      .then((res) => {
        const {
          data: { data },
        } = res;

        console.log(data);

        history.push({
          pathname: "/admin/Edit/mediatool_manage",
          state: {
            page: 2,
            contents: data.contents,
            paragraphs: data.paragraphs,
          },
        });
      });
  };

  const showVideo = (e) => {
    const value = e.target.value;

    setMakes({ ...makes, url: value, length: youtube.duration });
  };

  const inputText = (e) => {
    const value = e.target.value;

    setMakes({ ...makes, title: value });
  };

  // 마침표/개행을 기준으로해서 자동으롬 문장마다 끊어집니다.
  const inputCaption = (e) => {
    const value = e.target.value;

    setMakes({ ...makes, captions: value });
  };

  const setReady = (e) => {
    setYoutube(e.target);
  };

  return (
    <div>
      <VideoView
        handleCategory={handleCategory}
        url={url}
        showDropDown={showDropDown}
        categoryNames={categoryNames}
        youtubeTitle={youtubeTitle}
        title={title}
        saveAndpostApi={saveAndpostApi}
        name={name}
        showVideo={showVideo}
        inputText={inputText}
        captions={captions}
        inputCaption={inputCaption}
        setReady={setReady}
      />
    </div>
  );
}

export default VideoMake;
