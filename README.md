# Sayup English

建立语芽英语口语 App（yuya-english-speaking-app）的在线 Web 预览项目，不用配置本地环境即可在浏览器中直观查看和交互核心界面。

功能要求：
1. 界面呈现：采用手机模型视口（自带精致手机边框，也可切换全屏），完美还原项目的深色护眼设计系统（深蓝灰底色 #0E141B / #121A24、柔白文字 #E6EDF3、主强调柔蓝 #4F8DF7、青绿与琥珀点缀）。
2. 底栏 5 大核心 Tab 与完整交互：
   - 「对话」Tab：日常高频会话与情境卡片列表，模拟对话交互。
   - 「角色」Tab：双人情景角色扮演（Role Play），支持回合提示与发音跟读互动。
   - 「学习」Tab：关卡式学习流（学习 -> 填空巩固 -> 开口练），带有顶部进度条指示与逐级返回。
   - 「词汇」Tab：分级词卡库与词汇记忆卡片。
   - 「加强」Tab：错题本与薄弱项强化练习。
3. 增加儿童课程模式预览切换（独立暖色主题），支持发音音频朗读（基于 Web Speech API 朗读）与模拟评测反馈，让整个体验在网页上真实可用。

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://sayup-english.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/b8f3d204-54f1-404e-b515-0263617742a4).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
