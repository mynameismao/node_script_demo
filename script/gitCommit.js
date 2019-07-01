const shell = require('shelljs')
const path = require('path')

// stdout 标准输出
// stderr 标准错误
const defaultCallback = (cb) => {
  return (code, stdout, stderr) => {
    console.log('code', code)
    if (stderr) {
      console.log(stderr)
    }
    if (stdout) {
      console.log(stdout)
    }
  }
  setTimeout(cb, 1000)
}

const PROJECT_NAME = path.parse(path.resolve(__dirname, '..')).name
const SCRIPT_COMMIT_PROJECT = `cd .. && git add . && git commit ${PROJECT_NAME}/ -m "Fix ${PROJECT_NAME} project's bugs @ ${new Date()}."`
const SCRIPT_PULL_MERGE = `cd .. && git pull`
const SCRIPT_COMMIT_MERGE = `cd .. && git add . && git commit -m "Merge all projects."`
const SCRIPT_PUSH_ALL_CHANGE = `cd .. && git push`

shell.exec(SCRIPT_COMMIT_PROJECT, defaultCallback(() => {
  shell.exec(SCRIPT_PULL_MERGE, defaultCallback(() => {
    shell.exec(SCRIPT_COMMIT_MERGE, defaultCallback(() => {
      shell.exec(SCRIPT_PUSH_ALL_CHANGE, defaultCallback(() => {
        console.log('success')
      }))
    }))
  }))
}))
