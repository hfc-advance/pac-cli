const ora = require('ora')
const kopy = require('kopy')
const { hasGit, hasProjectGit } = require('./index.js')

const spinner = ora('📄  开始编译模板...')


module.exports = async (target, answers = {}) => {
  try {
    spinner.start()
    let data = {
      gitAuthor: '',
      projectName: '',
      gitRemote: ''
    }
    if (hasGit() && hasProjectGit(process.CWD)) {
      const git = require('async-git')
      const origin = require('remote-origin-url')
      data.gitAuthor = await git.author
      data.gitRemote = await origin()
    }
    await kopy(target, target, {
      data: {
        ...data,
        ...answers
      },
      template: require('jstransformer-handlebars')
    })
    spinner.succeed()
  } catch ({ message = '模板编译失败' }) {
    spinner.fail(message)
  }
}
