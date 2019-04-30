
const repo = require('github-download-parts')
const ora = require('ora')

const spinner = ora('🚀  初始化模板...')

async function download (name, type) {
  const template = type === 'vue' ? 'pac-cli-vue-v1.0' : 'pac-cli-sdk-v1.0'
  try {
    spinner.start()
    await repo('13916253446/templateForCli', name, template)
    spinner.succeed()
  } catch({ message = '初始化模板失败' }) {
    spinner.fail(message)
  }
}

module.exports = download
