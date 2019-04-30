const path = require('path')
const fs = require('fs-extra')
const validateProjectName = require('validate-npm-package-name')
const chalk = require('chalk')
const download = require('./utils/download.js')
const compile = require('./utils/compile.js')
const install = require()
const { prompt } = require('enquirer')
const CWD = process.cwd()

async function create (projectName) {
  const inCurrent = projectName === '.'
  const name = inCurrent ? path.relative('../', CWD) : projectName

  const result = validateProjectName(name)
  if (!result.validForNewPackages) {
    console.error(chalk.red(`无效的项目名称: "${name}"`))
    result.errors && result.errors.forEach(err => {
      console.error(chalk.red.dim('Error: ' + err))
    })
    result.warnings && result.warnings.forEach(warn => {
      console.error(chalk.red.dim('Warning: ' + warn))
    })
    process.exit(1)
  }

  const { npmType } = await prompt([
    {
      name: 'npmType',
      type: 'select',
      message: `请选择项目类型:`,
      choices: [
        { message: 'vue组件', name: 'vue' },
        { message: 'sdk', name: 'sdk' }
      ]
    }
  ])

  const targetDir = path.resolve(CWD, projectName)
  if (!inCurrent && fs.existsSync(targetDir)) {
    const { action } = await prompt([
      {
        name: 'action',
        type: 'select',
        message: `${chalk.cyan(targetDir)}目录已经存在。请选择操作类型:`,
        choices: [
          { message: '覆盖', name: 'overwrite' },
          { message: '合并', name: 'merge' },
          { message: '取消', name: false }
        ]
      }
    ])
    if (!action) return false
    else if (action === 'overwrite') {
      console.log(`\n🗑️ Removing ${chalk.cyan(targetDir)}...`)
      await fs.remove(targetDir)
    }
  }
  await download(name, npmType)
  await compile(targetDir, { projectName })
  await install(targetDir)
}

module.exports = create