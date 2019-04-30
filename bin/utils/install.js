const ora = require('ora')
const execa = require('execa')

const spinner = ora('📦  安装项目依赖...')

module.exports = async function install () {
  try {
    spinner.start()
    await execa(
      'npm',
      ['install'],
      { stdio: 'inherit' }
    )
  } catch ({ message = '安装项目依赖失败' }) {
    spinner.fail()
  }
}