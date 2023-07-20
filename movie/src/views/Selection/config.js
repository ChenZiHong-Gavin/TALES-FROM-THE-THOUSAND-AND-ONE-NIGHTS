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
    color: "#683A5E",
    caption: {
      title: "基于电影网络分析的影人年谱",
      subtitle: "Chronology Based on Network Analysis",
    },
  },
  {
    color: "#000",
    caption: {
      title: "时间透镜：剧照时代性分析",
      subtitle: "Temporal Lens: Analysis of Still Images in Relation to Historical Context",
    },
  },
  {
    color: "#0A0808",
    caption: {
      title: "标签化分类视角下的电影探索",
      subtitle: "Exploring Movies from a Tag-based Categorization Perspective",
    },
  },
];

// 选择的模式
const mode = [
  {
    name: "theatreMap",
    url: "/map/theatre",
  },
  {
    name: "typeMap",
    url: "/map/type",
  },
  {
    name: "emotionMap",
    url: "/map/emotion",
  },
  {
    name: "totalMap",
    url: "/map/other",
  },
  {
    name: "actorMap",
    url: "/map/actor",
  },
];

const invitationInfo = [
  {
    name_en: "TheatreTale",
    name_cn: "戏院落成",
    number: "#1",
    number_cn: "壹",
  },
  {
    name_en: "MoodFlix",
    name_cn: "共度喜忧",
    number: "#2",
    number_cn: "贰",
  },
  {
    name_en: "MovieCast",
    name_cn: "卧虎藏龙",
    number: "#3",
    number_cn: "叁",
  },
  {
    name_en: "CineSnap",
    name_cn: "时光筛影",
    number: "#4",
    number_cn: "肆",
  },
  {
    name_en: "FlickFrame",
    name_cn: "大观影戏",
    number: "#5",
    number_cn: "伍",
  }
]


// slideInfo的colorArray
const colorArray = slideInfo.map((item) => item.color);

const captionArray = slideInfo.map((item) => item.caption);

export { colorArray, mode, captionArray, invitationInfo };
