const axios = require('axios');
const ora = require('ora');
const Inquirer = require('inquirer'); // 是一个类
// create 的所有逻辑
// 功能是创建项目
// 拉去对应项目列表，让用户选择对应版本
// 可能还需要用户配置一些数据结合项目然后再渲染
// github 开发文档 https://developer.github.com/v3/

// https://api.github.com/orgs/zhu-cli/repos 获取组织下的仓库


// 1. 获取项目的所有模板 在获取前显示loading 获取结束关闭loading  使用报ora
const fetchReplList = async () => {
  const { data } = await axios.get('https://api.github.com/orgs/zhu-cli/repos');
  return data;
};

module.exports = async (projectName) => {
  const spinner = ora('fetching template ...');
  spinner.start();
  let repos = await fetchReplList();
  spinner.succeed();
  repos = repos.map((item) => item.name);
  // 选择模板 inquirer
  const xxx = await Inquirer.prompt({
    name: 'repo', // 获取选择候的结果
    type: 'list', // list checkbox input
    message: 'please choise a template to create project',
    choices: repos,
  });
  console.log(xxx);
};
