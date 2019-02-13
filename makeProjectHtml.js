function generateSkills(skills) {
    var skillTemplate = skills.reduce((accum, skill) => {
        return accum + `<div class="pSkill">${skill}</div>\n`;
    }, '');

    return skillTemplate;
}

function createTemplate(project) {
    var pSkills = generateSkills(project.skills);

    var projectHtmlSnippit = `
<div class="project">
  <div class="photoDiv">
    <a class="pLink" href="${project.link}">
      <img class="pPhoto" src="${project.imgSrc}" alt="${project.imgAlt}">
    </a>
  </div>
  <div class="contentDiv">
    <div class="projectHeader">
      <a class="pLink" href="${project.link}">
        <div class="pName">${project.name}</div>
      </a><br>
      <span class="pHours">${project.hours}</span>&nbsp;hours,&nbsp;
      <span class="pTimeframe">${project.timeframe}</span>
    </div>
    <div class="projectBody">
      <p class="pDescription">
        ${project.description}
      </p>
    </div>
    <div class="projectSkills">
      ${pSkills}
    </div>
  </div>
</div>
<hr>`
  
  return projectHtmlSnippit;
}

module.exports = createTemplate;