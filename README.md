# TodoList项目构建
-- 基于react redux

## 1-Mock数据的使用
1. cd到json文件的文件夹内，运行serve，通过访问地址/xxx.json即可访问到该数据，通过配置package.json文件夹中的proxy可以访问到对应的数据
2. 直接将数据放到public文件夹内的mock文件夹，可以通过网址/mock/xxx.json访问到数据

## 2-组件划分原则
1. 解耦
2. 复用
3. 组件颗粒度适度

## 3-State
1. 代表UI完整且最小的状态集合
2. 父组件props传入的不是State
3. 会随着时间、交互操作而变化
4. 不可以通过其他state或者props计算得到

## 4-State保存位置
1. 确定每一个组件依赖的state
2. 当多个组件依赖同一个state，寻找它们共同的父组件

## 5-增加交互行为
1. 父组件中设置方法，通过props传递给子组件，子组件调用实现对数据的修改，添加反向数据流

## 6-Redux优点
1. 能够管理复杂的状态：api数据、本地数据、ui状态
2. 将视图和状态解耦，视图使用React，状态使用Redux

## 7-Actions
1. 描述如何修改Redux介绍
2. 是JSON对象，必须包含一个type属性
3. 通过store.dispatch方法发送

## 8-Reducers
1. 传入原来的State与Action值
2. 通过switch case定位具体的Action，编写逻辑代码返回新的状态值
3. Reducer可以通过state拆分，每个state中的key对应一个模块
4. Reducer的合并可以借助combineReducers这个api实现

## 9-Store
1. Store总的来说起到粘合剂的功效
2. store通过dispatch派发动作action
3. 通过createStore(rootReducer)创建store
4. store通过getState获得state，并且通过subscribe订阅state
5. store设置好后，需要在全局index页面引入store

## 10-React与Redux的结合
1. Provider组件：向根组件注入store
2. connect<--redux：连接React组件和Redux状态层
3. 在connect时，React组件会从Redux获取到state和action这两个参数
4. 连接的主要参数是：mapStateToProps mapDispatchToProps

## 11-展示型组件和容器型组件
1. 关注点：UI的展示---逻辑
2. 对Redux感知：无---有
3. 读数据：从props---从Redux store
4. 写数据：调用props回调---发送Redux actions
5. 如何创建：手写---通过react-redux

## 12-Redux整体流程总结
1. 首先各个状态的初始值储存在Reducer中，已知Reducer输入有旧状态和动作，当旧状态为空时直接取默认值设为当前状态，同时Reducer定义了状态的格式
2. 当前状态值(newState)-->container业务逻辑代码处理-->可直接渲染组件的\*state和\*个性化派发方法-->渲染组件
3. 当组件产生动作时，\*个性化派发方法将组件动作和需要的旧状态，处理成为有动作type标识码的动作和旧状态传递-->Reducer
4. Reducer中有多个方法等待匹配动作标识码，匹配成功会有业务逻辑更新状态为新状态(newState)-->container-->2
5. 为什么需要两块业务逻辑代码？---从React整体状态的设计来说，state需要保证是最小且完整的状态集合，从此原则出发，reducer中的业务逻辑需要短小精悍，能够实现细小重要的状态更新即可；那么就需要再设计一部分来实现其他的业务逻辑了，且本着UI展示与逻辑分离的原则，于是container诞生了，它来进一步处理reducer产生的细小状态砖瓦，使其成为能够直接被使用的状态值和方法。

## 13-异步Action
1. 当在actionCreator中定义了一种action但是返回的却是函数时，不能直接传递给store
2. store只能接受对象形式的action，不能接受函数形式
3. 此时需要使用中间件redux-thunk

## 14-selector
1. selector中定义了一些获取state中值的api
2. container通过调用api获取其需要用到的状态值，而不需要知道state中的具体结构
3. 实现了状态层和视图层的解耦

## 15-中间件
1. 中间件封装了getState和dispatch方法为新的dispatch方法，增强dispatch方法
2. 视图层的动作通过一串新dispatch方法达到reducer
3. Function({getState,dispatch})=>next=>action=>{return next(action)}

## 16-store enhancer
1. function enhancerCreator=createStore=>(...args)=>{}
2. 函数中通过const store=createStore(...args)获取旧的store
3. 最后返回一个新的store

## 17-性能优化
1. 当state结构层次深或者复杂，可以使用Immutable管理state
2. 当selector函数复杂，为了避免不必要的调用可以使用reselect管理selector

## 18-SPA和MPA
1. MPA是多页面应用，url发生变化，服务器端返回html内容变化，有利于SEO，爬虫，依赖服务器端路由
2. SPA是单页面应用，url发生变化，服务器端返回html不变，没有切换白屏，性能好一些，依赖客户端路由

## 19-React Router相关库
1. react-router
2. react-router-dom
3. react-router-native

## 20-Router组件
1. BrowserRouter: 内部实现基于html5-api，需要对web服务器额外配置，当人为输入一个地址传入服务器时，服务器会去对应的文件夹寻找静态资源返回，但是该文件可能并不存在，那么就会出现404，配置后保证无论输入什么地址都能返回根目录下的index.html页面
2. HashRouter: 使用url的哈希部分作为路由信息，用来兼容老版本的浏览器

## 21-Route组件
1. 用来配置路由信息，path配置地址，component配置组件
2. match属性：path="/user/:user" 这里会将:user部分传入到对应组件的props中，通过this.props.match.params.user读取

## 22-路由渲染的方式
1. component：当参数为内联函数时，会造成每次该组件render时，组件都会重新卸载再挂载，内部状态丢失
2. render：接收函数类型值，参数可以保留，接收props参数，可以进行逻辑处理，还可以添加其他props
3. children：接收函数类型值，接收props参数，与render区别在于，无论children所在Route是否被匹配上，其对应的组件都会被渲染，通过props.match参数可以判断是否被匹配上

## 23-React Router4新思维
1. 一切皆组件
2. 动态路由的离散式声明，可以在任意组件中定义Route