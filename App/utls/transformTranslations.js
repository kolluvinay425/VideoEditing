// transformTranslations.js
const transformTranslations = (data, language) => {
  return data.map(item => ({
    id: item.id,
    name: item.name[language],
    image: item.image,
    description: item.description[language],
    points: item.points,
    hardness: item.hardness[language],
    rewards: {
      title: item.rewards.title[language],
      titleImage: item.rewards.titleImage,
      extra: item.rewards.extra[language],
    },
    requirements: item.requirements.map(req => ({
      heading: req.heading[language],
      image: req.image,
      icon_image: req.icon_image,
      description: req.description[language],
    })),
    tipsTricks: item.tipsTricks.map(tip => ({
      heading: tip.heading[language],
      image: tip.image,
      description: tip.description[language],
    })),
  }));
};

export default transformTranslations;
