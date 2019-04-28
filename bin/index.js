#!/usr/bin/env node

const program = require('commander')
const chalk = require('chalk')

program
  .version(require('../package.json').version)
  .usage('<command> [options]')

program
  .command('create <app-name>')
  .description('通过pac脚手架创建一个可以快速开发sdk以及vue组件的项目')
  .action((name) => {
    require('./create.js')(name)
  })

program.on('--help', () => {
  console.log()
  console.log(`运行${chalk.cyan(`pac <command> --help`)} 提供详细的命令说明`)
  console.log()
})

program
  .arguments('<command>')
  .action((cmd) => {
    program.outputHelp()
    console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`))
    console.log()
  })

program.parse(process.argv)

if (!process.argv.slice(2).length) {
  program.outputHelp()
}

