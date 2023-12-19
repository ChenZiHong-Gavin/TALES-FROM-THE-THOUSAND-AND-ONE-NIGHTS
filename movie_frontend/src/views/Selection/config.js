const slideInfo = [
  {
    color: "#30401f",
    // 字幕
    caption: {
      title: "上海戏院的兴衰历史",
      subtitle: "The Rise and Fall of Theaters in Shanghai",
    },
  },
  {
    color: "#36648B",
    caption: {
      title: "老电影的情绪挖掘、感知与匹配",
      subtitle: "Emotional Mining, Perception, and Matching of Classic Movies",
    },
  },
  {
    color: "#6C3D73",
    caption: {
      title: "基于电影网络分析的影人年谱",
      subtitle: "Chronology Based on Network Analysis",
    },
  },
  {
    color: "#a86c16",
    caption: {
      title: "时间透镜：剧照时代性分析",
      subtitle:
        "Temporal Lens: Analysis of Still Images in Relation to Historical Context",
    },
  },
  // {
  //   color: "#404935",
  //   caption: {
  //     title: "标签化分类视角下的电影探索",
  //     subtitle: "Exploring Movies from a Tag-based Categorization Perspective",
  //   },
  // },
];

const invitationInfo = [
  {
    url: "/map/theatre",
    name_en: "TheatreTale",
    name_cn: "戏院落成",
    number: "#1",
    number_cn: "壹",
    color: {
      stub: {
        background: "#901316",
        color: "#d6c29b",
      },
    },
  },
  {
    url: "/map/emotion",
    name_en: "MoodFlix",
    name_cn: "共度喜忧",
    number: "#2",
    number_cn: "贰",
    color: {
      stub: {
        background: "#172A3B",
        color: "#ceb880",
      },
    },
  },
  {
    url: "/map/actor",
    name_en: "MovieCast",
    name_cn: "卧虎藏龙",
    number: "#3",
    number_cn: "叁",
    color: {
      stub: {
        background: "#a63232",
        color: "#d9c6b0",
      },
    },
  },
  {
    url: "/map/other",
    name_en: "CineSnap",
    name_cn: "时光筛影",
    number: "#4",
    number_cn: "肆",
    color: {
      stub: {
        background: "#af8147",
        color: "#a63b1b",
      },
    },
  },
  // {
  //   url: "/map/other",
  //   name_en: "FlickFrame",
  //   name_cn: "大观影戏",
  //   number: "#5",
  //   number_cn: "伍",
  //   color: {
  //     stub: {
  //       background: "#c09c6e",
  //       color: "#404935",
  //     },
  //   },
  // },
];

// slideInfo的colorArray
const colorArray = slideInfo.map((item) => item.color);

const captionArray = slideInfo.map((item) => item.caption);

export { colorArray, captionArray, invitationInfo };
