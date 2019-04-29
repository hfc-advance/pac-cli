
const repo = require('github-download-parts')
const ora = require('ora')

const spinner = ora('🚀  初始化模板...')

async function download (name) {
  try {
    spinner.start()
    await repo('13916253446/templateForCli', name, 'pac-cli-vue-v1.0')
    spinner.succeed()
  } catch({ message = '初始化模板失败' }) {
    spinner.fail(message)
  }
}

module.exports = download
