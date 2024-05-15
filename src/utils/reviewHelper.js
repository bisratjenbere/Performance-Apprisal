const reviewHelper = (evaluterRole, evalutionType, evalutedUserId) => {
  const evalProcessData = {
    templete: "",
    endPoint: "",
  };

  const roleMappings = {
    student: {
      default: "student-to-instructor",
    },
    director: {
      peer: "peer-administrative-to-administrative",
      self: "self",
      default: "director-to-team-leader",
    },
    teamLeader: {
      peer: "peer-administrative-to-administrative",
      self: "self",
      default: "team-leader-to-employee",
    },
    dean: {
      peer: "peer-instructor-to-instructor",
      default: "dean-to-head",
    },
    head: {
      peer: "peer-instructor-to-instructor",
      default: "head-to-instructor",
    },
    adminstrative: {
      peer: "peer-administrative-to-administrative",
      self: "self",
    },

    instructor: {
      peer: "peer-instructor-to-instructor",
    },
    default: "peer-academic-to-academic",
  };

  const roleMapping = roleMappings[evaluterRole] || roleMappings.default;
  const template = roleMapping[evalutionType] || roleMapping.default;
  let endPoint;

  if (evalutionType === "peer") endPoint = `reviews/by-peer/${evalutedUserId}`;
  else if (evalutionType === "self") endPoint = `reviews/by-self`;
  else endPoint = `reviews/by-${evaluterRole}/${evalutedUserId}`;

  evalProcessData.templete = template;
  evalProcessData.endPoint = endPoint;

  return evalProcessData;
};

export default reviewHelper;
