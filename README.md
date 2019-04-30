# 特色

1、采用`babel7`新选项`usage`，可以不用手动引入垫片，不用担心引入过多的垫片导致包体积变大，可以放心的使用**ES6+**

2、采用`core-js3`，更优的代码，更多的方法可以使用，比如以下这些：

- 装饰器

```javascript
class MyClass {
  @decorator
  method() {}
}
```

- 私有属性和方法

```javascript
class C {
  static #foo = "bar";
}

class Person {
  #age = 19;

  #increaseAge() {
    this.#age++;
  }

  birthday() {
    this.#increaseAge();
    alert("Happy Birthday!");
  }
}
```

- 管道符

# 关于编译后的代码

为了适配各种环境，分别打出了多个包。

### sdk包的目录结构

```javascript
├── dist
│   ├── *.cjs.js // commonjs规范的包
│   ├── *.es.js // ES Module规范的包
│   ├── *.min.js // IIFE规范的包，可以直接通过<script></script>引入
│   └── *.umd.js // umd规范的包
```

`main`指向的是`*.umd.js`，`module`指向的是`*.es.js`，如果有特殊需求可以直接指定文件来引入

### vue组件包的目录结构

```javascript
├── dist
│   ├── lib-px // 样式单位是px
│   │   ├── *.es.js
│   │   └── *.umd.js
│   ├── lib-rem // 样式单位是rem
│   │   ├── *.es.js
│   │   └── *.umd.js
│   └── lib-vw // 样式单位是vw
│       ├── *.es.js
│       └── *.umd.js
```

`main`指向的是`lib-px/*.umd.js`，`module`指向的是`lib/*.es.js`，如果有特殊需求可以直接指定文件来引入，例如：

```javascript
import Test from 'test/dist/lib-rem/test.es.js'
```

# 用法

脚手架只提供创建项目的能力，打包编译的能力是由创建出来的项目提供的。

```javascript
// 安装脚手架
npm install -g pac-cli

// 创建项目
pac create name
```

```
Options:
  -V, --version      output the version number
  -h, --help         output usage information

Commands:
  create <app-name>  通过pac脚手架创建一个可以快速开发sdk以及vue组件的项目
```

如果在现有的git目录创建项目，可以传递`<app-name>`为`.`，就可以了。

```shell
pac create .
```