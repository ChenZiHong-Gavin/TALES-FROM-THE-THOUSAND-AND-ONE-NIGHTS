export function setChatTemplate(actorInfo) {
  const actorInfoList = [];
  const actorId = actorInfo.actorId;
  const avatarUrl = actorInfo.avatarUrl;
  const personDetail = actorInfo.personDetail;
  const audioOfPerson = actorInfo.audioOfPerson;
  const movieOfPerson = actorInfo.movieOfPerson;
  const photoOfPerson = actorInfo.photoOfPerson;
  const videoOfPerson = actorInfo.videoOfPerson;
  if ("birthday" in personDetail) {
    actorInfoList.push({
      text: "你知道吗？我的生日是「" + personDetail.birthday + "」",
    });
  }
  if ("ethnicity" in personDetail) {
    actorInfoList.push({
      text: "我是「" + personDetail.ethnicity + "」人",
    });
  }
  if ("deathday" in personDetail) {
    actorInfoList.push({
      text: "我于「" + personDetail.deathday + "」去世",
    });
  }
  if ("nationality" in personDetail) {
    actorInfoList.push({
      text: "我的国籍是「" + personDetail.nationality + "」",
    });
  }
  if ("createdWork" in personDetail) {
    const createdWork = personDetail.createdWork;
    const sentenceList = ["我曾经出演过", "我的作品有"];
    for (let i = 0; i < createdWork.length; i++) {
      actorInfoList.push({
        text:
          Math.random() > 0.5
            ? sentenceList[0] + "《" + createdWork[i] + "》"
            : sentenceList[1]+ "《" + createdWork[i] + "》",
      });
    }
  }
  if ("en_name" in personDetail) {
    actorInfoList.push({
      text: "我的英文名是「" + personDetail.en_name + "」",
    });
  }
  if ("relatedOrganization" in personDetail) {
    const relatedOrganization = personDetail.relatedOrganization;
    // 我曾经参加过{}
    for (let i = 0; i < relatedOrganization.length; i++) {
      actorInfoList.push({
        text: "我曾经参加过「" + relatedOrganization[i] + "」",
      });
    }
  }
  if ("nativePlace" in personDetail) {
    actorInfoList.push({
      text: "我的祖籍是「" + personDetail.nativePlace + "」",
    });
  }
  if (
    "briefBiography" in personDetail &&
    personDetail.briefBiography !== "" &&
    (personDetail.briefBiography !== null) &&
      (personDetail.briefBiography !== [])
  ) {
    actorInfoList.push({
      text: "我的简介是: \n" + personDetail.briefBiography,
    });
  }
  if ("event" in personDetail) {
    const event = personDetail.event;
    for (let i = 0; i < event.length; i++) {
      actorInfoList.push({
        text: "给你讲一个关于我的故事：\n" + event[i].description,
      });
    }
  }
  if ("friendOf" in personDetail) {
    const friendOf = personDetail.friendOf;
    for (let i = 0; i < friendOf.length; i++) {
      actorInfoList.push({
        text: "我和「" + friendOf[i].name + "」是好朋友",
      });
    }
  }
  if ("temporal" in personDetail) {
    actorInfoList.push({
      text: "我是「" + personDetail.temporal + "」时期的人"
    });
  }

  // photoOfPerson
  // 给你分享了一张照片
  for (let i = 0; i < photoOfPerson.length; i++) {
    actorInfoList.push({
      text: "给你分享了一张照片",
      type: photoOfPerson[i].type,
      imagePath: photoOfPerson[i].imagePath,
      hasImage: true,
    });
  }

  // videoOfPerson
  // 给你分享了一个视频
  for (let i = 0; i < videoOfPerson.length; i++) {
    actorInfoList.push({
      text: "给你分享了一个视频",
      type: videoOfPerson[i].type,
      videoPath: videoOfPerson[i].videoPath,
      hasCard: true,
      isVideo: true,
      title: videoOfPerson[i].title,
      VideoUri: videoOfPerson[i].videoUri,
    });
  }

  // audioOfPerson
  // 给你分享了一段音频
  for (let i = 0; i < audioOfPerson.length; i++) {
    actorInfoList.push({
      text: "给你分享了一段音频",
      type: audioOfPerson[i].type,
      audioPath: audioOfPerson[i].audioPath,
      hasCard: true,
      isAudio: true,
      musicUri: audioOfPerson[i].musicUri,
      title: audioOfPerson[i].title,
      audioUri: audioOfPerson[i].audioUri,
      ossAudioUrl: audioOfPerson[i].ossAudioUrl,
    });
  }

  // movieOfPerson
  // 给你分享了一部电影
  for (let i = 0; i < movieOfPerson.length; i++) {
    actorInfoList.push({
      text: "给你分享了一部自己出演的电影",
      type: movieOfPerson[i].type,
      moviePath: movieOfPerson[i].moviePath,
      hasCard: true,
      isMovie: true,
      movieUri: movieOfPerson[i].movieUri,
      date: movieOfPerson[i].date,
      movieName: movieOfPerson[i].movieName,
    });
  }

  for (let i = 0; i < actorInfoList.length; i++) {
    actorInfoList[i].actorId = actorId;
    actorInfoList[i].avatarUrl = avatarUrl;
    actorInfoList[i].name = personDetail.chs_name;
  }

  // avatarUrl
  return actorInfoList;
}
